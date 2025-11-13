using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTOs
{
    public class UpdateProfileRequestDto
    {
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Phone { get; set; } = string.Empty;
    }
}