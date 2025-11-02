using backend.Models;
using backend.Models.DTOs;
using backend.Repositories;

namespace backend.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly ISectionRepository _sectionRepository;

        public BookingService(IBookingRepository bookingRepository, ISectionRepository sectionRepository)
        {
            _bookingRepository = bookingRepository;
            _sectionRepository = sectionRepository;
        }

        public async Task<Booking> CreateBookingAsync(CreateBookingRequestDto request, int clientId)
        {
            if (!request.SectionId.HasValue && !request.HallId.HasValue)
            {
                throw new ArgumentException("Потрібно вказати SectionId або HallId.");
            }
            if (request.StartTime >= request.EndTime)
            {
                throw new ArgumentException("Час початку має бути раніше часу завершення.");
            }

            bool isOverlapping = await _bookingRepository.HasOverlappingBookingAsync(
                request.SectionId, request.HallId, request.StartTime, request.EndTime);

            if (isOverlapping)
            {
                throw new InvalidOperationException("Обраний час вже зайнятий.");
            }

            if (request.SectionId.HasValue)
            {
                var section = await _sectionRepository.GetByIdAsync(request.SectionId.Value);
                if (section == null)
                {
                    throw new KeyNotFoundException("Секцію не знайдено.");
                }
            }

            var newBooking = new Booking
            {
                ClientId = clientId,
                SectionId = request.SectionId,
                HallId = request.HallId,
                StartTime = request.StartTime,
                EndTime = request.EndTime
            };

            return await _bookingRepository.CreateAsync(newBooking);
        }
        public async Task<IEnumerable<Booking>> GetMyBookingsAsync(int clientId)
        {
            return await _bookingRepository.GetBookingsByClientIdAsync(clientId);
        }

        public async Task CancelBookingAsync(int bookingId, int clientId)
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId);

            if (booking == null)
            {
                throw new KeyNotFoundException("Бронювання не знайдено.");
            }

            if (booking.ClientId != clientId)
            {
                throw new UnauthorizedAccessException("Ви не можете скасувати чуже бронювання.");
            }

            await _bookingRepository.DeleteAsync(booking);
        }
    }
}