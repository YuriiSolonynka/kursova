using backend.Models;
using backend.Models.DTOs;
using backend.Repositories;

namespace backend.Services
{
    public class HallService : IHallService
    {
        private readonly IHallRepository _hallRepository;

        public HallService(IHallRepository hallRepository)
        {
            _hallRepository = hallRepository;
        }

        public async Task<Hall> CreateAsync(CreateHallRequestDto request)
        {
            var hall = new Hall
            {
                Name = request.Name,
                Capacity = request.Capacity
            };
            return await _hallRepository.CreateAsync(hall);
        }

        public async Task DeleteAsync(int id)
        {
            var hall = await _hallRepository.GetByIdAsync(id);
            if (hall == null)
            {
                throw new KeyNotFoundException("Зал не знайдено.");
            }
            await _hallRepository.DeleteAsync(hall);
        }

        public async Task<IEnumerable<Hall>> GetAllAsync()
        {
            return await _hallRepository.GetAllAsync();
        }

        public async Task<Hall?> GetByIdAsync(int id)
        {
            return await _hallRepository.GetByIdAsync(id);
        }

        public async Task<Hall> UpdateAsync(int id, CreateHallRequestDto request)
        {
            var hall = await _hallRepository.GetByIdAsync(id);
            if (hall == null)
            {
                throw new KeyNotFoundException("Зал не знайдено.");
            }

            hall.Name = request.Name;
            hall.Capacity = request.Capacity;

            await _hallRepository.UpdateAsync(hall);
            return hall;
        }
    }
}