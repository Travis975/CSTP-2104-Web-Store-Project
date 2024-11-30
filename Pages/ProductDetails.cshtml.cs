using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class ProductDetailsModel : PageModel
{
    // Define a property to hold the product details
    public Product Product { get; set; }

    // Define the OnGet method to accept the id from the URL
    public async Task OnGetAsync(int id)
    {
        // Fetch the product based on the provided id
        Product = await GetProductById(id);
    }

    // Method to fetch product details (e.g., from an API or database)
    private async Task<Product> GetProductById(int id)
    {
        // Example of fetching product data from an external API (like FakestoreAPI)
        using (var client = new HttpClient())
        {
            var response = await client.GetStringAsync($"https://fakestoreapi.com/products/{id}");
            var product = JsonConvert.DeserializeObject<Product>(response);
            return product;
        }
    }
}

// Product model class (you should adapt this to your actual product model)
public class Product
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string Image { get; set; }
    public Rating Rating { get; set; }
}

// Rating model (if needed, based on the API response structure)
public class Rating
{
    public float Rate { get; set; }
    public int Count { get; set; }
}
