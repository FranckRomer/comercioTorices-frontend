// Cart Management System
class CartManager {
    constructor() {
        this.cartKey = 'torices_cart';
        this.favoritesKey = 'torices_favorites';
        this.init();
    }

    init() {
        this.updateCounters();
        this.bindEvents();
    }

    // Cart functionality
    addToCart(productId, quantity = 1) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ id: productId, quantity });
        }
        
        this.saveCart(cart);
        this.updateCounters();
        this.showNotification('Producto agregado al carrito', 'success');
    }

    removeFromCart(productId) {
        const cart = this.getCart();
        const filteredCart = cart.filter(item => item.id !== productId);
        this.saveCart(filteredCart);
        this.updateCounters();
        this.showNotification('Producto eliminado del carrito', 'info');
    }

    updateQuantity(productId, quantity) {
        const cart = this.getCart();
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart(cart);
                this.updateCounters();
            }
        }
    }

    getCart() {
        try {
            return JSON.parse(localStorage.getItem(this.cartKey)) || [];
        } catch {
            return [];
        }
    }

    saveCart(cart) {
        localStorage.setItem(this.cartKey, JSON.stringify(cart));
    }

    getCartCount() {
        return this.getCart().reduce((total, item) => total + item.quantity, 0);
    }

    // Favorites functionality
    addToFavorites(productId) {
        const favorites = this.getFavorites();
        if (!favorites.includes(productId)) {
            favorites.push(productId);
            this.saveFavorites(favorites);
            this.updateCounters();
            this.showNotification('Agregado a favoritos', 'success');
        }
    }

    removeFromFavorites(productId) {
        const favorites = this.getFavorites();
        const filteredFavorites = favorites.filter(id => id !== productId);
        this.saveFavorites(filteredFavorites);
        this.updateCounters();
        this.showNotification('Eliminado de favoritos', 'info');
    }

    toggleFavorite(productId) {
        const favorites = this.getFavorites();
        if (favorites.includes(productId)) {
            this.removeFromFavorites(productId);
        } else {
            this.addToFavorites(productId);
        }
    }

    getFavorites() {
        try {
            return JSON.parse(localStorage.getItem(this.favoritesKey)) || [];
        } catch {
            return [];
        }
    }

    saveFavorites(favorites) {
        localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
    }

    getFavoritesCount() {
        return this.getFavorites().length;
    }

    // UI Updates
    updateCounters() {
        const cartCount = this.getCartCount();
        const favoritesCount = this.getFavoritesCount();

        // Update cart counter
        const cartCounters = document.querySelectorAll('.cart-counter');
        cartCounters.forEach(counter => {
            counter.textContent = cartCount;
            counter.style.display = cartCount > 0 ? 'flex' : 'none';
        });

        // Update favorites counter
        const favoritesCounters = document.querySelectorAll('.favorites-counter');
        favoritesCounters.forEach(counter => {
            counter.textContent = favoritesCount;
            counter.style.display = favoritesCount > 0 ? 'flex' : 'none';
        });
    }

    // Event binding
    bindEvents() {
        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-add-to-cart]')) {
                e.preventDefault();
                const button = e.target.closest('[data-add-to-cart]');
                const productId = button.dataset.productId;
                const quantity = parseInt(button.dataset.quantity) || 1;
                this.addToCart(productId, quantity);
            }

            // Add to favorites buttons
            if (e.target.closest('[data-add-to-favorites]')) {
                e.preventDefault();
                const button = e.target.closest('[data-add-to-favorites]');
                const productId = button.dataset.productId;
                this.toggleFavorite(productId);
            }
        });
    }

    // Notification system
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300 transform translate-x-full`;
        
        // Set background color based on type
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500',
            warning: 'bg-yellow-500'
        };
        
        notification.className += ` ${colors[type] || colors.info}`;
        notification.textContent = message;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Search functionality
    handleSearch(searchTerm) {
        if (searchTerm.trim()) {
            // Redirect to products page with search parameter
            window.location.href = `/productos?search=${encodeURIComponent(searchTerm)}`;
        }
    }
}

// Initialize cart manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cartManager = new CartManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CartManager;
}
