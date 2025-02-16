namespace CicekSepetiApi.Models
{
    public class Category
    {
        public int Id { get; set; }

        public string CategoryName { get; set; } = default!;
        // kollektif bir yapı olması gerek (list ,ICollection..)
        public  ICollection<ProductCategory>? Products { get; set; }

    }
}
