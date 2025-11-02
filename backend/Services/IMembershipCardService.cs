using backend.Models;
using backend.Models.DTOs;

namespace backend.Services
{
    public interface IMembershipCardService
    {
        Task<MembershipCard> GetMyCardAsync(int clientId);
        Task<MembershipCard> UpdateCardByAdminAsync(int clientId, AdminUpdateCardRequestDto request);
    }
}