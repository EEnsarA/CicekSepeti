using System.ComponentModel.DataAnnotations.Schema;

namespace CicekSepetiApi.Models
{
    public class Product
    {
        public int Id { get; set; }

        [ForeignKey(nameof(User))]
        public int UserId { get; set; }

        public string ProductName { get; set; } = null!;
        public float Price { get; set; }

        public bool IsActive { get; set; } = false;

        public int Stock { get; set; }

        public string Image { get; set; } = null!;

        // navigation property
        public User? User { get; set; }

        public virtual ICollection<ProductCategory> ?Categories { get; set; }

        public virtual ICollection<Cart>? CartUsers { get; set; }



    }
}
