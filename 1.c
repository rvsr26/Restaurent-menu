/* =========================================
   1. VARIABLES & RESET
   ========================================= */
:root {
    --primary-color: #e63946;       /* Appetizing Red */
    --secondary-color: #f1faee;     /* Cream White */
    --accent-color: #457b9d;        /* Muted Blue */
    --dark-color: #1d3557;          /* Deep Navy/Charcoal */
    --text-dark: #333333;
    --text-light: #ffffff;
    --shadow-light: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-hover: 0 10px 15px rgba(0, 0, 0, 0.2);
    --transition: all 0.3s ease-in-out;
}

*, *::after, *::before {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

html {
    font-size: 62.5%; /* 1rem = 10px */
    scroll-behavior: smooth;
}

body {
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 1.6rem;
    line-height: 1.6;
    background-color: var(--secondary-color);
    color: var(--text-dark);
}

a {
    text-decoration: none;
    color: inherit;
    display: inline-block;
}

ul {
    list-style: none;
}

/* =========================================
   2. UTILITY CLASSES
   ========================================= */
.container {
    max-width: 1200px;
    width: 90%;
    margin: 0 auto;
}

.btn {
    display: inline-block;
    padding: 0.8em 2.5em;
    border-radius: 50px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1.4rem;
    transition: var(--transition);
    border: none;
    box-shadow: var(--shadow-light);
}

.btn-primary {
    color: var(--text-light);
    background: var(--primary-color);
}

.btn-primary:hover {
    background: var(--dark-color);
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
}

/* =========================================
   3. NAVBAR
   ========================================= */
.navbar {
    width: 100%;
    background-color: #ffffff;
    box-shadow: var(--shadow-light);
    height: 80px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 1000;
}

.navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 90%;
    max-width: 1200px;
    margin: auto;
}

.logo img {
    height: 60px;
    width: auto;
}

.menu-items {
    display: flex;
    gap: 3rem;
}

.menu-items li a {
    color: var(--dark-color);
    font-weight: 600;
    font-size: 1.6rem;
    padding-bottom: 5px;
    border-bottom: 2px solid transparent;
    transition: var(--transition);
}

.menu-items li a:hover {
    color: var(--primary-color);
    border-bottom: 2px solid var(--primary-color);
}

/* Hamburger Menu Logic */
.navbar input[type="checkbox"],
.navbar .hamburger-lines {
    display: none;
}

/* =========================================
   4. SHOWCASE / HERO
   ========================================= */
.showcase-area {
    height: 80vh;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
                url("https://i.ibb.co/42kWVkg/13003920-food-web-banner-16.jpg");
    background-position: center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 80px; /* Offset for fixed navbar */
}

.main-title {
    font-size: 5rem;
    text-transform: uppercase;
    color: var(--text-light);
    margin-bottom: 1rem;
    letter-spacing: 2px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.showcase-container p {
    font-size: 1.8rem;
    color: #f4f4f4;
    margin-bottom: 2rem;
}

/* =========================================
   5. FOOD CATEGORIES
   ========================================= */
#food {
    padding: 8rem 0;
    background-color: #fff;
}

#food h2 {
    text-align: center;
    font-size: 3.5rem;
    color: var(--dark-color);
    margin-bottom: 4rem;
    text-transform: uppercase;
}

.food-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.img-container {
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: var(--shadow-light);
    cursor: pointer;
}

.img-container img {
    display: block;
    width: 100%;
    height: 300px;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.img-container:hover img {
    transform: scale(1.1);
}

.img-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
    z-index: 2;
    opacity: 0;
    transition: var(--transition);
}

.img-container::after {
    content: "";
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    transition: var(--transition);
}

.img-container:hover .img-content,
.img-container:hover::after {
    opacity: 1;
}

/* =========================================
   6. FOOD MENU
   ========================================= */
.food-menu {
    padding: 8rem 0;
    background-color: var(--secondary-color);
}

.food-menu-heading1 {
    text-align: center;
    font-size: 4rem;
    color: var(--dark-color);
    font-weight: 700;
    margin-bottom: 4rem;
}

.food-menu-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
}

.food-menu-item {
    display: flex;
    flex-direction: row;
    width: 550px;
    background: #fff;
    border-radius: 15px;
    box-shadow: var(--shadow-light);
    transition: var(--transition);
    overflow: hidden;
}

.food-menu-item:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-hover);
}

.food-menu-item img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 0; /* Managed by container overflow */
}

.food-description {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.food-titile {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--dark-color);
    margin-bottom: 1rem;
}

.food-description p {
    font-size: 1.4rem;
    color: #666;
    margin-bottom: 1rem;
}

.food-price {
    color: var(--primary-color);
    font-weight: 700;
    font-size: 1.8rem;
}

/* =========================================
   7. TESTIMONIALS / REVIEWS
   ========================================= */
#reviews {
    padding: 8rem 0;
    background: linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),
                url("https://i.ibb.co/PNvkdBh/Blue-and-White-Modern-Elegant-Congratulations-Instagram-Post.png");
    background-size: cover;
    background-attachment: fixed; /* Parallax effect */
}

.review-title {
    text-align: center;
    font-size: 3.5rem;
    color: var(--dark-color);
    margin-bottom: 4rem;
}

.review-container {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
}

.review-box {
    background: #fff;
    padding: 3rem;
    text-align: center;
    border-radius: 10px;
    box-shadow: var(--shadow-light);
    flex-basis: 30%;
    min-width: 280px;
}

.customer-photo img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--primary-color);
    margin-bottom: 1.5rem;
}

.review-text {
    font-style: italic;
    color: #555;
    margin: 1.5rem 0;
}

.star-rating .checked {
    color: #ffb703;
}

/* =========================================
   8. CONTACT SECTION
   ========================================= */
#contact {
    padding: 8rem 0;
    background: var(--dark-color);
}

.contact-container {
    background: #fff;
    display: flex;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: var(--shadow-hover);
}

.contact-img {
    width: 50%;
}

.contact-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.form-container {
    width: 50%;
    padding: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.form-container h2 {
    font-size: 3rem;
    color: var(--dark-color);
    margin-bottom: 2rem;
}

.form-container input,
.form-container textarea {
    width: 100%;
    padding: 1.2rem;
    margin-bottom: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1.6rem;
    background: #f9f9f9;
    outline: none;
    transition: var(--transition);
}

.form-container input:focus,
.form-container textarea:focus {
    border-color: var(--primary-color);
    background: #fff;
}

.form-container textarea {
    height: 150px;
    resize: none;
}

/* =========================================
   9. FOOTER
   ========================================= */
#footer {
    padding: 3rem 0;
    background: #111;
    color: #fff;
    text-align: center;
}

.social-media-links {
    margin: 2rem 0;
}

.social-media-links .fa {
    color: #fff;
    font-size: 2.5rem;
    margin: 0 1rem;
    transition: var(--transition);
}

.social-media-links .fa:hover {
    color: var(--primary-color);
    transform: scale(1.2);
}

/* =========================================
   10. ABOUT US / TEAM
   ========================================= */
#about-us {
    padding: 6rem 0;
    background-color: #fff;
}

#about-us h2 {
    font-size: 3.5rem;
    text-align: center;
    color: var(--dark-color);
    margin-bottom: 4rem;
}

.team-members {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
}

.member {
    width: 250px;
    padding: 20px;
    text-align: center;
    background: var(--secondary-color);
    border-radius: 10px;
    box-shadow: var(--shadow-light);
    transition: var(--transition);
}

.member:hover {
    transform: translateY(-5px);
}

.member img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
}

.member h3 {
    color: var(--dark-color);
    margin-bottom: 5px;
}

.member p {
    color: #666;
}

/* =========================================
   11. MEDIA QUERIES (RESPONSIVENESS)
   ========================================= */
@media (max-width: 768px) {
    /* Navbar Mobile Logic */
    .navbar {
        opacity: 0.98;
    }

    .navbar-container input[type="checkbox"],
    .navbar-container .hamburger-lines {
        display: block;
    }

    .navbar-container {
        display: block;
        position: relative;
        height: 64px;
    }

    .navbar-container input[type="checkbox"] {
        position: absolute;
        display: block;
        height: 32px;
        width: 30px;
        top: 20px;
        left: 20px;
        z-index: 5;
        opacity: 0;
        cursor: pointer;
    }

    .navbar-container .hamburger-lines {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 23px;
        width: 35px;
        position: absolute;
        top: 20px;
        left: 20px;
        z-index: 2;
    }

    .navbar-container .hamburger-lines .line {
        display: block;
        height: 3px;
        width: 100%;
        border-radius: 10px;
        background: #333;
    }

    .navbar-container .hamburger-lines .line1 { transform-origin: 0% 0%; transition: transform 0.4s ease-in-out; }
    .navbar-container .hamburger-lines .line2 { transition: transform 0.2s ease-in-out; }
    .navbar-container .hamburger-lines .line3 { transform-origin: 0% 100%; transition: transform 0.4s ease-in-out; }

    .navbar .menu-items {
        padding-top: 100px;
        background: #fff;
        height: 100vh;
        max-width: 300px;
        transform: translate(-150%);
        display: flex;
        flex-direction: column;
        margin-left: 0;
        padding-left: 40px;
        transition: transform 0.5s ease-in-out;
        box-shadow: 5px 0px 10px 0px #aaa;
        position: fixed;
        left: 0; top: 0;
    }

    .logo {
        position: absolute;
        top: 10px;
        right: 15px;
    }

    .navbar-container input[type="checkbox"]:checked ~ .menu-items {
        transform: translateX(0);
    }
    .navbar-container input[type="checkbox"]:checked ~ .hamburger-lines .line1 { transform: rotate(35deg); }
    .navbar-container input[type="checkbox"]:checked ~ .hamburger-lines .line2 { transform: scaleY(0); }
    .navbar-container input[type="checkbox"]:checked ~ .hamburger-lines .line3 { transform: rotate(-35deg); }

    /* Adjustments */
    .main-title { font-size: 3.5rem; }
    
    .food-menu-item {
        flex-direction: column;
        width: 90%;
    }
    
    .food-menu-item img {
        width: 100%;
        height: 200px;
    }

    .contact-container {
        flex-direction: column;
    }

    .contact-img, .form-container {
        width: 100%;
    }
    
    .contact-img { height: 250px; }
}

@media (max-width: 500px) {
    html { font-size: 55%; }
    
    .review-box {
        min-width: 100%;
    }
}