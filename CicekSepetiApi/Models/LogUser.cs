namespace CicekSepetiApi.Models
{
    public class LogUser
    {
        public int Id { get; set; }

        public DateTime LogDate { get; set; }

        public string? HostName { get; set; }

        public string? ProgramName { get; set; }

        public string? UserName { get; set; }

        public string? ActionType { get; set; }

        public int UserId { get; set; }

        public string FirstName { get; set; } = default!;

        public string LastName { get; set; } = default!;

        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;


    }
}
