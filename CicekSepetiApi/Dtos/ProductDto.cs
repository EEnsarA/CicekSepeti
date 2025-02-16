using CicekSepetiApi.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace CicekSepetiApi.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; } = null!;
        public float Price { get; set; }    
        public int Stock { get; set; }

        public bool IsActive { get; set; }

        public string Image { get; set; } = null!;
        
    }
}
