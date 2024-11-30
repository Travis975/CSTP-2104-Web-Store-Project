// Update cart count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart.length;
}

// Clear the cart
function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
    document.getElementById('cart-container').innerHTML = "<p>Your cart is empty!</p>";
}

// Display cart items in the cart page
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    console.log(cartContainer);  // This will show if the element is null or found correctly


    if (!cartContainer) {
        console.error('Cart container element not found!');
        return;
    }

    cartContainer.innerHTML = ''; // Clear the container before adding items

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty!</p>";
    } else {
        cart.forEach(item => {
            const itemDiv = `
                <div style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px;">
                    <h3>${item.title}</h3>
                    <p><strong>Price: $${item.price.toFixed(2)}</strong></p>
                </div>
            `;
            cartContainer.innerHTML += itemDiv;
        });
    }
}
// Ensure the DOM is fully loaded before running displayCart()
document.addEventListener('DOMContentLoaded', function () {
    displayCart();
});