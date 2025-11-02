using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class SubscriptionRepository : ISubscriptionRepository
    {
        private readonly AppDbContext _context;

        public SubscriptionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Subscription> CreateAsync(Subscription subscription)
        {
            await _context.Subscriptions.AddAsync(subscription);
            await _context.SaveChangesAsync();
            return subscription;
        }

        public async Task DeleteAsync(Subscription subscription)
        {
            _context.Subscriptions.Remove(subscription);
            await _context.SaveChangesAsync();
        }

        public async Task<Subscription?> GetByIdAsync(int id)
        {
            return await _context.Subscriptions.FindAsync(id);
        }

        public async Task<IEnumerable<Subscription>> GetByClientIdAsync(int clientId)
        {
            return await _context.Subscriptions
                .Where(s => s.ClientId == clientId)
                .ToListAsync();
        }
    }
}