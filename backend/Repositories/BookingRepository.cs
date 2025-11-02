using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly AppDbContext _context;

        public BookingRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Booking> CreateAsync(Booking booking)
        {
            await _context.Bookings.AddAsync(booking);
            await _context.SaveChangesAsync();
            return booking;
        }

        public async Task<IEnumerable<Booking>> GetBookingsByClientIdAsync(int clientId)
        {
            return await _context.Bookings
                .Where(b => b.ClientId == clientId)
                .Include(b => b.Section)
                .Include(b => b.Hall)
                .ToListAsync();
        }
        public async Task<bool> HasOverlappingBookingAsync(int? sectionId, int? hallId, DateTime startTime, DateTime endTime)
        {
            var query = _context.Bookings.AsQueryable();

            if (sectionId.HasValue)
            {
                query = query.Where(b => b.SectionId == sectionId.Value);
            }
            else if (hallId.HasValue)
            {
                query = query.Where(b => b.HallId == hallId.Value);
            }
            else
            {
                return false;
            }
            return await query.AnyAsync(b => 
                startTime < b.EndTime && endTime > b.StartTime
            );
        }
        public async Task<Booking?> GetByIdAsync(int bookingId)
        {
            return await _context.Bookings.FindAsync(bookingId);
        }

        public async Task DeleteAsync(Booking booking)
        {
            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();
        }
    }
}