using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class SectionRepository : ISectionRepository
    {
        private readonly AppDbContext _context;

        public SectionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Section> CreateAsync(Section section)
        {
            await _context.Sections.AddAsync(section);
            await _context.SaveChangesAsync();
            return section;
        }

        public async Task<IEnumerable<Section>> GetAllAsync()
        {
            return await _context.Sections
                .Include(s => s.Trainer) 
                .ToListAsync();
        }

        public async Task<Section?> GetByIdAsync(int id)
        {
            return await _context.Sections
                .Include(s => s.Trainer)
                .FirstOrDefaultAsync(s => s.Id == id);
        }
        public async Task UpdateAsync(Section section)
        {
            _context.Sections.Update(section);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Section section)
        {
            _context.Sections.Remove(section);
            await _context.SaveChangesAsync();
        }
    }
}