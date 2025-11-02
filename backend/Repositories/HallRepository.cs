using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class HallRepository : IHallRepository
    {
        private readonly AppDbContext _context;

        public HallRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Hall> CreateAsync(Hall hall)
        {
            await _context.Halls.AddAsync(hall);
            await _context.SaveChangesAsync();
            return hall;
        }

        public async Task DeleteAsync(Hall hall)
        {
            _context.Halls.Remove(hall);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Hall>> GetAllAsync()
        {
            return await _context.Halls.ToListAsync();
        }

        public async Task<Hall?> GetByIdAsync(int id)
        {
            return await _context.Halls.FindAsync(id);
        }

        public async Task UpdateAsync(Hall hall)
        {
            _context.Halls.Update(hall);
            await _context.SaveChangesAsync();
        }
    }
}