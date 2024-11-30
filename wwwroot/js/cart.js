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

// Clear the cart
function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
    document.getElementById('cart-container').innerHTML = "<p>Your cart is empty!</p>";
}

// Display cart items in the cart page
async function displayCart() {
    updateCartCount() // Display cart amount in cart page
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
        for (const item of cart) {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${item.id}`);
                const product = await response.json();

                // Check if product data is fetched
                if (product) {
                    console.log('Product found');
                } else {
                    console.error('Product not found');
                }

                const itemDiv = `
                    <div style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; display: flex; align-items: center;">
                        <div style="height: 100px; width: 100px; display: flex; align-items: center; justify-content: center; box-shadow: none; border: none; margin-right: 15px;">
                            <img src="${product.image}" alt="${product.title}" style="max-width: 100%; max-height: 100%; border: none; margin: 0;">
                        </div>
                        <div>
                            <h3>${product.title}</h3>
                            <p><strong>Price: $${product.price.toFixed(2)}</strong></p>
                        </div>
                    </div>
                `;
                cartContainer.innerHTML += itemDiv;
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }
    }
}
// Ensure the DOM is fully loaded before running displayCart()
document.addEventListener('DOMContentLoaded', function () {
    displayCart();
});