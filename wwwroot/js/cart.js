// Update cart count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    let cartAmount = cart.length;
    if (cartAmount > 9) {
        cartAmount = "9+";
    }
    cartCount.innerText = cartAmount;
}

// Remove item from cart
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Clear the cart
function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
    document.getElementById('cart-container').innerHTML = "<p>Your cart is empty!</p>";
    document.getElementById('total-value').innerHTML = "";
}

// Update item quantity in the cart
function updateItemQuantity(id, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === id);

    cart[itemIndex].quantity = parseFloat(quantity == 0 ? 1 : quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();

    console.log(cart)
}

// Display cart items in the cart page
function displayCart() {
    updateCartCount()

    let total = 0;

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
        document.getElementById('total-value').innerHTML = "";
    } else {
        cart.forEach(item => {
            const itemDiv = `
                <div style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; display: flex; align-items: center;">
                    <div style="height: 100px; width: 100px; display: flex; align-items: center; justify-content: center; box-shadow: none; border: none; margin-right: 15px;">
                        <img src="${item.image}" alt="${item.title}" style="max-width: 100%; max-height: 100%; border: none; margin: 0;">
                    </div>
                    <div style="flex-grow: 1;">
                        <h3>${item.title}</h3>
                        <div style="flex-grow: 1;">
                            <p><strong>Price: $${item.price.toFixed(2)}</strong></p>
                            <input type="number" value="${item.quantity}" min="1" style="width: 40px;" onchange="updateItemQuantity(${item.id}, this.value)" />
                        </div>
                    </div>
                    <button onclick="removeFromCart(${item.id})" style="background: none; border: none; cursor: pointer;">
                        <i class="fas fa-trash" style="color: red; font-size: 20px;"></i>
                    </button>
                </div>
            `;
            cartContainer.innerHTML += itemDiv;
            total += parseFloat(item.price * item.quantity);
        });

        document.getElementById('total-value').innerHTML = `Total: $${total.toFixed(2) }`;
    }
}
// Ensure the DOM is fully loaded before running displayCart()
document.addEventListener('DOMContentLoaded', function () {
    displayCart();
});