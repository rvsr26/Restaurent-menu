// firebase_config.js

// Replace these placeholders with the actual keys from your Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyA8iQor0HbcVrJj0Jz20ScwFw3lMh1PDDE",
    authDomain: "rest-91bf8.firebaseapp.com",
    projectId: "rest-91bf8",
    storageBucket: "rest-91bf8.firebasestorage.app",
    messagingSenderId: "657351267962",
    appId: "1:657351267962:web:d8cc5a788837e133fe0dc3"
};

// Initialize Firebase App and Services (if not already initialized)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Export the initialized services
const auth = firebase.auth();
const db = firebase.firestore();

// Optional: Enable offline persistence (requires indexedDB)
// db.enablePersistence().catch(err => {
//     console.error("Firestore persistence error:", err);
// });