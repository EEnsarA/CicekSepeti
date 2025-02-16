using CicekSepetiApi.Context;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CicekSepetiApi.Dtos;
using CicekSepetiApi.Models;

namespace CicekSepetiApi.Controllers
{
    // http://localhost:5120/api/categories
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;  

        public CategoriesController(ApplicationContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;   
        }



        // http://localhost:5120/api/categories => GET
        [HttpGet]
        public async Task<IActionResult> GetCategories() 
        {
            try
            {
                var categories = await _context.Categories.Select(c => _mapper.Map<CategoryDto>(c)).ToListAsync();
                if(categories == null)
                {
                    return NotFound();
                }
                return Ok(categories);

            }
            catch(Exception ex)
            {
                return NotFound(ex.Message);
            }

        }

        // http://localhost:5120/api/categories/id => GET
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory(int? id)
        {
            try
            {
                var category = await _context.Categories.FindAsync(id);
                if(category == null) { return NotFound(); }
                return Ok(_mapper.Map<CategoryDto>(category));  
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        // http://localhost:5120/api/categories => POST
        [HttpPost]
        public async Task<IActionResult> CreateCategory(CategoryDto categoryDto)
        {
            try
            {
                if(categoryDto == null)
                    return BadRequest();
                
                if(!ModelState.IsValid)
                    return BadRequest();


                var category = new Category
                {
                    CategoryName = categoryDto.CategoryName,
                };
                
                _context.Add(category);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetCategory),new {id = category.Id},_mapper.Map<CategoryDto>(category));

            }
            catch(Exception ex)
            {
                return NotFound(ex.Message);
            }
        }


        //http://localhost:5120/api/categories/id => PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id,CategoryDto categoryDto)
        {
            try
            {
                var existingCategory = await _context.Categories.FindAsync(id);
                if(existingCategory == null) { return NotFound(); }
                existingCategory.CategoryName = categoryDto.CategoryName;
                _context.Categories.Update(existingCategory);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetCategory), new { id }, _mapper.Map<CategoryDto>(existingCategory));
            }
            catch(Exception ex)
            {
                return NotFound(ex.Message);  
            }
        }




        // http://localhost:5120/api/categories/id => DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            try
            {
                var existingCategory = await _context.Categories.FindAsync(id);
                if(existingCategory == null) { return NotFound(); }
                _context.Categories.Remove(existingCategory);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetCategory), new {id},_mapper.Map<CategoryDto>(existingCategory));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

    }
}
