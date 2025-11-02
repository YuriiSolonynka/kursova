using System.ComponentModel.DataAnnotations;

namespace backend.Models.DTOs
{
    public class CreateBookingRequestDto
    {
        public int? SectionId { get; set; }
        public int? HallId { get; set; }

        [Required]
        public DateTime StartTime { get; set; }
        
        [Required]
        public DateTime EndTime { get; set; }
    }
}