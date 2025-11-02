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
    public class BookingsController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingsController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        //POST /api/bookings
        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] CreateBookingRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var clientIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(clientIdString))
                {
                    return Unauthorized("Неможливо ідентифікувати користувача.");
                }
                
                var clientId = int.Parse(clientIdString);

                var newBooking = await _bookingService.CreateBookingAsync(request, clientId);

                var bookingDto = new BookingDto
                {
                    Id = newBooking.Id,
                    StartTime = newBooking.StartTime,
                    EndTime = newBooking.EndTime,
                    SectionTitle = newBooking.Section?.Title,
                    HallName = newBooking.Hall?.Name
                };

                return Ok(bookingDto);
            }
            catch (ArgumentException ex) // Помилки валідації DTO
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex) // Помилка "Час зайнятий"
            {
                return Conflict(ex.Message); // 409 Conflict
            }
            catch (KeyNotFoundException ex) // Помилка "Секцію не знайдено"
            {
                return NotFound(ex.Message); // 404 Not Found
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }
        [HttpGet("my-history")]
        public async Task<IActionResult> GetMyHistory()
        {
            var clientIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(clientIdString))
            {
                return Unauthorized();
            }

            var clientId = int.Parse(clientIdString);
            var bookings = await _bookingService.GetMyBookingsAsync(clientId);

            var bookingDtos = bookings.Select(b => new BookingDto
            {
                Id = b.Id,
                StartTime = b.StartTime,
                EndTime = b.EndTime,
                SectionTitle = b.Section?.Title,
                HallName = b.Hall?.Name
            });

            return Ok(bookingDtos);
        }

        // DELETE /api/bookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> CancelBooking(int id)
        {
            var clientIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(clientIdString))
            {
                return Unauthorized();
            }
            
            var clientId = int.Parse(clientIdString);

            try
            {
                await _bookingService.CancelBookingAsync(id, clientId);
                return NoContent(); // 204 No Content
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message); // 404
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid(ex.Message); // 403 Forbidden
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}