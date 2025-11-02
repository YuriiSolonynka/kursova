using backend.Models;

namespace backend.Repositories
{
    public interface ISubscriptionRepository
    {
        Task<Subscription> CreateAsync(Subscription subscription);
        Task<Subscription?> GetByIdAsync(int id);
        Task<IEnumerable<Subscription>> GetByClientIdAsync(int clientId);
        Task DeleteAsync(Subscription subscription);
    }
}