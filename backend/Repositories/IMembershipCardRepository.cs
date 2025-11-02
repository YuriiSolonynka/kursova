using backend.Models;

namespace backend.Repositories
{
    public interface IMembershipCardRepository
    {
        Task<MembershipCard?> GetByClientIdAsync(int clientId);
        Task UpdateAsync(MembershipCard card);
    }
}