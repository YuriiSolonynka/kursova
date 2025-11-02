using backend.Models.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectionsController : ControllerBase
    {
        private readonly ISectionService _sectionService;

        public SectionsController(ISectionService sectionService)
        {
            _sectionService = sectionService;
        }

        //GET /api/sections?sportType=Футбол
        [HttpGet]
        public async Task<IActionResult> GetCatalog(
            [FromQuery] string? sportType)
        {
            var sections = await _sectionService.GetCatalogAsync(sportType);

            var sectionDtos = sections.Select(s => new SectionDto
            {
                Id = s.Id,
                Title = s.Title,
                SportType = s.SportType,
                Price = s.Price,
                TrainerName = s.Trainer?.Name ?? "Тренера не призначено" 
            });

            return Ok(sectionDtos);
        }

        // GET /api/sections/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSectionById(int id)
        {
            var section = await _sectionService.GetSectionByIdAsync(id);

            if (section == null)
            {
                return NotFound();
            }

            var sectionDto = new SectionDto
            {
                Id = section.Id,
                Title = section.Title,
                SportType = section.SportType,
                Price = section.Price,
                TrainerName = section.Trainer?.Name ?? "Тренера не призначено"
            };

            return Ok(sectionDto);
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateSection([FromBody] CreateSectionRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var newSection = await _sectionService.CreateSectionAsync(request);
                return Ok(newSection); 
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        // PUT /api/sections/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateSection(int id, [FromBody] UpdateSectionRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var updatedSection = await _sectionService.UpdateSectionAsync(id, request);
                return Ok(updatedSection);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message); // 404 (Секцію або Тренера не знайдено)
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // DELETE /api/sections/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteSection(int id)
        {
            try
            {
                await _sectionService.DeleteSectionAsync(id);
                return NoContent(); // 204 No Content - стандартна успішна відповідь для Delete
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message); // 404
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}