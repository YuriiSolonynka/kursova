using backend.Models;
using backend.Models.DTOs;
using backend.Repositories;


namespace backend.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly ISectionRepository _sectionRepository;
        private readonly IHallRepository _hallRepository;
        private readonly IMembershipCardRepository _cardRepository;
        private readonly IEmailService _emailService;
        private readonly IUserRepository _userRepository;

        public BookingService(
            IBookingRepository bookingRepository, 
            ISectionRepository sectionRepository, 
            IHallRepository hallRepository, 
            IMembershipCardRepository cardRepository,
            IEmailService emailService,
            IUserRepository userRepository)
        {
            _bookingRepository = bookingRepository;
            _sectionRepository = sectionRepository;
            _hallRepository = hallRepository;
            _cardRepository = cardRepository;
            _emailService = emailService;
            _userRepository = userRepository;
        }

        public async Task<Booking> CreateBookingAsync(CreateBookingRequestDto request, int clientId)
        {
            if (!request.SectionId.HasValue && !request.HallId.HasValue)
                throw new ArgumentException("Потрібно вказати SectionId або HallId.");
            
            bool isOverlapping = await _bookingRepository.HasOverlappingBookingAsync(
                request.SectionId, request.HallId, request.StartTime, request.EndTime);
            if (isOverlapping)
                throw new InvalidOperationException("Обраний час вже зайнятий.");
            
            var card = await _cardRepository.GetByClientIdAsync(clientId);
            decimal totalPrice = 0;
            int pointsToAward = 0;

            if (request.SectionId.HasValue)
            {
                var section = await _sectionRepository.GetByIdAsync(request.SectionId.Value);
                if (section == null) throw new KeyNotFoundException("Секцію не знайдено.");
                totalPrice = section.Price;
                pointsToAward = 10; 
            }
            else if (request.HallId.HasValue)
            {
                var hall = await _hallRepository.GetByIdAsync(request.HallId.Value);
                if (hall == null) throw new KeyNotFoundException("Зал не знайдено.");

                if (card != null && card.CardType == "Premium" && hall.Name.Contains("Басейн"))
                {
                    totalPrice = 0; 
                    pointsToAward = 0;
                }
                else
                {
                    totalPrice = hall.Price;
                    pointsToAward = 20;
                }
            }

            var newBooking = new Booking
            {
                ClientId = clientId,
                SectionId = request.SectionId,
                HallId = request.HallId,
                StartTime = request.StartTime,
                EndTime = request.EndTime,
                TotalPrice = totalPrice,
                Status = "Confirmed",
                BonusPointsAwarded = pointsToAward
            };

            var createdBooking = await _bookingRepository.CreateAsync(newBooking);

            if (card != null && pointsToAward > 0)
            {
                card.AddPoints(pointsToAward);
                await _cardRepository.UpdateAsync(card);

                try
                {
                    var client = await _userRepository.GetByIdAsync(clientId);
                    if (client != null)
                    {
                        string subject = "Вам нараховано бонуси!";
                        string body = $"<h1>Вітаємо, {client.Name}!</h1>" +
                                      $"<p>За ваше бронювання вам нараховано **{pointsToAward}** бонусних балів.</p>" +
                                      $"<p>Ваш поточний баланс: **{card.BonusPoints}** балів.</p>";
                        await _emailService.SendEmailAsync(client.Email, subject, body);
                    }
                }
                catch (Exception)
                {
                }
            }

            return createdBooking;
        }

        public async Task<IEnumerable<Booking>> GetMyBookingsAsync(int clientId)
        {
            return await _bookingRepository.GetBookingsByClientIdAsync(clientId);
        }

        public async Task CancelBookingAsync(int bookingId, int clientId)
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId);
            if (booking == null)
                throw new KeyNotFoundException("Бронювання не знайдено.");
            
            if (booking.ClientId != clientId)
                throw new UnauthorizedAccessException("Ви не можете скасувати чуже бронювання.");

            if (booking.BonusPointsAwarded > 0)
            {
                var card = await _cardRepository.GetByClientIdAsync(clientId);
                if (card != null)
                {
                    card.SpendPoints(booking.BonusPointsAwarded);
                    await _cardRepository.UpdateAsync(card);
                    
                    try
                    {
                        var client = await _userRepository.GetByIdAsync(clientId);
                        if (client != null)
                        {
                            string subject = "Списання бонусів";
                            string body = $"<h1>{client.Name},</h1>" +
                                          $"<p>У зв'язку зі скасуванням бронювання, з вашого рахунку було списано **{booking.BonusPointsAwarded}** бонусних балів.</p>" +
                                          $"<p>Ваш поточний баланс: **{card.BonusPoints}** балів.</p>";
                            await _emailService.SendEmailAsync(client.Email, subject, body);
                        }
                    }
                    catch (Exception)
                    {
                    }
                }
            }

            await _bookingRepository.DeleteAsync(booking);
        }
    }
}