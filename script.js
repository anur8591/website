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

    static updateWishlistCount() {
        try {
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            const wishlistCountElements = document.querySelectorAll('.wishlist-count');
            wishlistCountElements.forEach(element => {
                element.style.transition = 'all 0.3s ease';
                element.textContent = wishlist.length;
            });
            return wishlist.length;
        } catch (e) {
            console.error('Error updating wishlist count:', e);
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
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPriceText = productCard.querySelector('.product-price').textContent;
        const productPrice = parseFloat(productPriceText.replace(/[^0-9.-]+/g, "")) || 0;
        const productImage = productCard.querySelector('img').src;

        const index = this.wishlist.findIndex(item => item.id === productId);
        if (index === -1) {
            this.wishlist.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage
            });
            button.innerHTML = '<i class="fas fa-heart"></i>';
            button.classList.add('wished');
        } else {
            this.wishlist.splice(index, 1);
            button.innerHTML = '<i class="far fa-heart"></i>';
            button.classList.remove('wished');
        }
        Utils.saveWishlist(this.wishlist);
        this.updateWishlistCount();
    }

    initializeWishButtons() {
        const wishButtons = document.querySelectorAll('.wish-button');
        wishButtons.forEach(button => {
            const productCard = button.closest('.product-card');
            if (!productCard) return;
            const productId = productCard.dataset.id;
            if (this.wishlist.some(item => item.id === productId)) {
                button.innerHTML = '<i class="fas fa-heart"></i>';
                button.classList.add('wished');
            } else {
                button.innerHTML = '<i class="far fa-heart"></i>';
                button.classList.remove('wished');
            }
            button.addEventListener('click', () => {
                this.toggleWish(productId, button);
            });
        });
    }

    updateWishlistCount() {
        return Utils.updateWishlistCount();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count
    Cart.updateCount();

    // Initialize wishlist count
    Utils.updateWishlistCount();

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

    // Smooth add to cart animation and functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.style.transition = 'all 0.3s ease';
        button.addEventListener('click', function() {
            // Animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Add to cart functionality
            const productCard = this.closest('.product-card');
            const productId = productCard.dataset.id;
            const productName = productCard.querySelector('h3').textContent;
            const productPriceText = productCard.querySelector('.product-price').textContent;
            const productPrice = parseFloat(productPriceText.replace(/[^0-9.-]+/g, "")) || 0;
            const productImage = productCard.querySelector('img').src;

            let cart = JSON.parse(localStorage.getItem('cart')) || {};
            if (cart[productId]) {
                cart[productId].quantity += 1;
            } else {
                cart[productId] = {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                };
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            Cart.updateCount();

            // Optional: Show feedback
            alert(`${productName} added to cart!`);
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
