using backend.Models.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        
        public class UserProfileDto
        {
            public string Name { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string Phone { get; set; } = string.Empty;
        }

        // GET /api/users/me
        [HttpGet("me")]
        public async Task<IActionResult> GetMyProfile()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            try
            {
                var user = await _userService.GetProfileAsync(userId);
                
                // Повертаємо безпечний DTO, а не всю модель User
                return Ok(new UserProfileDto 
                { 
                    Name = user.Name, 
                    Email = user.Email, 
                    Phone = user.Phone 
                });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        // PUT /api/users/me
        [HttpPut("me")]
        public async Task<IActionResult> UpdateMyProfile([FromBody] UpdateProfileRequestDto request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            try
            {
                await _userService.UpdateProfileAsync(userId, request);
                return Ok(new { Message = "Профіль успішно оновлено." });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST /api/users/me/change-password
        [HttpPost("me/change-password")]
        public async Task<IActionResult> ChangeMyPassword([FromBody] ChangePasswordRequestDto request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            try
            {
                await _userService.ChangePasswordAsync(userId, request);
                return Ok(new { Message = "Пароль успішно змінено." });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}