namespace CicekSepetiApi.Dtos
{
    public class RegisteredUserDto
    {
        public string FirstName { get; set; } = default!;

        public string LastName { get; set; } = default!;  
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;
    }
}
