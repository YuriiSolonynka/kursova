using backend.Models;

namespace backend.Repositories
{
    public interface ISectionRepository
    {
        Task<Section?> GetByIdAsync(int id);
        Task<IEnumerable<Section>> GetAllAsync();
        Task<Section> CreateAsync(Section section);
        Task UpdateAsync(Section section);
        Task DeleteAsync(Section section);
    }
}