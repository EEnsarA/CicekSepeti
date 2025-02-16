using CicekSepetiApi.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CicekSepetiApi.Models;
using Microsoft.Data.SqlClient;
using CicekSepetiApi.Dtos;
using AutoMapper;
using System.Collections.Immutable;
using Microsoft.AspNetCore.Http.HttpResults;

namespace CicekSepetiApi.Controllers
{
    // http://localhost:5120/api/products
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase  // PRODUCTS CONTROLLER SINIFI : INHERIT CONTROLLER BASE
    {
        private readonly ApplicationContext _context;

        private readonly IMapper _mapper;

        public ProductsController(ApplicationContext context, IMapper mapper) // constructor
        {
            _context = context;
            _mapper = mapper;

        }


        // http://localhost:5120/api/products => GET
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {


            var products = await _context.Products.Where(i => i.IsActive).Select(p => _mapper.Map<ProductDto>(p)).ToListAsync();
             

            return Ok(products);
        }

  


        // http://localhost:5120/api/products/id => GET
        [HttpGet("{id}")]  //"api/[controller]/{id}"
        public async Task<IActionResult> GetProduct(int? id)
        {
            if (id == null)
                return NotFound();
           

            var product = await _context.Products.FindAsync(id);


            if (product == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ProductDto>(product)); // StatusCode(200,"OK")
        }
     


        //  http://localhost:5120/api/products/bycategory/id => GET
        [HttpGet("bycategory/{id}")]
        public async Task<IActionResult> GetProductsByCategoryId(int? id)
        {
            try
            {
                if (id == null)
                    return NotFound();

                var prdIds = await _context.ProductCategory.Where(p => p.CategoryId == id).Select(p => p.ProductId).ToListAsync();

                if(prdIds == null)
                    return NotFound();

                var products = await _context.Products.Where(p =>  prdIds.Contains(p.Id)).Select(p => _mapper.Map<ProductDto>(p)).ToListAsync();

                if (products == null)
                    return NotFound();

                return Ok(products);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        

        //  http://localhost:5120/api/products/bydealer/id => GET
        [HttpGet("bydealer/{id}")]
        public async Task<IActionResult> GetProductsByDealerId(int? id)
        {
            try
            {
                if (id == null)
                    return NotFound();
          
                var dealerId =new SqlParameter("@dealerId", id);
                var dealerProducts = await _context.DealerProducts.FromSql($"EXECUTE dbo.sp_getDealerProducts @DealerId={dealerId}").ToListAsync();
                if (dealerProducts == null)
                    return BadRequest();
                return Ok(dealerProducts);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }





        // http://localhost:5120/api/products => POST
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody]ProductDto prdDto, [FromQuery] int categoryId, [FromQuery] int userId)
        {

     

            if(prdDto == null)
                return BadRequest();

            if(!ModelState.IsValid)
                return BadRequest();

            var category = _context.Categories.Where(c => c.Id == categoryId).FirstOrDefault();
            var user = _context.Users.Where(u => u.Id == userId).FirstOrDefault();

            var product = new Product()
            {
                ProductName = prdDto.ProductName,
                Price = prdDto.Price,
                Stock = prdDto.Stock,
                UserId = userId,
                User = user,
                IsActive = prdDto.IsActive,
                Image=prdDto.Image,
            };

         
            var productCategory = new ProductCategory()
            {
                Category = category,
                Product = product
            };

            try
            {
               
               
                _context.Add(product);
                _context.Add(productCategory);
                
                await _context.SaveChangesAsync();  



                return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, _mapper.Map<ProductDto>(product));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // http://localhost:5120/api/products/id => PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct([FromBody] ProductDto prdDto, int id , [FromQuery] int userId, [FromQuery] int[] categoryId)
        {

            try
            {


                if (prdDto == null)     
                return BadRequest(ModelState);

                if (id != prdDto.Id)   
                    return NotFound();
           
                if(!ModelState.IsValid)        
                    return BadRequest();
            

                var existingProduct = await _context.Products.FindAsync(id);
                if(existingProduct == null)
                    return NotFound();

                var user = await _context.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
                if (user == null)
                    return NotFound();

                var existingProductCategory = await _context.ProductCategory.Where(p => p.ProductId == id).ToListAsync();
                if (existingProductCategory == null)
                    return NotFound();

                var categories = await _context.Categories.Where(p => categoryId.Contains(p.Id)).ToListAsync();

                existingProduct.ProductName = prdDto.ProductName;
                existingProduct.Price = prdDto.Price;
                existingProduct.Stock = prdDto.Stock;
                existingProduct.IsActive = prdDto.IsActive;
                existingProduct.Image = prdDto.Image;

                existingProduct.UserId = userId;
                existingProduct.User = user;
                _context.Update(existingProduct);


                foreach (var productCat in existingProductCategory)
                {
                    _context.ProductCategory.Remove(productCat);
                     await  _context.SaveChangesAsync();
                }

                foreach (var category in categories)
                {
                    var productCategory = new ProductCategory()
                    {

                        Product = existingProduct,
                        Category = category
                    };
                    _context.Add(productCategory);
                }
              
              
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetProduct),new {id = existingProduct.Id}, _mapper.Map<ProductDto>(existingProduct));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        // http://localhost:5120/api/products/id => DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int? id)
        {

            try
            {

                var existingCarts = await _context.Carts.Where(c => c.ProductId == id).ToListAsync(); 
                if (existingCarts != null) 
                {
                    _context.Carts.RemoveRange(existingCarts);
                    await _context.SaveChangesAsync();
                }

                var existingProduct = await _context.Products.FindAsync(id);

                if(existingProduct == null) { return NotFound(); }

                _context.Products.Remove(existingProduct);

                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetProduct),new {id = existingProduct.Id},_mapper.Map<ProductDto>(existingProduct));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
