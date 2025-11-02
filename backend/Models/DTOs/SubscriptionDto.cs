namespace backend.Models.DTOs
{
    public class SubscriptionDto
    {
        public int Id { get; set; }
        public string Type { get; set; } = string.Empty;
        public DateTime ValidUntil { get; set; }
        public int ClientId { get; set; }
    }
}