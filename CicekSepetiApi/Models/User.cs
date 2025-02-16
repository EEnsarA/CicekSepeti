using Microsoft.AspNetCore.Authorization.Infrastructure;
using System.ComponentModel.DataAnnotations.Schema;

namespace CicekSepetiApi.Models
{
    public class User
    {
        
        public int Id { get; set; }
 
        public string FirstName { get; set; } = default!;

        public string LastName { get; set; } = default!;

        public string FullName => string.Join(" ", FirstName, LastName);
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;

        public DateTime CreatedTime { get; set; }


        public ICollection<Product> ?Products { get; set; }

        
        public ICollection<UserRole> ?Roles { get; set; }

        public virtual ICollection<Cart>? CartProducts { get; set; }


    }
}
