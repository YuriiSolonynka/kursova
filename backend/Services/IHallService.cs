using backend.Models;
using backend.Models.DTOs;

namespace backend.Services
{
    public interface IHallService
    {
        Task<Hall?> GetByIdAsync(int id);
        Task<IEnumerable<Hall>> GetAllAsync();
        Task<Hall> CreateAsync(CreateHallRequestDto request);
        Task<Hall> UpdateAsync(int id, CreateHallRequestDto request);
        Task DeleteAsync(int id);
    }
}