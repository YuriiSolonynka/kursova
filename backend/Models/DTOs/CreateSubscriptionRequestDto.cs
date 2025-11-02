using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTOs
{
    public class CreateSubscriptionRequestDto
    {
        [Required]
        public int ClientId { get; set; }

        [Required]
        public string Type { get; set; } = "Monthly";

        [Required]
        [Range(1, 365)]
        public int DurationInDays { get; set; } = 30;
    }
}