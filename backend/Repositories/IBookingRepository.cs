using backend.Models;

namespace backend.Repositories
{
    public interface IBookingRepository
    {
        Task<Booking> CreateAsync(Booking booking);
        Task<IEnumerable<Booking>> GetBookingsByClientIdAsync(int clientId);
        Task<bool> HasOverlappingBookingAsync(int? sectionId, int? hallId, DateTime startTime, DateTime endTime);
        Task<Booking?> GetByIdAsync(int bookingId);
        Task DeleteAsync(Booking booking);
    }
}