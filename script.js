// FreshBasket Grocery Website JavaScript - Smooth and Subtle Animations
console.log("FreshBasket Grocery Website Loaded");

// Utils class for utility functions
class Utils {
    static updateCartCount() {
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

    static loadWishlist() {
        try {
            return JSON.parse(localStorage.getItem('wishlist')) || [];
        } catch (e) {
            console.error('Error loading wishlist:', e);
            return [];
        }
    }

    static saveWishlist(wishlist) {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
}

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

// Banner class for carousel functionality
class Banner {
    constructor() {
        this.currentIndex = 0;
        this.autoRotateInterval = null;
        this.banners = document.querySelectorAll('.banner-slide');
        this.dots = document.querySelectorAll('.dot');
    }

    init() {
        if (this.banners.length === 0) return;

        this.showBanner(this.currentIndex);
        this.autoRotateInterval = setInterval(() => this.nextBanner(), 4000);
    }

    showBanner(index) {
        this.banners.forEach((banner, i) => {
            banner.style.transform = `translateX(${(i - index) * 100}%)`;
            banner.style.transition = 'transform 0.6s ease-in-out';
        });
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    nextBanner() {
        this.currentIndex = (this.currentIndex + 1) % this.banners.length;
        this.showBanner(this.currentIndex);
    }

    changeBanner(direction) {
        this.currentIndex = (this.currentIndex + direction + this.banners.length) % this.banners.length;
        this.showBanner(this.currentIndex);
    }

    currentBanner(index) {
        this.currentIndex = index - 1;
        this.showBanner(this.currentIndex);
    }
}

// Global banner instance for HTML onclick
let bannerInstance;

// Global functions for banner navigation
function changeBanner(direction) {
    if (bannerInstance) {
        bannerInstance.changeBanner(direction);
    }
}

function currentBanner(index) {
    if (bannerInstance) {
        bannerInstance.currentBanner(index);
    }
}

// Cart class for cart functionality
class Cart {
    static updateCount() {
        return Utils.updateCartCount();
    }
}

// Wishlist class for wishlist functionality
class Wishlist {
    constructor() {
        this.wishlist = Utils.loadWishlist();
    }

    toggleWish(productId, button) {
        const index = this.wishlist.indexOf(productId);
        if (index === -1) {
            this.wishlist.push(productId);
            button.innerHTML = '<i class="fas fa-heart"></i>';
            button.classList.add('wished');
        } else {
            this.wishlist.splice(index, 1);
            button.innerHTML = '<i class="far fa-heart"></i>';
            button.classList.remove('wished');
        }
        Utils.saveWishlist(this.wishlist);
    }

    initializeWishButtons() {
        const wishButtons = document.querySelectorAll('.wish-button');
        wishButtons.forEach(button => {
            const productCard = button.closest('.product-card');
            if (!productCard) return;
            const productId = productCard.dataset.id;
            if (this.wishlist.includes(productId)) {
                button.innerHTML = '<i class="fas fa-heart"></i>';
                button.classList.add('wished');
            } else {
                button.innerHTML = '<i class="far fa-heart"></i>';
                button.classList.remove('wished');
            }
            button.addEventListener('click', () => {
                this.toggleWish(productId, button);
                this.updateWishlistCount();
            });
        });
    }

    updateWishlistCount() {
        const countElements = document.querySelectorAll('.wishlist-count');
        countElements.forEach(el => {
            el.textContent = this.wishlist.length;
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count
    Cart.updateCount();

    // Initialize banner carousel
    bannerInstance = new Banner();
    bannerInstance.init();

    // Initialize wish buttons
    const wishlist = new Wishlist();
    wishlist.initializeWishButtons();

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
