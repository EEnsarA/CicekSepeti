using System.ComponentModel.DataAnnotations.Schema;

namespace CicekSepetiApi.Models
{
    public class UserRole
    {
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }

        [ForeignKey(nameof(Role))]
        public int RoleId { get; set; }


        // Navigation Properties
        public Role? Role { get; set; }

        public User? User { get; set; }
    }
}
