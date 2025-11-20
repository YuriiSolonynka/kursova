using backend.Models;
using backend.Models.DTOs;
using backend.Repositories;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<User> GetProfileAsync(int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found.");
            }
            return user;
        }

        public async Task ChangePasswordAsync(int userId, ChangePasswordRequestDto request)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                throw new KeyNotFoundException("Користувача не знайдено.");
            }

            if (!user.CheckPassword(request.CurrentPassword))
            {
                throw new InvalidOperationException("Неправильний поточний пароль.");
            }

            user.SetPassword(request.NewPassword);

            await _userRepository.UpdateAsync(user);
        }

        public async Task UpdateProfileAsync(int userId, UpdateProfileRequestDto request)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                throw new KeyNotFoundException("Користувача не знайдено.");
            }

            user.UpdateName(request.Name);
            user.UpdatePhone(request.Phone);

            await _userRepository.UpdateAsync(user);
        }
    }
}