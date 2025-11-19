// =========================================
// 1. GLOBAL VARIABLES & STATE
// =========================================
let cart = []; 
let total = 0;
let userUID = localStorage.getItem('pizzaUID'); // Retrieved from Sign In page
let cartRef;
let userRef;

// =========================================
// 2. INITIALIZATION (ON PAGE LOAD)
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    if (userUID) {
        // --- LOGGED IN USER MODE ---
        
        // --- A. SETUP FIRESTORE REFERENCES ---
        cartRef = db.collection('carts').doc(userUID);
        userRef = db.collection('users').doc(userUID);

        // --- B. LISTEN TO CART CHANGES (REAL-TIME) ---
        cartRef.onSnapshot(doc => {
            if (doc.exists && doc.data().items) {
                cart = doc.data().items;
                updateCartUI(doc.data().total);
            } else {
                cart = [];
                updateCartUI(0);
            }
        }, error => {
            console.error("Error loading cart:", error);
        });

        // --- C. FETCH USER PROFILE (ONE-TIME) ---
        userRef.get().then((doc) => {
            if (doc.exists) {
                const userData = doc.data();
                updateProfileUI(userData);
            }
        });

        // Update Logout Button Text
        const authBtn = document.getElementById('auth-action-btn');
        if(authBtn) authBtn.innerText = "Logout";

    } else {
        // --- GUEST MODE ---
        // Use LocalStorage for Cart instead of Firestore
        const savedCart = localStorage.getItem('guestCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            // Recalculate total locally
            const savedTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
            updateCartUI(savedTotal);
        }

        // Update Profile UI for Guest
        const profileTitle = document.getElementById('profile-title');
        if(profileTitle) profileTitle.innerText = "Guest";
        
        // Hide user specific sections in profile
        document.getElementById('user-details-section').classList.add('hidden');
        document.getElementById('guest-message').classList.remove('hidden');

        // Update Logout Button to Sign In
        const authBtn = document.getElementById('auth-action-btn');
        if(authBtn) authBtn.innerText = "Sign In";
    }
});

// =========================================
// 3. PROFILE FUNCTIONS
// =========================================

function updateProfileUI(data) {
    const emailDisplay = document.getElementById('profile-email-display');
    const nameDisplay = document.getElementById('profile-username-display');
    const phoneDisplay = document.getElementById('profile-phone-display');
    const titleEl = document.getElementById('profile-title');
    const nameInput = document.getElementById('profile-username-input');
    const phoneInput = document.getElementById('profile-phone-input');

    if (emailDisplay) emailDisplay.innerText = data.email || "N/A";
    if (nameDisplay) nameDisplay.innerText = data.username || data.name || "User";
    if (phoneDisplay) phoneDisplay.innerText = data.phone || "N/A";
    if (titleEl) titleEl.innerText = `Hi, ${data.username || data.name || 'User'}!`;

    if (nameInput) nameInput.value = data.username || data.name || "";
    if (phoneInput) phoneInput.value = data.phone || "";
}

function enableEditMode() {
    document.getElementById('profile-username-display').classList.add('hidden');
    document.getElementById('profile-phone-display').classList.add('hidden');
    document.getElementById('profile-username-input').classList.remove('hidden');
    document.getElementById('profile-phone-input').classList.remove('hidden');
    document.getElementById('edit-btn').classList.add('hidden');
    document.getElementById('save-btn').classList.remove('hidden');
    document.getElementById('cancel-btn').classList.remove('hidden');
}

function cancelEditMode() {
    document.getElementById('profile-username-display').classList.remove('hidden');
    document.getElementById('profile-phone-display').classList.remove('hidden');
    document.getElementById('profile-username-input').classList.add('hidden');
    document.getElementById('profile-phone-input').classList.add('hidden');
    document.getElementById('edit-btn').classList.remove('hidden');
    document.getElementById('save-btn').classList.add('hidden');
    document.getElementById('cancel-btn').classList.add('hidden');
}

function saveProfile() {
    if (!userUID) return; // Should not happen in guest mode, but safe check

    const newName = document.getElementById('profile-username-input').value;
    const newPhone = document.getElementById('profile-phone-input').value;

    if (newName.trim() === "") {
        showToast("Name cannot be empty", "error");
        return;
    }

    const saveBtn = document.getElementById('save-btn');
    saveBtn.innerText = "Saving...";

    userRef.update({
        username: newName, // Align with your Firestore field name
        name: newName,     // Store both for compatibility
        phone: newPhone,
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        showToast("Profile updated successfully!", "success");
        document.getElementById('profile-username-display').innerText = newName;
        document.getElementById('profile-phone-display').innerText = newPhone;
        document.getElementById('profile-title').innerText = `Hi, ${newName}!`;
        cancelEditMode(); 
        saveBtn.innerText = "Save Changes";
    })
    .catch((error) => {
        console.error("Error updating profile: ", error);
        showToast("Failed to update profile", "error");
        saveBtn.innerText = "Save Changes";
    });
}

function toggleProfile() {
    document.body.classList.toggle('profile-active');
}

function handleAuthAction() {
    if (userUID) {
        // Logic for Logout
        auth.signOut().then(() => {
            localStorage.removeItem('pizzaUID');
            localStorage.removeItem('checkoutTotal');
            showToast("Logged out. Redirecting...", "success");
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }).catch((error) => {
            showToast("Logout failed: " + error.message, "error");
        });
    } else {
        // Logic for Sign In (Guest wants to login)
        window.location.href = 'index.html';
    }
}

// =========================================
// 4. CART FUNCTIONS
// =========================================

// Helper: Save cart data based on user status
function saveCartData() {
    // Recalculate total
    let newTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

    if (userUID) {
        // Save to Firestore
        cartRef.set({
            items: cart,
            total: newTotal,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        }).catch(error => console.error(error));
    } else {
        // Save to LocalStorage (Guest)
        localStorage.setItem('guestCart', JSON.stringify(cart));
        updateCartUI(newTotal); // Manually trigger UI update for guest
    }
}

function addToCart(buttonElement) {
    // Remove the sign-in check! Guests allowed.
    
    const descriptionContainer = buttonElement.closest('.food-description');
    const name = descriptionContainer.dataset.name; 
    const price = parseInt(descriptionContainer.dataset.price);
    const quantityInput = descriptionContainer.querySelector('.qty-input');
    const quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity <= 0) {
        showToast("Please enter a valid quantity!", "error");
        return;
    }

    const existingItemIndex = cart.findIndex(item => item.name === name);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
        cart[existingItemIndex].totalPrice = cart[existingItemIndex].quantity * price;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: quantity,
            totalPrice: price * quantity
        });
    }

    saveCartData();
    showToast(`Added ${quantity} x ${name}`, "success");
    quantityInput.value = 1;
}

function removeFromCart(index) {
    const removedItem = cart[index].name;
    cart.splice(index, 1);
    
    saveCartData();
    showToast(`Removed ${removedItem}`, "error");
}

function updateCartUI(newTotal) {
    const cartContainer = document.getElementById('cart-items-container');
    const totalElement = document.getElementById('total-price');
    const countElement = document.getElementById('cart-count');
    
    cartContainer.innerHTML = '';
    total = newTotal;
    let totalCount = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-msg">
                <i class="fa fa-shopping-basket" style="font-size:3rem; margin-bottom:10px; display:block;"></i>
                Your cart is empty.
            </div>`;
    } else {
        cart.forEach((item, index) => {
            totalCount += item.quantity;
            const div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.quantity} x ₹${item.price} = <strong>₹${item.totalPrice}</strong></p>
                </div>
                <div class="remove-btn" onclick="removeFromCart(${index})" title="Remove Item">
                    <i class="fa fa-trash"></i>
                </div>
            `;
            cartContainer.appendChild(div);
        });
    }

    if(totalElement) totalElement.innerText = `₹${total}`;
    if(countElement) countElement.innerText = totalCount;
}

function toggleCart() {
    document.body.classList.toggle('cart-active');
}

function checkout() {
    if (cart.length === 0) {
        showToast("Your cart is empty!", "error");
        return;
    }
    
    // Store total for payment page
    const totalValue = document.getElementById('total-price').innerText.replace('₹', '');
    localStorage.setItem('checkoutTotal', totalValue);

    // Guests are allowed to proceed
    window.location.href = 'payment.html';
}

// =========================================
// 5. UI HELPER FUNCTIONS
// =========================================

function showToast(message, type = "success") {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    const color = type === "error" ? "#d62828" : "#2a9d8f";
    const icon = type === "error" ? "fa-times-circle" : "fa-check-circle";

    toast.className = 'toast';
    toast.style.borderLeft = `5px solid ${color}`;
    toast.innerHTML = `<i class="fa ${icon}" style="color:${color}; margin-right:10px;"></i> ${message}`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}