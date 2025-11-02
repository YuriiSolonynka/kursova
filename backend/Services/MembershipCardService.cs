using backend.Models;
using backend.Models.DTOs;
using backend.Repositories;

namespace backend.Services
{
    public class MembershipCardService : IMembershipCardService
    {
        private readonly IMembershipCardRepository _cardRepository;
        private readonly IUserRepository _userRepository;

        public MembershipCardService(IMembershipCardRepository cardRepository, IUserRepository userRepository)
        {
            _cardRepository = cardRepository;
            _userRepository = userRepository;
        }

        public async Task<MembershipCard> GetMyCardAsync(int clientId)
        {
            var card = await _cardRepository.GetByClientIdAsync(clientId);
            if (card == null)
            {
                var newCard = new MembershipCard("Standard");
                newCard.ClientId = clientId;
                
                await _cardRepository.UpdateAsync(newCard); 
                return newCard;
            }
            return card;
        }

        public async Task<MembershipCard> UpdateCardByAdminAsync(int clientId, AdminUpdateCardRequestDto request)
        {
            var user = await _userRepository.GetByIdAsync(clientId);
            if (user == null || !(user is Client))
            {
                throw new KeyNotFoundException("Клієнта з таким ID не знайдено.");
            }

            var card = await GetMyCardAsync(clientId);

            if (!string.IsNullOrWhiteSpace(request.NewCardType))
            {
                card.UpgradeCard(request.NewCardType);
            }

            if (request.PointsToAddOrSpend.HasValue)
            {
                if (request.PointsToAddOrSpend.Value > 0)
                {
                    card.AddPoints(request.PointsToAddOrSpend.Value);
                }
                else
                {
                    card.SpendPoints(Math.Abs(request.PointsToAddOrSpend.Value));
                }
            }

            if (request.SetStatusActive.HasValue)
            {
                if (request.SetStatusActive.Value)
                {
                    card.Activate();
                }
                else
                {
                    card.Freeze();
                }
            }

            await _cardRepository.UpdateAsync(card);
            return card;
        }
    }
}