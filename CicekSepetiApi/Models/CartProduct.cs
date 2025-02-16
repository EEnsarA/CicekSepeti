namespace CicekSepetiApi.Models
{
    public class CartProduct
    {
        public int CustomerId { get; set; }

        public int ProductId { get; set; }

        public string ProductName { get; set; } = default!;

        public int ProductCount { get; set; }

        public int DealerId { get; set; }

        public float Price { get; set; }

        public bool IsActive { get; set; }

        public int Stock {  get; set; }

        public string Image { get; set; } = default!;


    }
}
