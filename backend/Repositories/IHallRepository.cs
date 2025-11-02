using backend.Models;

namespace backend.Repositories
{
    public interface IHallRepository
    {
        Task<Hall?> GetByIdAsync(int id);
        Task<IEnumerable<Hall>> GetAllAsync();
        Task<Hall> CreateAsync(Hall hall);
        Task UpdateAsync(Hall hall);
        Task DeleteAsync(Hall hall);
    }
}