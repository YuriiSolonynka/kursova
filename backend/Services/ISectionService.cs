using backend.Models;
using backend.Models.DTOs;

namespace backend.Services
{
    public interface ISectionService
    {
        Task<IEnumerable<Section>> GetCatalogAsync(string? sportType);
        Task<Section?> GetSectionByIdAsync(int id);
        Task<Section> CreateSectionAsync(CreateSectionRequestDto request);
        Task<Section> UpdateSectionAsync(int id, UpdateSectionRequestDto request);
        Task DeleteSectionAsync(int id);
    }
}