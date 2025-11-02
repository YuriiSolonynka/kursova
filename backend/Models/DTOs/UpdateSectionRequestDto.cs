using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTOs
{
    public class UpdateSectionRequestDto
    {
        [Required]
        [StringLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string SportType { get; set; } = string.Empty;

        [Range(0, 10000)]
        public decimal Price { get; set; }

        [Required]
        public int TrainerId { get; set; }
    }
}