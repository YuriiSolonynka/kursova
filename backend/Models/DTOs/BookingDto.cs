namespace backend.Models.DTOs
{
    public class BookingDto
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? SectionTitle { get; set; }
        public string? HallName { get; set; }
    }
}