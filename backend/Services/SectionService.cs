using backend.Models;
using backend.Models.DTOs;
using backend.Repositories;

namespace backend.Services
{
    public class SectionService : ISectionService
    {
        private readonly ISectionRepository _sectionRepository;
        private readonly IUserRepository _userRepository;

        public SectionService(ISectionRepository sectionRepository, IUserRepository userRepository)
        {
            _sectionRepository = sectionRepository;
            _userRepository = userRepository;
        }

        public async Task<Section> CreateSectionAsync(CreateSectionRequestDto request)
        {
            var trainer = await _userRepository.GetByIdAsync(request.TrainerId);
            if (trainer == null || !(trainer is Trainer))
            {
                throw new KeyNotFoundException("Тренер з таким ID не існує.");
            }

            var newSection = new Section
            {
                Title = request.Title,
                SportType = request.SportType,
                Price = request.Price,
                TrainerId = request.TrainerId
            };

            return await _sectionRepository.CreateAsync(newSection);
        }

        public async Task<IEnumerable<Section>> GetCatalogAsync(string? sportType)
        {
            var sections = await _sectionRepository.GetAllAsync();

            if (!string.IsNullOrWhiteSpace(sportType))
            {
                sections = sections.Where(s => 
                    s.SportType.Equals(sportType, StringComparison.OrdinalIgnoreCase));
            }

            return sections;
        }

        public async Task<Section?> GetSectionByIdAsync(int id)
        {
            return await _sectionRepository.GetByIdAsync(id);
        }

        public async Task<Section> UpdateSectionAsync(int id, UpdateSectionRequestDto request)
        {
            var sectionToUpdate = await _sectionRepository.GetByIdAsync(id);
            if (sectionToUpdate == null)
            {
                throw new KeyNotFoundException("Секцію з таким ID не знайдено.");
            }

            var trainer = await _userRepository.GetByIdAsync(request.TrainerId);
            if (trainer == null || !(trainer is Trainer))
            {
                throw new KeyNotFoundException("Тренер з таким ID не існує.");
            }

            sectionToUpdate.Title = request.Title;
            sectionToUpdate.SportType = request.SportType;
            sectionToUpdate.Price = request.Price;
            sectionToUpdate.TrainerId = request.TrainerId;

            await _sectionRepository.UpdateAsync(sectionToUpdate);
            return sectionToUpdate;
        }

        public async Task DeleteSectionAsync(int id)
        {
            var sectionToDelete = await _sectionRepository.GetByIdAsync(id);
            if (sectionToDelete == null)
            {
                throw new KeyNotFoundException("Секцію з таким ID не знайдено.");
            }

            await _sectionRepository.DeleteAsync(sectionToDelete);
        }
    }
}