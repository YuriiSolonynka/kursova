using backend.Models.DTOs;
using backend.Models;

namespace backend.Services
{
    public interface IUserService
    {
        Task<User> GetProfileAsync(int userId);
        Task UpdateProfileAsync(int userId, UpdateProfileRequestDto request);
        Task ChangePasswordAsync(int userId, ChangePasswordRequestDto request);
    }
}