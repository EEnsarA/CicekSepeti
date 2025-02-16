namespace CicekSepetiApi.Models
{
    public class DealerProduct
    {

        public string DealerName { get; set; } = default!;

        public int ProductId { get; set; }

        public string ProductName { get; set; } = default!;

        public float Price { get; set; } = default!;

        public int Stock {  get; set; }

        public string Image { get; set; } = default!;

        public bool IsActive { get; set; }



    }
}
