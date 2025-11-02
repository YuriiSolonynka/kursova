using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt; 
using System.Security.Claims;         
using System.Text;
using backend.Models;
using backend.Models.DTOs;
using backend.Repositories;

namespace backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration; 

        public AuthService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
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
            
            return await _userRepository.AddAsync(newClient);
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
                // new Claim(ClaimTypes.Role, user.Role) 
            };
            
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