using backend.Models.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HallsController : ControllerBase
    {
        private readonly IHallService _hallService;

        public HallsController(IHallService hallService)
        {
            _hallService = hallService;
        }

        // GET /api/halls
        [HttpGet]
        public async Task<IActionResult> GetAllHalls()
        {
            var halls = await _hallService.GetAllAsync();
            var dtos = halls.Select(h => new HallDto
            {
                Id = h.Id,
                Name = h.Name,
                Capacity = h.Capacity
            });
            return Ok(dtos);
        }

        // GET /api/halls/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHallById(int id)
        {
            var hall = await _hallService.GetByIdAsync(id);
            if (hall == null) return NotFound();

            var dto = new HallDto
            {
                Id = hall.Id,
                Name = hall.Name,
                Capacity = hall.Capacity
            };
            return Ok(dto);
        }

        // POST /api/halls
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateHall([FromBody] CreateHallRequestDto request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            var newHall = await _hallService.CreateAsync(request);
            return CreatedAtAction(nameof(GetHallById), new { id = newHall.Id }, newHall);
        }

        // PUT /api/halls/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateHall(int id, [FromBody] CreateHallRequestDto request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var updatedHall = await _hallService.UpdateAsync(id, request);
                return Ok(updatedHall);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        // DELETE /api/halls/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteHall(int id)
        {
            try
            {
                await _hallService.DeleteAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}