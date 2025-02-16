using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CicekSepetiApi.Models
{
    public class Cart
    {

        
        public int UserId {  get; set; }

        public int ProductId { get; set; }

        public int ProductCount { get; set; }

        // Navigation Properties
        public Product? Product { get; set; }

        public User? User { get; set; }

    }
}
