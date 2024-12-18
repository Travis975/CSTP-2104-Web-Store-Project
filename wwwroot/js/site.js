﻿// Fetch products and render them
async function fetchProducts(query = '') {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        let products = await response.json();
        console.log(products, "this is product data");

        let container = document.getElementById('products-container');

        // If search query exists, filter the products by title or category
        if (query) {
            query = query.toLowerCase();
            products = products.filter(product => {
                return (
                    product.title.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query)
                );
            });
        }

        // Clear the container before appending filtered products
        container.innerHTML = '';

        // Check if no products were found
        if (products.length === 0) {
            container.innerHTML = '<p>No products found for your search.</p>';
            return;
        }

        // Render each filtered product
        products.forEach(product => {
            const title = product.title.split(" ");
            const productCard = `
                <div style="display: flex; flex-direction: column; border: 1px solid #ddd; padding: 15px; width: 300px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                    <div style="height: 200px; display: flex; align-items: center; justify-content: center; box-shadow: none; border: none;">
                        <img src="${product.image}" alt="${product.title}" style="max-width: 100%; max-height: 100%; border: none; margin: 0;">
                    </div>
                    <hr>
                    <h3><a href="/product/${product.id}" style="text-decoration: none; color: inherit;">${title.slice(0, 6).join(" ").replace(",", "")} ${title.length > 6 ? "..." : ""}</a></h3>
                    <p>Description: ${product.description.substring(0, 100)}... <a href="/product/${product.id}" style="text-decoration: none;">Read More</a></p>
                    <div style="border-radius: 0; box-shadow: none; margin-top: auto;">
                        <p><strong>Price: $${product.price.toFixed(2)}</strong></p>
                        <p>Rating: ${product.rating.rate} ⭐ (${product.rating.count} reviews)</p>
                        <button class="btn-accept" onclick="addToCart(${product.id}, '${product.title.replace(/'/g, "\\'")}', ${product.price.toFixed(2)}, '${product.image}')">Add to Cart</button>
                    </div>
                </div>
            `;
            container.innerHTML += productCard;
        });

        updateCartCount(); // Update cart count when products are loaded
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }
}

// Handle search form submission
function handleSearch(event) {
    event.preventDefault();
    let query = document.getElementById('search-input').value.trim();

    // Redirect to homepage with the search query in the URL
    if (query) {
        window.location.href = `/?search=${encodeURIComponent(query)}`;
    }
}

// Add event listener for the search form in the shared header
const searchForm = document.getElementById('search-form');
if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
}


// Load products when home page loads, check for search query in the URL
window.onload = function () {
    if (window.location.pathname === '/') {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');  // Get search query from the URL
        fetchProducts(searchQuery);  // Fetch products with the search query (if exists)
    }
};
