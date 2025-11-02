using backend.Models;
using backend.Models.DTOs;
using backend.Repositories;

namespace backend.Services
{
    public class SubscriptionService : ISubscriptionService
    {
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IUserRepository _userRepository;

        public SubscriptionService(ISubscriptionRepository subscriptionRepository, IUserRepository userRepository)
        {
            _subscriptionRepository = subscriptionRepository;
            _userRepository = userRepository;
        }

        public async Task<Subscription> CreateSubscriptionAsync(CreateSubscriptionRequestDto request)
        {
            var user = await _userRepository.GetByIdAsync(request.ClientId);
            if (user == null || !(user is Client))
            {
                throw new KeyNotFoundException("Клієнта з таким ID не знайдено.");
            }

            var newSubscription = new Subscription
            {
                ClientId = request.ClientId,
                Type = request.Type,
                ValidUntil = DateTime.UtcNow.AddDays(request.DurationInDays)
            };

            return await _subscriptionRepository.CreateAsync(newSubscription);
        }

        public async Task DeleteSubscriptionAsync(int subscriptionId)
        {
            var subscription = await _subscriptionRepository.GetByIdAsync(subscriptionId);
            if (subscription == null)
            {
                throw new KeyNotFoundException("Абонемент не знайдено.");
            }
            await _subscriptionRepository.DeleteAsync(subscription);
        }

        public async Task<IEnumerable<Subscription>> GetMySubscriptionsAsync(int clientId)
        {
            return await _subscriptionRepository.GetByClientIdAsync(clientId);
        }
    }
}