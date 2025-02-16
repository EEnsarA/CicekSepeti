namespace CicekSepetiApi.Models
{
    #region ManyToMany
    //Cross Table Manuel yada EF CORE hazır olarak oluşturabilir , Hazır oluşturmak için ; Product ve Category ye kollektif bir yapı olacak şekilde (list , ICollection..)
    //girilir örn : (public List<Product> Products {get;set;}) , Burada 3. tabloyu Cross Table ı otomatik ef core oluşturur ! ve Many to Many ilişkisi sağlanır
    //Manuel Olarak da Cross Table ı oluşturup diğer tablolarla 1 - n ilişki kurarız ! Cross Table da composite PK YI Attributes lar ile oluşturmayız ! bu yüzden
    //Fluent Api da oluştururuz OnModelCreating' de Composite PK : Cross Table da ki PK dır . (ProdutId,CategoryId) => Bu sayede Unıque Bir yapı olur
    //Cross Table ' a ait bir Entity Modeli oluşturuyorsak bunu context içerisinde DbSet olarak vermemize gerek yok !
    #endregion
    public class ProductCategory
    {

        public int ProductId { get; set; }

        public int CategoryId { get; set; }


        // Navigation Properties
        public Product? Product { get; set; }

        public Category? Category { get; set; }

    }
}
