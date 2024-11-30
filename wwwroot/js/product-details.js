window.onload = async function() {
    // Get the product ID from the URL (e.g., /product/1)
    const productId = window.location.pathname.split('/').pop();  // Extract the ID from the URL
    console.log(productId, 'this is product IDs')

    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await response.json();

        // Check if product data is fetched
        if (product) {
            document.getElementById('product-title').innerText = product.title;
            document.getElementById('product-image').src = product.image;
            document.getElementById('product-price').innerText = product.price.toFixed(2);
            document.getElementById('product-rating').innerText = product.rating.rate;
            document.getElementById('product-rating-count').innerText = product.rating.count;
            document.getElementById('product-description').innerText = product.description;
        } else {
            console.error('Product not found');
        }

        // Add to cart functionality
        document.getElementById('add-to-cart-btn').addEventListener('click', function() {
            addToCart(product.id, product.title, product.price, product.image);
        });
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
};