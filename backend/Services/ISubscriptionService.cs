using backend.Models;
using backend.Models.DTOs;

namespace backend.Services
{
    public interface ISubscriptionService
    {
        Task<IEnumerable<Subscription>> GetMySubscriptionsAsync(int clientId);
        Task<Subscription> CreateSubscriptionAsync(CreateSubscriptionRequestDto request);
        Task DeleteSubscriptionAsync(int subscriptionId);
    }
}