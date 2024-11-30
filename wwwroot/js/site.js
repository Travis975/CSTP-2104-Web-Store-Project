// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Fetch products and render them
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        console.log(products, "this is product data");

        let container = document.getElementById('products-container');

        products.forEach(product => {
            const title = product.title.split(" ");
            const productCard = `
                <div style="display: flex; flex-direction: column; border: 1px solid #ddd; padding: 15px; width: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                    <div style="height: 200px; display: flex; align-items: center; justify-content: center; box-shadow: none; border: none;">
                        <img src="${product.image}" alt="${product.title}" style="max-width: 100%; max-height: 100%; border: none; margin: 0;">
                    </div>
                    <hr>
                    <h3>${title.slice(0, 6).join(" ").replace(",", "")} ${title.length > 6 ? "..." : ""}</h3>
                    <p>Description: ${product.description.substring(0, 100)}... <a href="/product/${product.id}">Read More</a></p>
                    <div style="border-radius: 0; box-shadow: none; margin-top: auto;">
                        <p><strong>Price: $${product.price.toFixed(2)}</strong></p>
                        <p>Rating: ${product.rating.rate} ⭐ (${product.rating.count} reviews)</p>
                        <button onclick="addToCart(${product.id}, '${product.title}', ${product.price.toFixed(2)})" style="display: inline-block; background-color: var(--primary-color); color: white; border: none; border-radius: 8px; padding: 10px; text-align: center; cursor: pointer;">Add to Cart</button>
                    </div>
                </div>
            `;
            container.innerHTML += productCard;
        });

        updateCartCount();  // Update cart count when products are loaded
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
    updateCartCount();  // Update the cart count in the header
}

// Load products when the page loads
window.onload = fetchProducts;



