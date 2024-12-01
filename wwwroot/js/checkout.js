// Display cart items and total price
function displayCartOnCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    const totalValue = document.getElementById('total-value');

    // Clear previous cart items
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty. Add items before checking out!</p>';
        totalValue.innerHTML = '';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const cartItem = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
                <span>${item.title} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
        cartContainer.innerHTML += cartItem;
        total += item.price * item.quantity;
    });

    totalValue.innerHTML = `<strong>Total Price (Before Taxes and Shipping): $${total.toFixed(2)}</strong>`;
}

// Clear the cart (optional, used for testing purposes)
function clearCart() {
    localStorage.removeItem('cart');
    displayCartOnCheckout(); // Refresh the cart view
}

// Load cart data on page load
window.onload = function () {
    displayCartOnCheckout();
};
