window.addEventListener('DOMContentLoaded', function () {
    updateCartCount(); // Update cart count in navbar
    displayCartTotal(); // Load cart total on page load
});

// Fetch and display cart data on the checkout page
function displayCartTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log("Cart items:", cart);

    const totalValue = document.getElementById('total-price');

    if (cart.length === 0) {
        totalValue.innerHTML = '<strong>Your cart is empty.</strong>';
        totalDiv.innerHTML = '';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        console.log("Item:", item);
        total += item.price * item.quantity; // Calculate total price
    });

    const shippingFee = 5.99; // Example shipping fee
    const taxRate = 0.08; // Example tax rate (8%)

    const taxes = total * taxRate;
    const finalTotal = total + shippingFee + taxes;

    totalValue.innerHTML = `
        <h3><strong>Subtotal:</strong> $${total.toFixed(2)}<br></h3>
        <h3><strong>Shipping Fee:</strong> $${shippingFee.toFixed(2)}<br></h3>
        <h3><strong>Taxes:</strong> $${taxes.toFixed(2)}<br></h3>
        <h3><strong>Total Price:</strong> $${finalTotal.toFixed(2)}</h3>
    `;
}

// Clear the cart (optional)
function clearCart() {
    localStorage.removeItem('cart');
    const totalValue = document.getElementById('total-price');
    const totalDiv = document.getElementById('total-cost');
    totalValue.innerHTML = '<strong>Your cart is empty.</strong>';
    totalDiv.innerHTML = '';
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    const form = document.getElementById('checkout-form');
    const formData = new FormData(form);

    // Create an order object from the form data
    const order = {};
    for (const [key, value] of formData.entries()) {
        order[key] = value;
    }

    // Optionally include cart details in the order
    order.cart = JSON.parse(localStorage.getItem('cart')) || [];

    console.log('Order Submitted:', order);
    alert('Thank you! Your order has been placed.');
    clearCart(); // Clear the cart after order submission

};
