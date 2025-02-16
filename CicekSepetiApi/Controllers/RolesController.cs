using AutoMapper;
using CicekSepetiApi.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CicekSepetiApi.Dtos;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace CicekSepetiApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    // http://localhost:5120/api/roles
    public class RolesController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IMapper _mapper;

        public RolesController(ApplicationContext context,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // http://localhost:5120/api/roles => GET
        [HttpGet]
        public async Task<IActionResult> GetRoles()
        {
            try
            {
                var roles = await _context.Roles.FromSql($"SELECT * FROM Roles").Select(r => _mapper.Map<RoleDto>(r)).ToListAsync();
                return Ok(roles);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // http://localhost:5120/api/roles/user => GET
        [HttpGet("user")]
        public async Task<IActionResult> GetUserRoles()
        {
            try
            {
                var userRole = await _context.UserRole.Select(u => _mapper.Map<UserRoleDto>(u)).ToListAsync();
                if(userRole == null) { return BadRequest(); }
               
                return Ok(userRole);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




        // http://localhost:5120/api/roles/ => POST
        [HttpPost]
        public async Task<IActionResult> CreateRole(RoleDto roleDto)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("roleName",roleDto.RoleName),
                    new SqlParameter("id",roleDto.Id)
                };
                var sqlQuery = $"INSERT INTO Roles (Id,RoleName)  OUTPUT INSERTED.* VALUES(@id,@roleName)";
                var createdRole = await _context.Roles.FromSqlRaw(sqlQuery, parameters).ToListAsync();
                if (createdRole == null)
                    return BadRequest();
                return Ok(_mapper.Map<RoleDto>(createdRole[0]));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        // http://localhost:5120/api/roles/id => PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRole(int id,RoleDto roleDto)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("roleName", roleDto.RoleName),
                    new SqlParameter("id", id)
                };
                var sqlQuery = $"UPDATE Roles SET RoleName=@roleName OUTPUT INSERTED.* WHERE Id=@id";
                var updatedRole = await _context.Roles.FromSqlRaw(sqlQuery, parameters).ToListAsync();
                if (updatedRole == null)
                    return NotFound();
                return Ok(_mapper.Map<RoleDto>(updatedRole[0]));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // http://localhost:5120/api/roles/id => DELETED
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            try
            {
                var parameters = new SqlParameter[]
                {
                    new SqlParameter("id",id)
                };
                var sqlQuery = $"DELETE Roles OUTPUT Deleted.* WHERE Id=@id";
                var deletedRole = await _context.Roles.FromSqlRaw(sqlQuery,parameters).ToListAsync();
                if (deletedRole == null)
                    return NotFound();
                return Ok(_mapper.Map<RoleDto>(deletedRole[0]));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
