// Script to handle login popup display and form submission

document.addEventListener('DOMContentLoaded', () => {
    const loginPopup = document.getElementById('login-popup');
    const signInLink = document.getElementById('signInLink');
    const accountListsLink = document.getElementById('accountListsLink');
    const closeLoginPopup = document.getElementById('closeLoginPopup');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const popupLoginMessage = document.getElementById('popupLoginMessage');
    const popupSignupMessage = document.getElementById('popupSignupMessage');
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');

    // Function to open login popup
    function openLoginPopup() {
        loginPopup.style.display = 'flex';
    }

    // Function to close login popup
    function closePopup() {
        loginPopup.style.display = 'none';
        popupLoginMessage.textContent = '';
        popupSignupMessage.textContent = '';
    }

    // Tab switching
    loginTab.addEventListener('click', () => {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        popupLoginMessage.textContent = '';
        popupSignupMessage.textContent = '';
    });

    signupTab.addEventListener('click', () => {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        popupLoginMessage.textContent = '';
        popupSignupMessage.textContent = '';
    });

    // Open login popup on clicking sign in or account & lists
    signInLink.addEventListener('click', (e) => {
        e.preventDefault();
        openLoginPopup();
    });

    accountListsLink.addEventListener('click', (e) => {
        e.preventDefault();
        openLoginPopup();
    });

    // Close popup on clicking close button
    closeLoginPopup.addEventListener('click', () => {
        closePopup();
    });

    // Close popup on clicking outside the popup content
    loginPopup.addEventListener('click', (e) => {
        if (e.target === loginPopup) {
            closePopup();
        }
    });

    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('popupEmail').value.trim();
        const password = document.getElementById('popupPassword').value.trim();

        if (email === '' || password === '') {
            popupLoginMessage.textContent = 'Please fill in all fields.';
            popupLoginMessage.style.color = 'red';
            return;
        }

        if (!email.includes('@')) {
            popupLoginMessage.textContent = 'Please enter a valid email.';
            popupLoginMessage.style.color = 'red';
            return;
        }

        if (password.length < 6) {
            popupLoginMessage.textContent = 'Password must be at least 6 characters.';
            popupLoginMessage.style.color = 'red';
            return;
        }

        // Simulate successful login
        popupLoginMessage.textContent = 'Login successful! Redirecting...';
        popupLoginMessage.style.color = '#4CAF50';

        setTimeout(() => {
            closePopup();
            window.location.href = 'index.html';
        }, 1500);
    });

    // Handle signup form submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!name || !email || !password || !confirmPassword) {
            popupSignupMessage.textContent = 'Please fill in all fields.';
            popupSignupMessage.style.color = 'red';
            return;
        }

        if (!email.includes('@')) {
            popupSignupMessage.textContent = 'Please enter a valid email.';
            popupSignupMessage.style.color = 'red';
            return;
        }

        if (password.length < 6) {
            popupSignupMessage.textContent = 'Password must be at least 6 characters.';
            popupSignupMessage.style.color = 'red';
            return;
        }

        if (password !== confirmPassword) {
            popupSignupMessage.textContent = 'Passwords do not match.';
            popupSignupMessage.style.color = 'red';
            return;
        }

        // Simulate successful signup
        popupSignupMessage.textContent = 'Account created successfully! Redirecting to login...';
        popupSignupMessage.style.color = '#4CAF50';

        setTimeout(() => {
            closePopup();
            window.location.href = 'login.html';
        }, 2000);
    });

    // Category dropdown toggle for bottom nav
    const menuIcon = document.querySelector('.menu-icon');
    const categoryDropdown = document.querySelector('.category-dropdown');

    if (menuIcon && categoryDropdown) {
        menuIcon.addEventListener('click', () => {
            categoryDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuIcon.contains(e.target) && !categoryDropdown.contains(e.target)) {
                categoryDropdown.classList.remove('show');
            }
        });
    }

    // Cart functionality
    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || {};
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const cart = getCart();
        let totalQuantity = 0;
        for (const item of Object.values(cart)) {
            totalQuantity += item.quantity;
        }
        const cartCountElem = document.querySelector('.cart-count');
        if (cartCountElem) {
            cartCountElem.textContent = totalQuantity;
        }
    }

    // Wishlist functionality
    function getWishlist() {
        return JSON.parse(localStorage.getItem('wishlist')) || [];
    }

    function saveWishlist(wishlist) {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    function updateWishlistCount() {
        const wishlist = getWishlist();
        const wishlistCountElem = document.querySelector('.wishlist-count');
        if (wishlistCountElem) {
            wishlistCountElem.textContent = wishlist.length;
        }
    }

    // Initialize wishlist states on page load
    const wishlist = getWishlist();
    const wishButtons = document.querySelectorAll('.wish-button');

    wishButtons.forEach(button => {
        const productCard = button.closest('.product-card');
        const productId = productCard ? productCard.getAttribute('data-id') : null;
        if (productId && wishlist.some(item => item.id == productId)) {
            button.classList.add('wished');
            const icon = button.querySelector('i');
            if (icon) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            }
        }

        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (!productId) return;

            const icon = button.querySelector('i');
            const img = productCard.querySelector('img');
            const name = productCard.querySelector('h3').textContent;
            const priceText = productCard.querySelector('.product-price').textContent;
            const price = parseFloat(priceText.replace('₹', ''));
            const image = img ? img.src : '';

            let currentWishlist = getWishlist();
            const existingIndex = currentWishlist.findIndex(item => item.id == productId);

            if (button.classList.contains('wished')) {
                // Remove from wishlist
                button.classList.remove('wished');
                if (icon) {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                }
                if (existingIndex > -1) {
                    currentWishlist.splice(existingIndex, 1);
                }
            } else {
                // Add to wishlist
                button.classList.add('wished');
                if (icon) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                }
                if (existingIndex === -1) {
                    currentWishlist.push({ id: productId, name, price, image });
                }
            }

            saveWishlist(currentWishlist);
            updateWishlistCount();
        });
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            const productId = productCard ? productCard.getAttribute('data-id') : null;
            if (!productId) return;

            const img = productCard.querySelector('img');
            const name = productCard.querySelector('h3').textContent;
            const priceText = productCard.querySelector('.product-price').textContent;
            const price = parseFloat(priceText.replace('₹', ''));
            const image = img ? img.src : '';

            let cart = getCart();
            if (cart[productId]) {
                cart[productId].quantity += 1;
            } else {
                cart[productId] = { name, price, quantity: 1, image };
            }

            saveCart(cart);
            updateCartCount();
            alert('Item added to cart!');
        });
    });

    // Update counts on load
    updateCartCount();
    updateWishlistCount();

    // Banner Carousel Functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');
    let autoSlideInterval;

    function showSlides(n) {
        slideIndex = (n + slides.length) % slides.length; // Handle looping with modulo

        // Update slides opacity via active class
        slides.forEach(slide => slide.classList.remove('active'));
        slides[slideIndex].classList.add('active');

        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[slideIndex].classList.add('active');
    }

    function changeBanner(n) {
        clearInterval(autoSlideInterval);
        showSlides(slideIndex + n);
        autoSlideInterval = setInterval(() => changeBanner(1), 5000);
    }

    function currentBanner(n) {
        clearInterval(autoSlideInterval);
        showSlides(n - 1);
        autoSlideInterval = setInterval(() => changeBanner(1), 5000);
    }

    // Auto-advance slides every 3 seconds
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => changeBanner(1), 3000);
    }

    // Initialize the first slide
    showSlides(slideIndex);
    startAutoSlide();
});
