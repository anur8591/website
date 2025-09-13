// FreshBasket Grocery Website JavaScript - Smooth and Subtle Animations
console.log("FreshBasket Grocery Website Loaded");

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Smooth horizontal sliding for banner carousel
let currentBannerIndex = 0;
let autoRotateInterval;
let banners, dots;

function initBannerCarousel() {
    banners = document.querySelectorAll('.banner-slide');
    dots = document.querySelectorAll('.dot');

    if (banners.length === 0) return;

    function showBanner(index) {
        banners.forEach((banner, i) => {
            banner.style.transform = `translateX(${(i - index) * 100}%)`;
            banner.style.transition = 'transform 0.6s ease-in-out';
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextBanner() {
        currentBannerIndex = (currentBannerIndex + 1) % banners.length;
        showBanner(currentBannerIndex);
    }

    // Auto rotate with smooth sliding
    autoRotateInterval = setInterval(nextBanner, 4000);
}

function changeBanner(direction) {
    currentBannerIndex = (currentBannerIndex + direction + banners.length) % banners.length;
    showBanner(currentBannerIndex);
}

function currentBanner(index) {
    currentBannerIndex = index - 1;
    showBanner(currentBannerIndex);
}

function showBanner(index) {
    banners.forEach((banner, i) => {
        banner.style.transform = `translateX(${(i - index) * 100}%)`;
        banner.style.transition = 'transform 0.6s ease-in-out';
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Smooth cart functionality
function updateCartCount() {
    try {
        let cart = JSON.parse(localStorage.getItem('cart')) || {};
        let count = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
            element.style.transition = 'all 0.3s ease';
            element.textContent = count;
        });
        return count;
    } catch (e) {
        console.error('Error updating cart count:', e);
        return 0;
    }
}

// Smooth product card hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count
    updateCartCount();
    
    // Initialize banner carousel
    initBannerCarousel();
    
    // Smooth hover effects for product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Smooth add to cart animation
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.style.transition = 'all 0.3s ease';
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
// Smooth mobile menu
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

if (menuIcon && navLinks) {
    menuIcon.addEventListener('click', function() {
        navLinks.style.transition = 'transform 0.3s ease';
        navLinks.classList.toggle('show');
    });
}

// Wishlist functionality
function loadWishlist() {
    try {
        return JSON.parse(localStorage.getItem('wishlist')) || [];
    } catch (e) {
        console.error('Error loading wishlist:', e);
        return [];
    }
}

function saveWishlist(wishlist) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function toggleWish(productId, button) {
    let wishlist = loadWishlist();
    const index = wishlist.indexOf(productId);
    if (index === -1) {
        wishlist.push(productId);
        button.innerHTML = '&#9829;'; // filled heart
        button.classList.add('wished');
    } else {
        wishlist.splice(index, 1);
        button.innerHTML = '&#9825;'; // empty heart
        button.classList.remove('wished');
    }
    saveWishlist(wishlist);
}

function initializeWishButtons() {
    const wishButtons = document.querySelectorAll('.wish-button');
    let wishlist = loadWishlist();
    wishButtons.forEach(button => {
        const productCard = button.closest('.product-card');
        if (!productCard) return;
        const productId = productCard.dataset.id;
        if (wishlist.includes(productId)) {
            button.innerHTML = '&#9829;';
            button.classList.add('wished');
        } else {
            button.innerHTML = '&#9825;';
            button.classList.remove('wished');
        }
        button.addEventListener('click', () => {
            toggleWish(productId, button);
            updateWishlistCount();
        });
    });
}

function updateWishlistCount() {
    const wishlist = loadWishlist();
    const countElements = document.querySelectorAll('.wishlist-count');
    countElements.forEach(el => {
        el.textContent = wishlist.length;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    updateCartCount();
    initBannerCarousel();

    // Initialize wish buttons
    initializeWishButtons();

    // Smooth hover effects for product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Smooth add to cart animation
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.style.transition = 'all 0.3s ease';
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Smooth mobile menu
    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', function() {
            navLinks.style.transition = 'transform 0.3s ease';
            navLinks.classList.toggle('show');
        });
    }
});
});
