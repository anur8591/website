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
});
