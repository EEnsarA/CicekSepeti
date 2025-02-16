using CicekSepetiApi.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CicekSepetiApi.Dtos
{
    public class UserDto
    {
        [Required]
        public string FirstName { get; set; } = default!;
        [Required]
        public string LastName { get; set; } = default!;
        [Required]
        [EmailAddress]
        public string Email { get; set; } = default!;
        [Required]
        [DataType(DataType.Password)]
        [MinLength(5,ErrorMessage ="Password must be greater then 5 char")]
        public string Password { get; set; } = default!;
        [Required]
        [DataType(DataType.Password)]
        [Compare(nameof(Password),ErrorMessage = "Parola eşleşmiyor")]
        public string ConfirmPassword { get; set; } = null!;

    }
}
