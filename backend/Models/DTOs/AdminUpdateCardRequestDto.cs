namespace backend.Models.DTOs
{
    public class AdminUpdateCardRequestDto
    {
        public string? NewCardType { get; set; } 

        public int? PointsToAddOrSpend { get; set; }

        public bool? SetStatusActive { get; set; }
    }
}