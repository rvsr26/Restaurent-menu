🍕 Pizza Heaven – Modern Food Ordering Web App

Pizza Heaven is a responsive and user-friendly food ordering application built using HTML, CSS, JavaScript, and Google Firebase.
It features Hybrid Authentication, real-time cart syncing, and a seamless checkout flow designed for both authenticated and guest users.

⭐ Features
🔐 Hybrid Authentication

Login / Signup using:

Email & Password

Google OAuth

Guest Mode – continue without signing in.

Smooth animated authentication UI.

🍕 Dynamic Menu & Cart

Cloud Firestore Sync for logged-in users.

LocalStorage Cart for guest users.

Live item quantity update.

Real-time total, tax & price calculation.

Toast notifications for feedback.

Profile sidebar for user info editing.

💳 Checkout & Payment

Delivery Modes:

Home Delivery (Address input)

Dine-In (Table selection)

Payment Methods (Simulated):

Card, UPI, Cash on Delivery

Auto-generated order summary with subtotal, tax + delivery fee.

📁 Project Structure
📂 Pizza-Heaven/
│
├── signin.html          # Login / Signup / Guest Access
├── menu.html            # Menu, Cart & Profile Sidebar
├── payment.html         # Checkout & Payment
│
├── css/
│   ├── signin.css
│   ├── menu.css
│   └── payment.css
│
├── js/
│   ├── firebase_config.js
│   ├── signin.js
│   ├── menu.js
│   └── payment.js
│
└── README.md

🛠️ Technologies Used
Category	Tools
Frontend	HTML5, CSS3, JavaScript
Backend	Firebase Authentication, Firestore
Storage	Firestore (users), LocalStorage (guests)
Icons	Font Awesome 6
⚙️ How to Run the Project
1. Clone the Repository
git clone https://github.com/yourusername/pizza-heaven.git
cd pizza-heaven

2. Setup Firebase

Go to Firebase Console → Create Project, then:

Enable:

Authentication

Email/Password

Google Provider

Cloud Firestore

Start in Test Mode

Copy your Firebase Web App configuration.

3. Add Firebase Config

Create or edit:

js/firebase_config.js


Add:

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

4. Run the Application

Simply open signin.html, OR

Use a local server such as VS Code Live Server (recommended for Google Sign-In).

📸 Screenshots (Add when available)

Sign In Page

Menu & Cart

Checkout & Payment

🔮 Future Enhancements

 Admin Panel for adding/editing menu items

 Real Payment Integration (Stripe / Razorpay)

 Order Tracking with real-time updates

 Order History for registered users

 Dark Mode

👨‍💻 Author

Developed by the Pizza Heaven Project Team
A full-stack web development showcase using Firebase & dynamic UI/UX.
