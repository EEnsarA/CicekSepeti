using System.ComponentModel.DataAnnotations.Schema;

namespace CicekSepetiApi.Models
{
    public class LogProduct
    {

        public int Id { get; set; }

        public DateTime LogDate { get; set; }

        public string?  HostName { get; set; } 

        public string? ProgramName { get; set; }

        public string? UserName { get; set; }

        public string? ActionType { get; set; }

        public int ProductId { get; set; }
        public int UserId { get; set; }

        public string ProductName { get; set; } = null!;
        public float Price { get; set; }

        public bool IsActive { get; set; } 

        public int Stock { get; set; }

        public string Image { get; set; } = null!;

    }
}
