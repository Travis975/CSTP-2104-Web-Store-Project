// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Fetch products and render them
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        const container = document.getElementById('products-container');

        products.forEach(product => {
            const productCard = `
                <div style="border: 1px solid #ddd; padding: 15px; width: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                    <img src="${product.image}" alt="${product.title}" style="width: 100%; height: auto; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
                    <h3>${product.title}</h3>
                    <p>${product.description.substring(0, 100)}...</p>
                    <p><strong>Price: $${product.price}</strong></p>
                    <p>Rating: ${product.rating.rate} ⭐ (${product.rating.count} reviews)</p>
                    <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
                </div>
            `;
            container.innerHTML += productCard;
        });
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }
}

// Add to cart (localStorage implementation for simplicity)
function addToCart(id, title, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ id, title, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${title} added to the cart!`);
}

// Load products when the page loads
window.onload = fetchProducts;

