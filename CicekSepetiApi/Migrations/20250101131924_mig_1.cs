using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CicekSepetiApi.Migrations
{
    /// <inheritdoc />
    public partial class mig_1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CartProducts",
                columns: table => new
                {
                    CustomerId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    ProductName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProductCount = table.Column<int>(type: "int", nullable: false),
                    DealerId = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<float>(type: "real", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    Stock = table.Column<int>(type: "int", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DealerProducts",
                columns: table => new
                {
                    DealerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    ProductName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<float>(type: "real", nullable: false),
                    Stock = table.Column<int>(type: "int", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "LogProducts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LogDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    HostName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProgramName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActionType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ProductName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<float>(type: "real", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    Stock = table.Column<int>(type: "int", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LogProducts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LogUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LogDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    HostName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProgramName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActionType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LogUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ProductName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<float>(type: "real", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    Stock = table.Column<int>(type: "int", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRole",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRole", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_UserRole_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRole_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Carts",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    ProductCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carts", x => new { x.ProductId, x.UserId });
                    table.ForeignKey(
                        name: "FK_Carts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Carts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProductCategory",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductCategory", x => new { x.ProductId, x.CategoryId });
                    table.ForeignKey(
                        name: "FK_ProductCategory_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductCategory_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "CategoryName" },
                values: new object[,]
                {
                    { 1, "Çiçek" },
                    { 2, "Çikolata" },
                    { 3, "Yılbaşı" },
                    { 4, "Hediye" },
                    { 5, "Doğum Günü" },
                    { 6, "Kokina ve Ponsetya" },
                    { 7, "Orkide ve Saksı Çiçekleri" },
                    { 8, "Yenilebilir Çiçek" },
                    { 9, "Hediye Setleri" }
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "RoleName" },
                values: new object[,]
                {
                    { 1, "admin" },
                    { 2, "user" },
                    { 3, "dealer" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedTime", "Email", "FirstName", "LastName", "Password" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 1, 1, 16, 19, 23, 985, DateTimeKind.Local).AddTicks(3010), "ensar@gmail.com", "Ensar", "Atıcı", "ensar123" },
                    { 2, new DateTime(2025, 1, 1, 16, 19, 23, 985, DateTimeKind.Local).AddTicks(3044), "cicekSepeti@gmail.com", "Çiçek", "Sepeti", "çiçeksepeti123" },
                    { 3, new DateTime(2025, 1, 1, 16, 19, 23, 985, DateTimeKind.Local).AddTicks(3056), "vega@hotmail.com", "Vega", "Hediyelik", "vegahediyelik123" },
                    { 4, new DateTime(2025, 1, 1, 16, 19, 23, 985, DateTimeKind.Local).AddTicks(3079), "mehmet@gmail.com", "Mehmet", "Fatih", "mehmet123" },
                    { 5, new DateTime(2025, 1, 1, 16, 19, 23, 985, DateTimeKind.Local).AddTicks(3092), "math@hotmail.com", "Math", "Bonus", "math123" },
                    { 6, new DateTime(2025, 1, 1, 16, 19, 23, 985, DateTimeKind.Local).AddTicks(3102), "ahmet@gmail.com", "Ahmet", "Yıldız", "ahmet123" },
                    { 7, new DateTime(2025, 1, 1, 16, 19, 23, 985, DateTimeKind.Local).AddTicks(3113), "john@hotmail.com", "John", "Wick", "john123" },
                    { 8, new DateTime(2025, 1, 1, 16, 19, 23, 985, DateTimeKind.Local).AddTicks(3068), "sevgiLambasi@gmail.com", "Sevgi", "Lambası", "sevgiLambası123" },
                    { 9, new DateTime(2025, 1, 1, 16, 19, 23, 985, DateTimeKind.Local).AddTicks(3123), "zehra@hotmail.com", "Zehra", "Polat", "zehra123" },
                    { 10, new DateTime(2025, 1, 1, 16, 19, 23, 985, DateTimeKind.Local).AddTicks(3134), "efdal@hotmail.com", "Efdal", "Atıcı", "efdal123" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Image", "IsActive", "Price", "ProductName", "Stock", "UserId" },
                values: new object[,]
                {
                    { 1, "kırmızıGülÇiçekBuketi.jpg,kırmızıGülÇiçekBuketiDetail1.jpg", true, 329f, "Kırmızı Gül Çiçek Buketi", 1850, 2 },
                    { 2, "beyazPapatyaÇiçekBuketi.jpg,beyazPapatyaÇiçekBuketiDetails1.jpg", true, 299f, "Beyaz Papatya Çiçek Buketi", 1250, 2 },
                    { 3, "2dalBeyazOrkide.jpg,2dalBeyazOrkideDetails1.jpg", true, 849f, "2 Dal Beyaz Orkide Çiçeği", 960, 2 },
                    { 4, "saksıdaBeyazSpa.jpg,saksıdaBeyazSpaDetails1.jpg", true, 469f, "Saksıda Beyaz Spatifilyum", 735, 2 },
                    { 5, "ayıcıkVeÇikolataKutusu.jpg,ayıcıkVeÇikolataKutusuDetails1.jpg", true, 479f, "Mutlu Ayıcık ve Çiçekli Çikolata Kutusu", 150, 2 },
                    { 6, "akvaryumVeKırmızı7Gül.jpg,akvaryumVeKırmızı7GülDetails1.jpg", true, 569f, "Paşabahçe Akvaryum Vazoda 7 Kırmızı Gül", 368, 2 },
                    { 7, "kraftBukKağıtKokinaYılbaşıÇiçeği.jpg,kraftBukKağıtKokinaYılbaşıÇiçeğiDetails1.jpg", true, 749f, "Kraft Buket Kağıdında Kokina Yılbaşı Çiçeği", 980, 2 },
                    { 8, "siyahBuketKokinaVeTurÇarGüller.jpg,siyahBuketKokinaVeTurÇarGüllerDetails1.jpg", true, 649f, "Siyah Bukette Kokina ve Turuncu Çardak Güller", 915, 2 },
                    { 9, "mutluYılMesajKekLezzetKutu.jpg,mutluYılMesajKekLezzetKutuDetails1.jpg", true, 599f, "Mutlu Yıllar Mesajlı Keklerle Lezzet Kutusu", 785, 2 },
                    { 10, "yenilebilirGülBuk.jpg,yenilebilirGülBukDetails1.jpg", true, 349f, "Yenilebilir Gül Buketi", 635, 2 },
                    { 11, "akvar7KırmıGülKalpGurmeLezzet.jpg,akvar7KırmıGülKalpGurmeLezzetDetails1.jpg", true, 669f, "Akvaryumda 7 Kırmızı Gül ve Kalpli Gurme Lezzetler", 438, 2 },
                    { 12, "hediyeSeti1.jpg,hediyeSeti1Details1.jpg", true, 399f, "Kişiye Özel Fincan, Türk Kahvesi, Dekoratif Cam Mum, Tütsü Seti", 872, 3 },
                    { 13, "hediyeSeti2.jpg,hediyeSeti1Details2.jpg", true, 418f, "Kişiye Özel Siyah Defter & Siyah Mat Roller Kalem & Siyah Yılbaşı Baskılı Kupa Yeni Yıl Hediye Seti", 398, 3 },
                    { 14, "desenliBetonPonsetya.jpg,desenliBetonPonsetyaDetails1.jpg", true, 649f, "Desenli Beton Saksıda Ponsetya ve Kokina Çiçekleri", 540, 2 },
                    { 15, "gülŞekilKırmıVanilAromaKek.jpg,gülŞekilKırmıVanilAromaKekDetails1.jpg", true, 399f, "Gül Şekilli Kırmızı ve Vanilya Aromalı Kekler", 1055, 2 },
                    { 16, "vegaHediyelikEssek.jpg,vegaHediyelikEssekDetails1.jpg", true, 219f, "Eşeklik Ettim Özür Dilerim Baskılı Tişörtlü Peluş Eşek 22cm - Özür Hediyesi Oyuncak Peluş", 680, 3 },
                    { 17, "vegaHediyelikHediyeSeti1.jpg,vegaHediyelikHediyeSeti1Details1.jpg", true, 619f, "Kişiye Özel Dokunmatik Siyah USB Çakmak & Roller Kalem & Gold Kareli Defter & Siyah Kupa Premium Hediye Seti", 805, 3 },
                    { 18, "sevgiLambasıÜrün1.jpg,sevgiLambasıÜrün1Details1.jpg", true, 649f, "Pilot Hediyesi İsimli, Hostes Hediyesi, 3 Boyutlu Yolcu Uçağı, Hava Yolları Çalışanlarına 3D Uçak", 405, 8 },
                    { 19, "sevgiLambasıÜrün2.jpg,sevgiLambasıÜrün2Details2.jpg", true, 649f, "Yeni Yıl Hediyesi, Yılbaşı Hediyesi, İsimli Mutlu Yıllar Hediyesi, Uçan Geyikler Led Lamba", 610, 8 }
                });

            migrationBuilder.InsertData(
                table: "UserRole",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 3, 2 },
                    { 3, 3 },
                    { 2, 4 },
                    { 2, 5 },
                    { 2, 6 },
                    { 2, 7 },
                    { 3, 8 },
                    { 2, 9 },
                    { 1, 10 }
                });

            migrationBuilder.InsertData(
                table: "Carts",
                columns: new[] { "ProductId", "UserId", "ProductCount" },
                values: new object[,]
                {
                    { 1, 5, 2 },
                    { 1, 9, 1 },
                    { 2, 5, 1 },
                    { 3, 5, 3 },
                    { 3, 9, 1 }
                });

            migrationBuilder.InsertData(
                table: "ProductCategory",
                columns: new[] { "CategoryId", "ProductId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 1, 2 },
                    { 1, 3 },
                    { 4, 3 },
                    { 5, 3 },
                    { 7, 3 },
                    { 1, 4 },
                    { 7, 4 },
                    { 2, 5 },
                    { 8, 5 },
                    { 1, 7 },
                    { 3, 7 },
                    { 6, 7 },
                    { 1, 8 },
                    { 6, 8 },
                    { 2, 9 },
                    { 3, 9 },
                    { 4, 9 },
                    { 8, 9 },
                    { 2, 10 },
                    { 4, 10 },
                    { 8, 10 },
                    { 1, 11 },
                    { 2, 11 },
                    { 7, 11 },
                    { 8, 11 },
                    { 4, 12 },
                    { 5, 12 },
                    { 9, 12 },
                    { 3, 13 },
                    { 4, 13 },
                    { 5, 13 },
                    { 9, 13 },
                    { 1, 14 },
                    { 4, 14 },
                    { 6, 14 },
                    { 7, 14 },
                    { 2, 15 },
                    { 4, 15 },
                    { 5, 15 },
                    { 8, 15 },
                    { 4, 16 },
                    { 5, 16 },
                    { 9, 16 },
                    { 4, 17 },
                    { 5, 17 },
                    { 9, 17 },
                    { 4, 18 },
                    { 5, 18 },
                    { 9, 18 },
                    { 3, 19 },
                    { 4, 19 },
                    { 5, 19 },
                    { 9, 19 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Carts_UserId",
                table: "Carts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductCategory_CategoryId",
                table: "ProductCategory",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_UserId",
                table: "Products",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRole_RoleId",
                table: "UserRole",
                column: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CartProducts");

            migrationBuilder.DropTable(
                name: "Carts");

            migrationBuilder.DropTable(
                name: "DealerProducts");

            migrationBuilder.DropTable(
                name: "LogProducts");

            migrationBuilder.DropTable(
                name: "LogUsers");

            migrationBuilder.DropTable(
                name: "ProductCategory");

            migrationBuilder.DropTable(
                name: "UserRole");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
