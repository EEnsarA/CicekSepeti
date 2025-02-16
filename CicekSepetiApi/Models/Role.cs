namespace CicekSepetiApi.Models
{
    public class Role
    {

        public int Id {  get; set; }

        public string RoleName { get; set; } = default!;

        public ICollection<UserRole> ?Users { get; set; }
    }
}
