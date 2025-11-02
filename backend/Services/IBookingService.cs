using backend.Models;
using backend.Models.DTOs;

namespace backend.Services
{
    public interface IBookingService
    {
        Task<Booking> CreateBookingAsync(CreateBookingRequestDto request, int clientId);
        Task<IEnumerable<Booking>> GetMyBookingsAsync(int clientId);
        Task CancelBookingAsync(int bookingId, int clientId);
    }
}