// Cart Management
class CartManager {
    constructor() {
        this.items = this.loadCart();
        this.updateCartDisplay();
    }

    loadCart() {
        const saved = localStorage.getItem('haniffa-cart');
        return saved ? JSON.parse(saved) : [];
    }

    saveCart() {
        localStorage.setItem('haniffa-cart', JSON.stringify(this.items));
        this.updateCartDisplay();
    }

    addItem(product, size, quantity = 1) {
        const existingItem = this.items.find(item => 
            item.id === product.id && item.size === size
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                size: size,
                quantity: quantity,
                category: product.category
            });
        }

        this.saveCart();
        this.showAddToCartNotification(product.name);
    }

    removeItem(itemId, size) {
        this.items = this.items.filter(item => 
            !(item.id === itemId && item.size === size)
        );
        this.saveCart();
    }

    updateQuantity(itemId, size, newQuantity) {
        if (newQuantity <= 0) {
            this.removeItem(itemId, size);
            return;
        }

        const item = this.items.find(item => 
            item.id === itemId && item.size === size
        );
        
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => 
            total + (item.price * item.quantity), 0
        );
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    clearCart() {
        this.items = [];
        this.saveCart();
    }

    updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = this.getTotalItems();
        
        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    showAddToCartNotification(productName) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="cart-notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${productName} added to cart!</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #25d366;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            z-index: 2000;
            animation: slideInRight 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .cart-notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    generateWhatsAppMessage() {
        if (this.items.length === 0) {
            return '';
        }

        const orderDetails = this.items.map(item => 
            `${item.name} (Size: ${item.size}) - Qty: ${item.quantity} - ₹${item.price * item.quantity}`
        ).join('\n');

        return `Hi! I'd like to place an order:

${orderDetails}

Total Amount: ₹${this.getTotal()}

Please confirm availability and provide delivery details.`;
    }

    orderOnWhatsApp() {
        if (this.items.length === 0) {
            alert('Your cart is empty');
            return;
        }

        const message = this.generateWhatsAppMessage();
        const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
}

// Initialize cart manager
const cartManager = new CartManager();