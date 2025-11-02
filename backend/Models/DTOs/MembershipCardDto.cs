namespace backend.Models.DTOs
{
    public class MembershipCardDto
    {
        public int Id { get; set; }
        public string CardType { get; set; } = string.Empty;
        public int BonusPoints { get; set; }
        public bool IsActive { get; set; }
    }
}