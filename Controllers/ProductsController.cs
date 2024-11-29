using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

[Route("api/products")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public ProductsController()
    {
        _httpClient = new HttpClient();
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        var response = await _httpClient.GetAsync("https://fakestoreapi.com/products");
        if (!response.IsSuccessStatusCode)
        {
            return StatusCode((int)response.StatusCode, "Failed to fetch products.");
        }

        var content = await response.Content.ReadAsStringAsync();
        return Content(content, "application/json");
    }
}
