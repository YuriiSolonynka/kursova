using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt; 
using System.Security.Claims;
using System.Text;
using backend.Models;
using backend.Models.DTOs;
using backend.Repositories;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;

namespace backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;

        public AuthService(
            IUserRepository userRepository, 
            IConfiguration configuration,
            IEmailService emailService)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _emailService = emailService;
        }

        public async Task<User> RegisterAsync(RegisterRequestDto requestDto)
        {
            if (await _userRepository.GetByEmailAsync(requestDto.Email) != null)
            {
                throw new InvalidOperationException("Цей Email вже зайнятий.");
            }

            var newClient = new Client();
            
            newClient.UpdateName(requestDto.Name);
            newClient.UpdateEmail(requestDto.Email);
            newClient.UpdatePhone(requestDto.Phone);
            newClient.SetPassword(requestDto.Password);
            
            var createdUser = await _userRepository.AddAsync(newClient);

            try
            {
                string subject = "Ласкаво просимо до SportsBooking!";
                string body = $"<h1>Вітаємо, {createdUser.Name}!</h1><p>Ви успішно зареєструвалися на нашому сервісі.</p>";
                await _emailService.SendEmailAsync(createdUser.Email, subject, body);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Не вдалося відправити лист: {ex.Message}");
            }

            return createdUser;
        }

        public async Task<string> LoginAsync(LoginRequestDto requestDto)
        {
            var user = await _userRepository.GetByEmailAsync(requestDto.Email);

            if (user == null || !user.CheckPassword(requestDto.Password))
            {
                throw new InvalidOperationException("Неправильний Email або пароль.");
            }

            return GenerateJwtToken(user);
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]!);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            if (user is Admin)
            {
                claims.Add(new Claim(ClaimTypes.Role, "Admin"));
            }
            else if (user is Trainer)
            {
                claims.Add(new Claim(ClaimTypes.Role, "Trainer"));
            }
            else if (user is Client)
            {
                claims.Add(new Claim(ClaimTypes.Role, "Client"));
            }
            
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}