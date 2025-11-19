// Import services from the separate config file (assuming it's loaded first)
// The following variables are expected to be available: auth, db

// ===============================================
// 1. UI ANIMATION LOGIC
// ===============================================
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

// ===============================================
// 2. AUTHENTICATION HANDLERS
// ===============================================

// Helper function for redirection and state update
function handleAuthSuccess(user) {
    showToast(`Welcome! Logged in as ${user.email}`, "success");
    // Store UID in localStorage for other pages
    localStorage.setItem('pizzaUID', user.uid);
    localStorage.removeItem('isGuest'); // Ensure guest mode is off
    setTimeout(() => {
        window.location.href = 'menu.html'; 
    }, 1500);
}

// --- Email/Password Sign In ---
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            handleAuthSuccess(userCredential.user);
        })
        .catch((error) => {
            showToast(`Login Failed: ${error.message}`, "error");
        });
});

// --- Email/Password Sign Up ---
document.getElementById("signup-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const username = document.getElementById("signup-username").value || email.split('@')[0];

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            db.collection("users").doc(userCredential.user.uid).set({
                email: email,
                username: username,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                addresses: [],
                phone: ""
            });
            
            showToast("Account created successfully! Please sign in.", "success");
            setTimeout(() => {
                container.classList.remove("sign-up-mode");
                document.getElementById("signin-email").value = email;
            }, 1500);
        })
        .catch((error) => {
            showToast(`Signup Failed: ${error.message}`, "error");
        });
});

// --- Google Sign In ---
function handleGoogleLogin(response) {
    const idToken = response.credential; 
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken);

    auth.signInWithCredential(credential)
        .then((result) => {
            const user = result.user;
            const userRef = db.collection("users").doc(user.uid);

            userRef.get().then((doc) => {
                if (!doc.exists) {
                    userRef.set({
                        email: user.email,
                        username: user.displayName || user.email.split('@')[0],
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        addresses: [],
                        phone: user.phoneNumber || ""
                    });
                }
            });
            handleAuthSuccess(user);
        })
        .catch((error) => {
            showToast(`Google Sign-In Failed: ${error.message}`, "error");
        });
}

// ===============================================
// 3. GUEST ACCESS LOGIC (NEW)
// ===============================================

function handleGuestAccess() {
    // 1. Clear any specific User ID to prevent confusion
    localStorage.removeItem('pizzaUID');
    
    // 2. Set a flag indicating guest mode (optional, but useful for menu.html)
    localStorage.setItem('isGuest', 'true');

    showToast("Entering as Guest...", "success");

    // 3. Redirect immediately
    setTimeout(() => {
        window.location.href = 'menu.html';
    }, 1000);
}

// Attach listener to both guest buttons
document.getElementById('guest-btn-signin').addEventListener('click', handleGuestAccess);
document.getElementById('guest-btn-signup').addEventListener('click', handleGuestAccess);


// --- Toast Notification System ---
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
        toast.remove();
    }, 3000);
}