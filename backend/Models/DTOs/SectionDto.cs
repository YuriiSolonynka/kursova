
namespace backend.Models.DTOs
{
    public class SectionDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string SportType { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string TrainerName { get; set; } = "N/A";
    }
}