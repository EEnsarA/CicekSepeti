using AutoMapper;
using CicekSepetiApi.Context;
using CicekSepetiApi.Dtos;
using CicekSepetiApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;

namespace CicekSepetiApi.Controllers
{
    // http://localhost:5120/api/carts
    [ApiController]
    [Route("api/[controller]")]
    public class CartsController : ControllerBase
    {
        private readonly ApplicationContext _context;

        private readonly IMapper _mapper;

       public CartsController(ApplicationContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // http://localhost:5120/api/carts/id => GET
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCartByUserId(int? id)
        {
            if (id == null)
                return BadRequest();
            try
            {
                var userId = new SqlParameter("@userId", id);
                var userCart = await _context.Carts.FromSql($"EXECUTE dbo.sp_getCart @userId={userId}").ToListAsync();
                
                if (userCart == null)
                    return NotFound();

 
                return Ok(userCart);
                
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);  
            }
        }
        // http://localhost:5120/api/carts => POST
        [HttpPost]
        public async Task<IActionResult> AddProductToCart([FromBody] CartDto cartDto)
        {
            try
            {
                
                var userId = new SqlParameter("@userId", cartDto.UserId);
                var productId = new SqlParameter("@prdId", cartDto.ProductId);
                var addedCart = await _context.Carts.FromSql($"EXECUTE dbo.sp_AddCart @userId={userId},@prdId={productId}").ToListAsync();
                if (addedCart == null)
                    return BadRequest();
                return Ok(_mapper.Map<CartDto>(addedCart[0]));

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        // http://localhost:5120/api/carts => DELETE
        [HttpDelete]
        public async Task<IActionResult> RemoveProductToCart([FromBody] CartDto cartDto)
        {
            try
            {
                var userId = new SqlParameter("@userId", cartDto.UserId);
                var productId = new SqlParameter("@prdId", cartDto.ProductId);
                var removedCart = await _context.Carts.FromSql($"EXECUTE dbo.sp_RemoveCart @userId={userId},@prdId={productId}").ToListAsync();
                if(removedCart == null)
                    return BadRequest();

                return Ok(_mapper.Map<CartDto>(removedCart[0]));

            }
            catch(Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        // http://localhost:5120/api/carts/products/id => GET
        [HttpGet("products/{id}")]
        public async Task<IActionResult> GetCartProducts(int id)
        {
            try
            {
                var customerId = new SqlParameter("@customerId", id);
                var products = await _context.CartProducts.FromSql($"EXECUTE dbo.sp_getCartProducts @customerId={customerId}").ToListAsync();
                if(products == null) return BadRequest();

                return Ok(products);

            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       

    }
}
