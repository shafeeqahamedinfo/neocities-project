// Global Variables
let currentCollection = '';
let currentViewMode = 'grid';
let currentProduct = null;

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set up event listeners
    setupEventListeners();
    
    // Show home page by default
    showHome();
    
    // Initialize animations
    initializeAnimations();
}

function setupEventListeners() {
    // Filter and sort listeners
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterAndSortProducts);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', filterAndSortProducts);
    }
}

function initializeAnimations() {
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe animated elements
    document.querySelectorAll('.animate-fadeInUp').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Navigation Functions
function showHome() {
    hideAllPages();
    document.getElementById('home-page').classList.add('active');
    updateNavigation('home');
}

function showCollection(collection) {
    currentCollection = collection;
    hideAllPages();
    document.getElementById('collection-page').classList.add('active');
    updateNavigation(collection);
    loadCollection(collection);
}

function showProductDetail(productId) {
    const product = findProductById(productId);
    if (!product) return;
    
    currentProduct = product;
    hideAllPages();
    document.getElementById('product-detail-page').classList.add('active');
    loadProductDetail(product);
}

function showCart() {
    hideAllPages();
    document.getElementById('cart-page').classList.add('active');
    loadCart();
}

function hideAllPages() {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
}

function updateNavigation(active) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current nav item
    const activeLinks = document.querySelectorAll(`[onclick*="${active}"]`);
    activeLinks.forEach(link => {
        if (link.classList.contains('nav-link')) {
            link.classList.add('active');
        }
    });
}

function goBackToCollection() {
    if (currentCollection) {
        showCollection(currentCollection);
    } else {
        showHome();
    }
}

// Mobile Menu
function toggleMobileMenu() {
    const mobileNav = document.querySelector('.nav-mobile');
    const menuBtn = document.querySelector('.mobile-menu-btn i');
    
    if (mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        menuBtn.className = 'fas fa-bars';
    } else {
        mobileNav.classList.add('active');
        menuBtn.className = 'fas fa-times';
    }
}

// Collection Functions
function loadCollection(collection) {
    const products = productsData[collection] || [];
    const info = collectionInfo[collection];
    
    // Update collection header
    document.getElementById('collection-title').textContent = info.title;
    document.getElementById('collection-subtitle').textContent = info.subtitle;
    
    // Update category filter options
    updateCategoryFilter(collection);
    
    // Load products
    displayProducts(products);
}

function updateCategoryFilter(collection) {
    const categoryFilter = document.getElementById('category-filter');
    const filters = categoryFilters[collection] || [];
    
    categoryFilter.innerHTML = '';
    filters.forEach(filter => {
        const option = document.createElement('option');
        option.value = filter.value;
        option.textContent = filter.label;
        categoryFilter.appendChild(option);
    });
}

function displayProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <p>No products found matching your criteria.</p>
            </div>
        `;
        return;
    }
    
    products.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        container.appendChild(productCard);
    });
}

function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = `product-card ${currentViewMode === 'list' ? 'list-view' : ''}`;
    card.style.animationDelay = `${index * 100}ms`;
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-overlay"></div>
            <div class="product-actions">
                <button class="action-btn" onclick="showProductDetail('${product.id}')" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
        <div class="product-info">
            <div class="product-header">
                <h3 class="product-name">${product.name}</h3>
                <span class="product-category">${product.category}</span>
            </div>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">₹${product.price}</span>
                <span class="product-sizes">Sizes: ${product.sizes.join(', ')}</span>
            </div>
            <button class="add-to-cart-btn" onclick="quickAddToCart('${product.id}')">
                <i class="fas fa-shopping-cart"></i>
                Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

function quickAddToCart(productId) {
    const product = findProductById(productId);
    if (!product) return;
    
    // Add with first available size
    const defaultSize = product.sizes[0];
    cartManager.addItem(product, defaultSize, 1);
}

// Product Detail Functions
function loadProductDetail(product) {
    const container = document.getElementById('product-detail-content');
    
    container.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <div class="product-detail-header">
                    <h1 class="product-detail-name">${product.name}</h1>
                    <div class="product-detail-meta">
                        <span class="product-detail-price">₹${product.price}</span>
                        <span class="product-detail-category">${product.category}</span>
                    </div>
                    <div class="product-rating">
                        ${[...Array(5)].map(() => '<i class="fas fa-star star"></i>').join('')}
                        <span class="product-rating-text">(4.8/5 - 124 reviews)</span>
                    </div>
                </div>
                
                <div class="product-section">
                    <h3>Description</h3>
                    <p class="product-detail-description">${product.description}</p>
                </div>
                
                <div class="product-section">
                    <h3>Features</h3>
                    <ul class="product-features">
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="product-section">
                    <h3>Select Size</h3>
                    <div class="size-selection">
                        ${product.sizes.map(size => `
                            <button class="size-btn" onclick="selectSize('${size}')" data-size="${size}">
                                ${size}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="product-section">
                    <h3>Quantity</h3>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(-1)">-</button>
                        <span class="quantity-display" id="quantity-display">1</span>
                        <button class="quantity-btn" onclick="updateQuantity(1)">+</button>
                    </div>
                </div>
                
                <div class="product-actions-detail">
                    <button class="btn btn-primary" onclick="addToCartFromDetail()">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                    <button class="whatsapp-btn" onclick="orderProductOnWhatsApp()">
                        <i class="fab fa-whatsapp"></i>
                        Order on WhatsApp
                    </button>
                </div>
                
                <div class="total-price">
                    <span class="total-price-label">Total Price:</span>
                    <span class="total-price-value" id="total-price">₹${product.price}</span>
                </div>
            </div>
        </div>
    `;
}

let selectedSize = '';
let selectedQuantity = 1;

function selectSize(size) {
    selectedSize = size;
    
    // Update UI
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    document.querySelector(`[data-size="${size}"]`).classList.add('selected');
}

function updateQuantity(change) {
    selectedQuantity = Math.max(1, selectedQuantity + change);
    document.getElementById('quantity-display').textContent = selectedQuantity;
    
    if (currentProduct) {
        const totalPrice = currentProduct.price * selectedQuantity;
        document.getElementById('total-price').textContent = `₹${totalPrice}`;
    }
}

function addToCartFromDetail() {
    if (!selectedSize) {
        alert('Please select a size');
        return;
    }
    
    if (!currentProduct) return;
    
    cartManager.addItem(currentProduct, selectedSize, selectedQuantity);
}

function orderProductOnWhatsApp() {
    if (!selectedSize) {
        alert('Please select a size');
        return;
    }
    
    if (!currentProduct) return;
    
    const message = `Hi! I'd like to order:
Product: ${currentProduct.name}
Size: ${selectedSize}
Quantity: ${selectedQuantity}
Price: ₹${currentProduct.price * selectedQuantity}

Please confirm availability and delivery details.`;

    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Cart Functions
function loadCart() {
    const container = document.getElementById('cart-content');
    const items = cartManager.items;
    
    if (items.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">
                    <i class="fas fa-shopping-bag"></i>
                </div>
                <h2 class="cart-empty-title">Your Cart is Empty</h2>
                <p class="cart-empty-description">Looks like you haven't added any items to your cart yet.</p>
                <button class="btn btn-primary" onclick="showHome()">Continue Shopping</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <div class="cart-items">
            ${items.map(item => createCartItem(item)).join('')}
        </div>
        <div class="cart-summary">
            <div class="cart-total">
                <span class="cart-total-label">Total Amount:</span>
                <span class="cart-total-value">₹${cartManager.getTotal()}</span>
            </div>
            <div class="cart-actions">
                <button class="btn btn-primary whatsapp-btn" onclick="cartManager.orderOnWhatsApp()">
                    <i class="fab fa-whatsapp"></i>
                    Order on WhatsApp
                </button>
                <button class="btn btn-secondary" onclick="showHome()">Continue Shopping</button>
            </div>
        </div>
    `;
}

function createCartItem(item) {
    return `
        <div class="cart-item">
            <div class="cart-item-content">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-size">Size: ${item.size}</p>
                    <p class="cart-item-price">₹${item.price}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateCartItemQuantity('${item.id}', '${item.size}', ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateCartItemQuantity('${item.id}', '${item.size}', ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="cart-item-total">
                    <p class="cart-item-total-price">₹${item.price * item.quantity}</p>
                    <button class="remove-btn" onclick="removeCartItem('${item.id}', '${item.size}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function updateCartItemQuantity(itemId, size, newQuantity) {
    cartManager.updateQuantity(itemId, size, newQuantity);
    loadCart(); // Refresh cart display
}

function removeCartItem(itemId, size) {
    cartManager.removeItem(itemId, size);
    loadCart(); // Refresh cart display
}

// Filter and Sort Functions
function filterAndSortProducts() {
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (!categoryFilter || !sortFilter || !currentCollection) return;
    
    let products = [...(productsData[currentCollection] || [])];
    
    // Filter by category
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== 'all') {
        products = products.filter(product => product.category === selectedCategory);
    }
    
    // Sort products
    const sortBy = sortFilter.value;
    products.sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'name':
            default:
                return a.name.localeCompare(b.name);
        }
    });
    
    displayProducts(products);
}

// View Mode Functions
function setViewMode(mode) {
    currentViewMode = mode;
    
    // Update view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${mode}"]`).classList.add('active');
    
    // Update products container
    const container = document.getElementById('products-container');
    container.className = mode === 'list' ? 'products-list' : 'products-grid';
    
    // Update product cards
    document.querySelectorAll('.product-card').forEach(card => {
        if (mode === 'list') {
            card.classList.add('list-view');
        } else {
            card.classList.remove('list-view');
        }
    });
}

// Utility Functions
function findProductById(productId) {
    for (const collection in productsData) {
        const product = productsData[collection].find(p => p.id === productId);
        if (product) return product;
    }
    return null;
}

// Modal Functions
function openProductModal(productId) {
    const product = findProductById(productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const content = document.getElementById('modal-product-content');
    
    content.innerHTML = `
        <div class="modal-product-detail">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; max-width: 400px; border-radius: 0.5rem; margin-bottom: 1rem;">
            <h2 style="color: #f59e0b; margin-bottom: 0.5rem;">${product.name}</h2>
            <p style="color: #d1d5db; margin-bottom: 1rem;">${product.description}</p>
            <p style="font-size: 1.5rem; font-weight: bold; color: #f59e0b; margin-bottom: 1rem;">₹${product.price}</p>
            <button class="btn btn-primary" onclick="showProductDetail('${product.id}'); closeProductModal();">
                View Full Details
            </button>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('product-modal');
    if (e.target === modal) {
        closeProductModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});

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

// Add loading states
function showLoading() {
    const loader = document.createElement('div');
    loader.id = 'loading';
    loader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 23, 42, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        ">
            <div style="
                color: #f59e0b;
                font-size: 2rem;
                animation: pulse 2s ease-in-out infinite;
            ">
                <i class="fas fa-spinner fa-spin"></i>
                Loading...
            </div>
        </div>
    `;
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.getElementById('loading');
    if (loader) {
        loader.remove();
    }
}

// Performance optimization - Lazy loading images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', setupLazyLoading);