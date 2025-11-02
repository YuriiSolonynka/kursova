using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTOs
{
    public class CreateHallRequestDto
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [Range(1, 500)]
        public int Capacity { get; set; }
    }
}