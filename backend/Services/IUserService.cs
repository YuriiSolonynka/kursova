using backend.Models.DTOs;

namespace backend.Services
{
    public interface IUserService
    {
        Task UpdateProfileAsync(int userId, UpdateProfileRequestDto request);
        Task ChangePasswordAsync(int userId, ChangePasswordRequestDto request);
    }
}