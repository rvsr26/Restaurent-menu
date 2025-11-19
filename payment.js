// ===============================================
// 1. FIREBASE CONFIGURATION
// ===============================================
const firebaseConfig = {
    apiKey: "AIzaSyA8iQor0HbcVrJj0Jz20ScwFw3lMh1PDDE",
    authDomain: "rest-91bf8.firebaseapp.com",
    projectId: "rest-91bf8",
    storageBucket: "rest-91bf8.firebasestorage.app",
    messagingSenderId: "657351267962",
    appId: "1:657351267962:web:d8cc5a788837e133fe0dc3"
};

// Initialize Firebase only once
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// ===============================================
// 2. GLOBAL VARIABLES
// ===============================================
let userUID = localStorage.getItem('pizzaUID');
let subtotal = 0;
let finalTotalAmount = 0;
let currentCartItems = [];
let serviceType = 'delivery';
let paymentMethod = 'card';

// ===============================================
// 3. INITIALIZATION
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
    
    // A. Load Subtotal from LocalStorage
    const storedTotal = localStorage.getItem('checkoutTotal') || "0";
    subtotal = parseFloat(storedTotal.replace(/[^0-9.]/g, ''));

    if (subtotal === 0) {
        alert("Cart is empty. Redirecting to menu.");
        window.location.href = 'menu.html';
        return;
    }

    // B. Load Cart Items and User Info
    if (userUID) {
        // Cart
        db.collection('carts').doc(userUID).get().then(doc => {
            if (doc.exists && doc.data().items) {
                currentCartItems = doc.data().items;
            }
        }).catch(err => console.error("Error fetching cart items:", err));

        // User Details
        db.collection('users').doc(userUID).get().then(doc => {
            if(doc.exists) {
                const data = doc.data();
                if(document.getElementById('name')) document.getElementById('name').value = data.name || '';
                if(document.getElementById('phone')) document.getElementById('phone').value = data.phone || '';
                if(document.getElementById('email')) document.getElementById('email').value = data.email || '';
            }
        });
    }

    // C. Initialize UI state
    calculateFinalTotal();
    toggleService(); // Ensures UI matches the default radio selection
});

// ===============================================
// 4. CALCULATION LOGIC
// ===============================================
function calculateFinalTotal() {
    // If Delivery -> ₹40, If Dine In -> ₹0
    const deliveryFee = serviceType === 'delivery' ? 40 : 0;
    const tax = Math.round(subtotal * 0.05); // 5% tax
    
    finalTotalAmount = subtotal + deliveryFee + tax;

    // Update DOM
    document.getElementById('subtotal').innerText = `₹${subtotal}`;
    document.getElementById('delivery-fee').innerText = `₹${deliveryFee}`;
    document.getElementById('tax').innerText = `₹${tax}`;
    document.getElementById('final-total').innerText = `₹${finalTotalAmount}`;
    
    // Update Pay Button
    const btnText = paymentMethod === 'cod' ? 'Place Order' : `Pay ₹${finalTotalAmount}`;
    document.getElementById('pay-btn').innerText = btnText;
}

// ===============================================
// 5. SERVICE TOGGLE (DELIVERY vs DINE IN)
// ===============================================
function toggleService() {
    const isDelivery = document.getElementById('delivery-opt').checked;
    serviceType = isDelivery ? 'delivery' : 'dinein';

    const deliveryDiv = document.getElementById('delivery-details');
    const dineinDiv = document.getElementById('dinein-details');

    if (isDelivery) {
        // Show Delivery Form
        deliveryDiv.style.display = 'block';
        dineinDiv.style.display = 'none';
        
        // Add required attributes for delivery fields
        document.getElementById('address').setAttribute('required', '');
        document.getElementById('city').setAttribute('required', '');
        document.getElementById('zip').setAttribute('required', '');
        
        // Remove required attributes from dine-in fields
        document.getElementById('dinein-people').removeAttribute('required');
        document.getElementById('dinein-time').removeAttribute('required');
    } else {
        // Show Dine-In Form
        deliveryDiv.style.display = 'none';
        dineinDiv.style.display = 'block';

        // Remove delivery requirements
        document.getElementById('address').removeAttribute('required');
        document.getElementById('city').removeAttribute('required');
        document.getElementById('zip').removeAttribute('required');
        
        // Add dine-in requirements
        document.getElementById('dinein-people').setAttribute('required', '');
        document.getElementById('dinein-time').setAttribute('required', '');
    }

    // Recalculate (Fee changes based on service type)
    calculateFinalTotal(); 
}

// ===============================================
// 6. PAYMENT METHOD SELECTION
// ===============================================
function selectPayment(method) {
    paymentMethod = method;

    // Update Visual Selection
    document.querySelectorAll('.payment-card').forEach(card => card.classList.remove('selected'));
    document.getElementById(`opt-${method}`).classList.add('selected');

    // Toggle Input Fields
    document.getElementById('pay-card').style.display = 'none';
    document.getElementById('pay-upi').style.display = 'none';
    document.getElementById('pay-cod').style.display = 'none';

    document.getElementById(`pay-${method}`).style.display = 'block';

    calculateFinalTotal(); // Update button text
}

// ===============================================
// 7. ORDER PROCESSING
// ===============================================
function processOrder(event) {
    event.preventDefault();

    if (!userUID) {
        alert("You must be signed in to place an order.");
        return;
    }

    // Create Order Object
    const orderData = {
        userId: userUID,
        items: currentCartItems,
        subtotal: subtotal,
        totalAmount: finalTotalAmount, 
        paymentMethod: paymentMethod,
        orderType: serviceType,
        
        // Customer Details
        customerName: document.getElementById('name').value,
        customerPhone: document.getElementById('phone').value,
        customerEmail: document.getElementById('email').value,
        
        // Specific Details based on Type
        deliveryAddress: serviceType === 'delivery' ? document.getElementById('address').value : 'N/A',
        deliveryCity: serviceType === 'delivery' ? document.getElementById('city').value : 'N/A',
        reservationGuests: serviceType === 'dinein' ? document.getElementById('dinein-people').value : 'N/A',
        reservationTime: serviceType === 'dinein' ? document.getElementById('dinein-time').value : 'N/A',
        
        orderDate: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'Placed'
    };

    // Show Spinner
    document.getElementById('processing-overlay').style.display = 'flex';

    // Batch Write (Add Order + Delete Cart)
    const batch = db.batch();
    
    // 1. Create new order doc
    const newOrderRef = db.collection('users').doc(userUID).collection('orders').doc();
    batch.set(newOrderRef, orderData);

    // 2. Delete current cart doc
    const userCartRef = db.collection('carts').doc(userUID);
    batch.delete(userCartRef);
    
    // 3. Commit
    batch.commit()
        .then(() => {
            document.getElementById('processing-overlay').style.display = 'none';
            document.getElementById('success-modal').style.display = 'flex';
        })
        .catch((error) => {
            document.getElementById('processing-overlay').style.display = 'none';
            alert("Order failed: " + error.message);
        });
}

// ===============================================
// 8. FINISH & REDIRECT
// ===============================================
function finishOrder() {
    localStorage.removeItem('checkoutTotal');
    window.location.href = 'menu.html';
}