namespace CicekSepetiApi.Models
{
    public class Dealer
    {
        public int DealerId { get; set; }

        public string DealerName { get; set; } = default!;

        public string DealerEmail { get; set; } = default!;

        public int ProductId { get; set; }
    }
}
