# 🍕 Pizza Heaven – Modern Food Ordering Web App

**Pizza Heaven** is a responsive and feature-rich food ordering web application built using **HTML, CSS, JavaScript**, and **Google Firebase**.
The app provides a smooth and intuitive UI for both **Authenticated Users** and **Guest Users**, with real-time cart management and a simple checkout flow.

## 🚀 Key Features

### 🔐 Hybrid Authentication
- Login / Signup using:
  - **Email & Password**
  - **Google OAuth**
- **Guest Mode**
- Animated UI transitions

### 🍕 Dynamic Menu & Smart Cart
- Cloud Firestore cart sync for logged-in users
- LocalStorage cart for guest users
- Live pricing, tax, quantity update
- Toast notifications
- Profile sidebar

### 💳 Checkout & Payment
- Home Delivery / Dine-In Options
- Payment Simulation (Card, UPI, COD)
- Auto-summary generation


## 🛠️ Tech Stack
- HTML5, CSS3, JavaScript
- Firebase Authentication
- Cloud Firestore
- LocalStorage
- Font Awesome 6 Icons

📂 Pizza-Heaven/
│
├── signin.html
├── menu.html
├── payment.html
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


## ⚙️ How to Run

1. Clone the repository:
   git clone https://github.com/rvsr26/Restaurent-menu
   cd pizza-heaven

2. Configure Firebase:
   - Enable Auth (Email/Password + Google)
   - Enable Firestore
   - Copy your Firebase Config

3. Add config to js/firebase_config.js

4. Open index.html or run Live Server.

## 🔮 Future Updates
- Admin Panel
- Order Tracking
- Real Payment Gateway
- Order History
- Dark Mode

---

## 👨‍💻 Author
VISHNU SATHWICK
