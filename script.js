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


});
