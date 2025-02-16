
using CicekSepetiApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CicekSepetiApi.Context
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options ): base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<Dealer>()
                .ToView("vm_Dealers").
                HasNoKey();

            modelBuilder.Entity<DealerProduct>()
                .HasNoKey();

            modelBuilder.Entity<CartProduct>()
                .HasNoKey();

            modelBuilder.Entity<LogProduct>()
                .HasKey(l => l.Id);

            modelBuilder.Entity<Product>()
                .HasKey(p => p.Id);
            modelBuilder.Entity<Product>().ToTable(tb => tb.HasTrigger("tg_ProductsLogUpdate"));


            modelBuilder.Entity<User>()
                .HasKey(p => p.Id);

            modelBuilder.Entity<User>().ToTable(tb => tb.HasTrigger("tg_UsersLogUpdate"));



            // ONE TO MANY İLİŞKİSİ (1 product 1 user a aitti , bir user birden fazla producta sahip olabilir) 
            modelBuilder.Entity<Product>()   
                .HasOne(p => p.User)
                .WithMany(x => x.Products)
                .HasForeignKey(p => p.UserId);

       

            // MANY TO MANY İLİŞKİSİ  (1 product 1 den fazla kategoriye sahip olabililir , 1 kategoride 1 den fazla product olabilir) Product-Category
            modelBuilder.Entity<ProductCategory>().HasKey(p => new {p.ProductId,p.CategoryId}); // HasKey de Anonim tür oluşturmak için new kullanıyorz !
            modelBuilder.Entity<ProductCategory>()
                .HasOne(p => p.Product)
                .WithMany(p => p.Categories)
                .HasForeignKey(p => p.ProductId);

            modelBuilder.Entity<ProductCategory>()
                .HasOne(p => p.Category)
                .WithMany(p => p.Products)
                .HasForeignKey(p => p.CategoryId);


            modelBuilder.Entity<Cart>().HasKey(c => new { c.ProductId, c.UserId });
            modelBuilder.Entity<Cart>()
                .HasOne(p => p.Product)
                .WithMany(p => p.CartUsers)
                .HasForeignKey(p => p.ProductId)
                .OnDelete(DeleteBehavior.NoAction);
           

            modelBuilder.Entity<Cart>()
                .HasOne(p=>p.User)
                .WithMany(p => p.CartProducts)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.NoAction);
            

            // MANY TO MANY İLİŞKİSİ  User-Role
            modelBuilder.Entity<UserRole>().HasKey(p => new { p.UserId, p.RoleId });
            modelBuilder.Entity<UserRole>()
                .HasOne(p => p.Role)
                .WithMany(p => p.Users)
                .HasForeignKey(p => p.RoleId);

            modelBuilder.Entity<UserRole>()
                .HasOne(p => p.User)
                .WithMany(p => p.Roles)
                .HasForeignKey(p => p.UserId);

            // Seed Data

            modelBuilder.Entity<User>().HasData(new User() { Id = 1, FirstName = "Ensar", LastName = "Atıcı", Email = "ensar@gmail.com", Password = "ensar123", CreatedTime = DateTime.Now});
            modelBuilder.Entity<User>().HasData(new User() { Id = 2, FirstName = "Çiçek", LastName = "Sepeti", Email = "cicekSepeti@gmail.com", Password = "çiçeksepeti123", CreatedTime = DateTime.Now});
            modelBuilder.Entity<User>().HasData(new User() { Id = 3, FirstName = "Vega", LastName = "Hediyelik", Email = "vega@hotmail.com", Password = "vegahediyelik123", CreatedTime = DateTime.Now});
            modelBuilder.Entity<User>().HasData(new User() { Id = 8, FirstName = "Sevgi", LastName = "Lambası", Email = "sevgiLambasi@gmail.com", Password = "sevgiLambası123", CreatedTime = DateTime.Now});
            modelBuilder.Entity<User>().HasData(new User() { Id = 4, FirstName = "Mehmet", LastName = "Fatih", Email = "mehmet@gmail.com", Password = "mehmet123", CreatedTime = DateTime.Now});
            modelBuilder.Entity<User>().HasData(new User() { Id = 5, FirstName = "Math", LastName = "Bonus", Email = "math@hotmail.com", Password = "math123", CreatedTime = DateTime.Now});
            modelBuilder.Entity<User>().HasData(new User() { Id = 6,FirstName = "Ahmet", LastName = "Yıldız", Email = "ahmet@gmail.com", Password = "ahmet123", CreatedTime = DateTime.Now });
            modelBuilder.Entity<User>().HasData(new User() { Id = 7, FirstName = "John", LastName = "Wick", Email = "john@hotmail.com", Password = "john123", CreatedTime = DateTime.Now });
            modelBuilder.Entity<User>().HasData(new User() { Id = 9, FirstName = "Zehra", LastName = "Polat", Email = "zehra@hotmail.com", Password = "zehra123", CreatedTime = DateTime.Now });
            modelBuilder.Entity<User>().HasData(new User() { Id = 10, FirstName = "Efdal", LastName = "Atıcı", Email = "efdal@hotmail.com", Password = "efdal123", CreatedTime = DateTime.Now });
         


            modelBuilder.Entity<Role>().HasData(new Role() { Id = 1, RoleName = "admin" });
            modelBuilder.Entity<Role>().HasData(new Role() { Id = 2, RoleName = "user" });
            modelBuilder.Entity<Role>().HasData(new Role() { Id = 3, RoleName = "dealer" });

            modelBuilder.Entity<UserRole>().HasData(new UserRole() { UserId = 1, RoleId = 1 });
            modelBuilder.Entity<UserRole>().HasData(new UserRole() { UserId = 2, RoleId = 3 });
            modelBuilder.Entity<UserRole>().HasData(new UserRole() { UserId = 3, RoleId = 3 });
            modelBuilder.Entity<UserRole>().HasData(new UserRole() { UserId = 4, RoleId = 2 });
            modelBuilder.Entity<UserRole>().HasData(new UserRole() { UserId = 5, RoleId = 2 });
            modelBuilder.Entity<UserRole>().HasData(new UserRole() { UserId = 6, RoleId = 2 });
            modelBuilder.Entity<UserRole>().HasData(new UserRole() { UserId = 7, RoleId = 2 });
            modelBuilder.Entity<UserRole>().HasData(new UserRole() { UserId = 8, RoleId = 3 });
            modelBuilder.Entity<UserRole>().HasData(new UserRole() { UserId = 9, RoleId = 2 });
            modelBuilder.Entity<UserRole>().HasData(new UserRole() { UserId = 10, RoleId = 1 });


            modelBuilder.Entity<Category>().HasData(new Category() { Id = 1, CategoryName = "Çiçek" });
            modelBuilder.Entity<Category>().HasData(new Category() { Id = 2, CategoryName = "Çikolata" });
            modelBuilder.Entity<Category>().HasData(new Category() { Id = 3, CategoryName = "Yılbaşı" });
            modelBuilder.Entity<Category>().HasData(new Category() { Id = 4, CategoryName = "Hediye" });
            modelBuilder.Entity<Category>().HasData(new Category() { Id = 5, CategoryName = "Doğum Günü" });
            modelBuilder.Entity<Category>().HasData(new Category() { Id = 6, CategoryName = "Kokina ve Ponsetya" });
            modelBuilder.Entity<Category>().HasData(new Category() { Id = 7, CategoryName = "Orkide ve Saksı Çiçekleri" });
            modelBuilder.Entity<Category>().HasData(new Category() { Id = 8, CategoryName = "Yenilebilir Çiçek" });
            modelBuilder.Entity<Category>().HasData(new Category() { Id = 9, CategoryName = "Hediye Setleri" });
            
            modelBuilder.Entity<Product>().HasData(new Product() { Id = 1, ProductName = "Kırmızı Gül Çiçek Buketi", Price = 329, IsActive = true, Stock = 1850 ,Image= "kırmızıGülÇiçekBuketi.jpg,kırmızıGülÇiçekBuketiDetail1.jpg", UserId = 2});
            modelBuilder.Entity<Product>().HasData(new Product() { Id = 2, ProductName = "Beyaz Papatya Çiçek Buketi", Price = 299, IsActive = true, Stock = 1250 ,Image= "beyazPapatyaÇiçekBuketi.jpg,beyazPapatyaÇiçekBuketiDetails1.jpg", UserId = 2});
            modelBuilder.Entity<Product>().HasData(new Product() { Id = 3, ProductName = "2 Dal Beyaz Orkide Çiçeği", Price = 849, IsActive = true, Stock = 960,Image= "2dalBeyazOrkide.jpg,2dalBeyazOrkideDetails1.jpg", UserId = 2 });
            modelBuilder.Entity<Product>().HasData(new Product() { Id = 4, ProductName = "Saksıda Beyaz Spatifilyum", Price = 469, IsActive = true, Stock = 735, Image = "saksıdaBeyazSpa.jpg,saksıdaBeyazSpaDetails1.jpg", UserId = 2 });
            modelBuilder.Entity<Product>().HasData(new Product() { Id = 5, ProductName = "Mutlu Ayıcık ve Çiçekli Çikolata Kutusu", Price = 479, IsActive = true, Stock = 150,Image= "ayıcıkVeÇikolataKutusu.jpg,ayıcıkVeÇikolataKutusuDetails1.jpg", UserId = 2});
            modelBuilder.Entity<Product>().HasData(new Product() { Id = 6, ProductName = "Paşabahçe Akvaryum Vazoda 7 Kırmızı Gül", Price = 569, IsActive = true, Stock = 368, Image = "akvaryumVeKırmızı7Gül.jpg,akvaryumVeKırmızı7GülDetails1.jpg", UserId = 2});
            modelBuilder.Entity<Product>().HasData(new Product() { Id = 7, ProductName = "Kraft Buket Kağıdında Kokina Yılbaşı Çiçeği", Price = 749, IsActive = true, Stock = 980,Image= "kraftBukKağıtKokinaYılbaşıÇiçeği.jpg,kraftBukKağıtKokinaYılbaşıÇiçeğiDetails1.jpg", UserId = 2});
            modelBuilder.Entity<Product>().HasData(new Product() { Id = 8, ProductName = "Siyah Bukette Kokina ve Turuncu Çardak Güller", Price = 649, IsActive = true, Stock = 915,Image= "siyahBuketKokinaVeTurÇarGüller.jpg,siyahBuketKokinaVeTurÇarGüllerDetails1.jpg", UserId = 2});
            modelBuilder.Entity<Product>().HasData(new Product() { Id = 9, ProductName = "Mutlu Yıllar Mesajlı Keklerle Lezzet Kutusu", Price = 599, IsActive = true, Stock = 785,Image= "mutluYılMesajKekLezzetKutu.jpg,mutluYılMesajKekLezzetKutuDetails1.jpg", UserId = 2});
            modelBuilder.Entity<Product>().HasData(new Product() { Id = 10, ProductName = "Yenilebilir Gül Buketi", Price = 349, IsActive = true, Stock = 635,Image= "yenilebilirGülBuk.jpg,yenilebilirGülBukDetails1.jpg", UserId = 2});
            modelBuilder.Entity<Product>().HasData(new Product() { Id = 11, ProductName = "Akvaryumda 7 Kırmızı Gül ve Kalpli Gurme Lezzetler", Price = 669, IsActive = true, Stock = 438,Image= "akvar7KırmıGülKalpGurmeLezzet.jpg,akvar7KırmıGülKalpGurmeLezzetDetails1.jpg", UserId = 2});
            modelBuilder.Entity<Product>().HasData(new Product() { Id = 12, ProductName = "Kişiye Özel Fincan, Türk Kahvesi, Dekoratif Cam Mum, Tütsü Seti", Price = 399, IsActive = true, Stock = 872,Image= "hediyeSeti1.jpg,hediyeSeti1Details1.jpg", UserId = 3});
            modelBuilder.Entity<Product>().HasData(new Product() { Id = 13, ProductName = "Kişiye Özel Siyah Defter & Siyah Mat Roller Kalem & Siyah Yılbaşı Baskılı Kupa Yeni Yıl Hediye Seti", Price = 418, IsActive = true, Stock = 398,Image= "hediyeSeti2.jpg,hediyeSeti1Details2.jpg", UserId = 3});
            modelBuilder.Entity<Product>().HasData(new Product() { Id = 14, ProductName = "Desenli Beton Saksıda Ponsetya ve Kokina Çiçekleri", Price = 649, IsActive = true, Stock = 540,Image= "desenliBetonPonsetya.jpg,desenliBetonPonsetyaDetails1.jpg", UserId = 2});
            modelBuilder.Entity<Product>().HasData(new Product() { Id = 15, ProductName = "Gül Şekilli Kırmızı ve Vanilya Aromalı Kekler", Price = 399, IsActive = true, Stock = 1055,Image= "gülŞekilKırmıVanilAromaKek.jpg,gülŞekilKırmıVanilAromaKekDetails1.jpg", UserId = 2});
            modelBuilder.Entity<Product>().HasData(new Product() { Id = 16, ProductName = "Eşeklik Ettim Özür Dilerim Baskılı Tişörtlü Peluş Eşek 22cm - Özür Hediyesi Oyuncak Peluş", Price = 219, IsActive = true, Stock = 680,Image= "vegaHediyelikEssek.jpg,vegaHediyelikEssekDetails1.jpg", UserId = 3});
            modelBuilder.Entity<Product>().HasData(new Product() { Id = 17, ProductName = "Kişiye Özel Dokunmatik Siyah USB Çakmak & Roller Kalem & Gold Kareli Defter & Siyah Kupa Premium Hediye Seti", Price = 619, IsActive = true, Stock = 805,Image= "vegaHediyelikHediyeSeti1.jpg,vegaHediyelikHediyeSeti1Details1.jpg", UserId = 3});
            modelBuilder.Entity<Product>().HasData(new Product() { Id = 18, ProductName = "Pilot Hediyesi İsimli, Hostes Hediyesi, 3 Boyutlu Yolcu Uçağı, Hava Yolları Çalışanlarına 3D Uçak", Price = 649, IsActive = true, Stock = 405,Image= "sevgiLambasıÜrün1.jpg,sevgiLambasıÜrün1Details1.jpg", UserId = 8});
            modelBuilder.Entity<Product>().HasData(new Product() { Id = 19, ProductName = "Yeni Yıl Hediyesi, Yılbaşı Hediyesi, İsimli Mutlu Yıllar Hediyesi, Uçan Geyikler Led Lamba", Price = 649, IsActive = true, Stock = 610,Image= "sevgiLambasıÜrün2.jpg,sevgiLambasıÜrün2Details2.jpg", UserId = 8});


            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 1, ProductId = 1 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 1, ProductId = 2 });    
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 1, ProductId = 3 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 1, ProductId = 4 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 2, ProductId = 5 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 7, ProductId = 3 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 5, ProductId = 3 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 4, ProductId = 3 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 7, ProductId = 4 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 8, ProductId = 5 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 3, ProductId = 7 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 6, ProductId = 7 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 1, ProductId = 7 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 1, ProductId = 8 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 6, ProductId = 8 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 2, ProductId = 9 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 3, ProductId = 9 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 4, ProductId = 9 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 8, ProductId = 9 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 8, ProductId = 10 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 2, ProductId = 10 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 4, ProductId = 10 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 1, ProductId = 11 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 2, ProductId = 11 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 7, ProductId = 11 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 8, ProductId = 11 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 4, ProductId = 12 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 9, ProductId = 12 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 5, ProductId = 12 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 3, ProductId = 13 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 4, ProductId = 13 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 9, ProductId = 13 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 5, ProductId = 13 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 1, ProductId = 14 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 4, ProductId = 14 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 6, ProductId = 14 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 7, ProductId = 14 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 2, ProductId = 15 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 4, ProductId = 15 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 8, ProductId = 15 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 5, ProductId = 15 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 5, ProductId = 16 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 4, ProductId = 16 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 9, ProductId = 16 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 9, ProductId = 17 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 5, ProductId = 17 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 4, ProductId = 17 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 4, ProductId = 18 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 5, ProductId = 18 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 9, ProductId = 18 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 9, ProductId = 19 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 5, ProductId = 19 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 4, ProductId = 19 });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryId = 3, ProductId = 19 });


            modelBuilder.Entity<Cart>().HasData(new Cart() { UserId = 5, ProductId = 1,ProductCount = 2});
            modelBuilder.Entity<Cart>().HasData(new Cart() { UserId = 5, ProductId = 2, ProductCount = 1});
            modelBuilder.Entity<Cart>().HasData(new Cart() { UserId = 5, ProductId = 3 , ProductCount = 3});
            modelBuilder.Entity<Cart>().HasData(new Cart() { UserId = 9, ProductId = 1 , ProductCount = 1});
            modelBuilder.Entity<Cart>().HasData(new Cart() { UserId = 9, ProductId = 3 , ProductCount = 1});


        }
        public DbSet<Product> Products { get; set;}
        public DbSet<User> Users { get; set;}
        public DbSet<Category> Categories { get; set;}
        
        public DbSet<ProductCategory> ProductCategory {  get; set;}

        public DbSet<UserRole> UserRole { get; set;}
        public DbSet<Role> Roles { get; set;}

        public DbSet<Dealer> Dealers { get; set;}

        public DbSet<DealerProduct> DealerProducts { get; set;}

        public DbSet<Cart> Carts { get; set;}

        public DbSet<CartProduct> CartProducts { get; set;}

        public DbSet<LogProduct> LogProducts { get; set;}

        public DbSet<LogUser> LogUsers { get; set;}


    }
}
