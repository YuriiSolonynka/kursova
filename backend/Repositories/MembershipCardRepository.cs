using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class MembershipCardRepository : IMembershipCardRepository
    {
        private readonly AppDbContext _context;

        public MembershipCardRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<MembershipCard?> GetByClientIdAsync(int clientId)
        {
            return await _context.MembershipCards
                .FirstOrDefaultAsync(m => m.ClientId == clientId);
        }

        public async Task UpdateAsync(MembershipCard card)
        {
            _context.MembershipCards.Update(card);
            await _context.SaveChangesAsync();
        }
    }
}