// js/cart.js
let cart = [];
const SHIPPING_COST = 50;
const VAT_RATE = 0.20; // 20%

function initCart() {
    const storedCart = localStorage.getItem('audiophileCart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        console.log('Cart initialized from localStorage:', cart);
    }
    updateCartIconCount();
    renderCartModal(); // Also render modal on init
}

function saveCart() {
    localStorage.setItem('audiophileCart', JSON.stringify(cart));
    console.log('Cart saved to localStorage:', cart);
    updateCartIconCount();
    renderCartModal();
}

function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += quantity;
        console.log('Updated existing item in cart:', existingItem);
    } else {
        cart.push({
            id: product.id,
            slug: product.slug,
            name: product.name, // Store shortened name if needed for display
            shortName: product.name.replace(/(Headphones|Earphones|Speaker|Wireless)/i, '').trim(),
            price: product.price,
            quantity: quantity,
            image: product.image?.cart || product.categoryImage?.mobile || product.image?.mobile // Fallback for cart image
        });
        console.log('Added new item to cart:', cart[cart.length - 1]);
    }
    saveCart();
    // Optionally show a small confirmation message
    showToast(`${quantity} x ${product.name.replace(/(Headphones|Earphones|Speaker|Wireless)/i, '').trim()} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart();
        }
    }
}

function clearCart() {
    cart = [];
    saveCart();
}

function getCartItems() {
    return [...cart]; // Return a copy
}

function getCartSubtotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getVAT() {
    return getCartSubtotal() * VAT_RATE;
}

function getGrandTotal() {
    const subtotal = getCartSubtotal();
    const vat = getVAT();
    return subtotal + SHIPPING_COST + vat; 
}
 // If VAT is added on top of subtotal + shipping:
 // function getGrandTotal() {
 //    const subtotal = getCartSubtotal();
 //    return subtotal + SHIPPING_COST + (subtotal * VAT_RATE);
 // }
 // The design says "VAT (INCLUDED)" suggesting it's part of the displayed price or calculated on product total before shipping.
 // For this implementation, let's assume VAT is calculated on product total and displayed, and grand total includes product + shipping.
 // The prompt says: "VAT calculated at 20% of the product total (excluding shipping)"

function updateCartIconCount() {
    const cartCountSpan = document.querySelector('.cart-count');
    if (cartCountSpan) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (totalItems > 0) {
            cartCountSpan.textContent = totalItems;
            cartCountSpan.style.display = 'inline-block';
        } else {
            cartCountSpan.style.display = 'none';
        }
    }
}

function renderCartModal() {
    const cartModalItemsContainer = document.getElementById('cart-modal-items');
    const cartModalCount = document.getElementById('cart-modal-count');
    const cartModalTotalPrice = document.getElementById('cart-modal-total-price');
    const cartCheckoutButton = document.getElementById('cart-checkout-button');
    const emptyMessage = document.querySelector('.cart-empty-message');

    if (!cartModalItemsContainer) return;

    cartModalItemsContainer.innerHTML = ''; // Clear previous items

    if (cart.length === 0) {
        if(emptyMessage) emptyMessage.style.display = 'block';
        if(cartCheckoutButton) cartCheckoutButton.style.display = 'none';
        cartModalItemsContainer.innerHTML = '<p class="cart-empty-message">Your cart is empty.</p>';

    } else {
        if(emptyMessage) emptyMessage.style.display = 'none';
        if(cartCheckoutButton) cartCheckoutButton.style.display = 'block';

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-modal-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-modal-item-image">
                <div class="cart-modal-item-details">
                    <p class="cart-modal-item-name">${item.shortName}</p>
                    <p class="cart-modal-item-price">$${item.price.toLocaleString()}</p>
                </div>
                <div class="quantity-control cart-modal-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
            `;
            cartModalItemsContainer.appendChild(itemElement);
        });
    }

    if (cartModalCount) cartModalCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartModalTotalPrice) cartModalTotalPrice.textContent = `$${getCartSubtotal().toLocaleString()}`;

    // Add event listeners for new quantity controls
    cartModalItemsContainer.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(parseInt(btn.dataset.id), cart.find(i => i.id === parseInt(btn.dataset.id)).quantity - 1));
    });
    cartModalItemsContainer.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(parseInt(btn.dataset.id), cart.find(i => i.id === parseInt(btn.dataset.id)).quantity + 1));
    });
}

 function showToast(message, duration = 3000) {
     const toastId = 'toast-message';
     let toast = document.getElementById(toastId);
     if (!toast) {
         toast = document.createElement('div');
         toast.id = toastId;
         toast.className = 'toast-message';
         document.body.appendChild(toast);
     }
     toast.textContent = message;
     toast.classList.add('show');
     setTimeout(() => {
         toast.classList.remove('show');
     }, duration);
 }


// Initialize cart when script loads
initCart();