using CicekSepetiApi.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CicekSepetiApi.Dtos;
using CicekSepetiApi.Models;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Data.SqlClient;
using System.Collections;
using System.Linq.Expressions;

namespace CicekSepetiApi.Controllers
{
    // http://localhost:5120/api/users
    
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationContext _context;

        private readonly IMapper _mapper;

        private readonly IConfiguration _config;

        public UsersController(ApplicationContext context, IMapper mapper,IConfiguration config)
        {
            _context = context;
            _mapper = mapper;
            _config = config;
        }
        
        // http://localhost:5120/api/users => GET
        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            // var users = await _context.Users.ToListAsync();
            // var users = await _context.Users.FromSql($"SELECT * FROM Users").ToListAsync();
            var users = await _context.Users.Select(u => _mapper.Map<UserListDto>(u)).ToListAsync();
            return Ok(users);
        }

        [Authorize(Roles = "admin")]
        [HttpGet("dealers")]
        public async Task<IActionResult> GetDealers()
        {
            var dealers = await _context.Dealers.FromSqlRaw($"SELECT * FROM dbo.vm_Dealers").ToListAsync();
            if (dealers == null)
                return BadRequest();
            return Ok(dealers);
        }   

        // http://localhost:5120/api/users/id => GET
        [Authorize(Roles = "admin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int? id)
        {
            var user = await _context.Users.Where(u => u.Id == id).Select(u => _mapper.Map<UserDto>(u)).ToListAsync();
            return Ok(user);
        }

        // http://localhost:5120/api/users/register => POST
        [HttpPost("register")]
        public async Task<IActionResult> CreateUser([FromBody] UserDto userDto)
        {
            if (userDto == null)
            {
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = new User()
            {
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                Email = userDto.Email,
                Password = userDto.Password,
                CreatedTime = DateTime.Now,
            };

            try
            {
                _context.Add(user);

                var users = await _context.Users.Where(u => u.Email == userDto.Email).FirstOrDefaultAsync();
                if (users != null) 
                { 
                    return BadRequest(new { message = "Bu Email zaten kayıtlı." }); 
                }
                var role = await _context.Roles.Where(r => r.Id == 2).FirstOrDefaultAsync(); // user rolü yapıldı


                var userRole = new UserRole()
                {
                    Role = role,
                    User = user
                };
                
                _context.Add(userRole);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, _mapper.Map<RegisteredUserDto>(user));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }



        // http://localhost:5120/api/users/login => POST JWT Token oluşturma
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto login)  
        {
            if (login == null)
            {
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var user = await _context.Users.Where(u => u.Email == login.Email && u.Password == login.Password).FirstOrDefaultAsync();

                if (user == null)
                {
                    return BadRequest(new { message = " E-posta adresi veya şifre hatalı. Lütfen bilgilerinizi kontrol edip tekrar deneyin. " });
                }
                var userIdParameter = new SqlParameter("@userId", user.Id);

                var roleIds = await _context.UserRole.Where(u => u.UserId == user.Id).Select(u => u.RoleId).ToListAsync();
                var roles = await _context.Roles.Where(u => roleIds.Contains(u.Id)).Select(r => r.RoleName).ToListAsync();

                //var roles = await _context.Roles.FromSql($"SELECT RoleName FROM Roles WHERE Id IN ({roleIds})").ToListAsync();
                string[] roleInfo = new string[roles.Count];
        
                return Ok(new { token = GenerateJWT(user, roles[0]) });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        // http://localhost:5120/api/users/id => DELETE
        //[Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var existingCarts = await _context.Carts.Where(c => c.UserId == id).ToListAsync();
                if (existingCarts != null)
                {
                    _context.Carts.RemoveRange(existingCarts);
                    await _context.SaveChangesAsync();
                }
                var existingUser = await _context.Users.FindAsync(id);
                if(existingUser == null) { return NotFound(); }
                _context.Users.Remove(existingUser);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetUserById), new { id },_mapper.Map<LoginDto>(existingUser));

            }

            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        private object GenerateJWT(User user,string roleInfo)
        {


            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config.GetSection("AppSettings:Secret").Value ?? "");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[] {
                        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new Claim(ClaimTypes.Name, user.FullName ?? ""),
                        new Claim(ClaimTypes.Role,roleInfo),               
                    }
                ),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = "ÇiçekSepeti.com"
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
