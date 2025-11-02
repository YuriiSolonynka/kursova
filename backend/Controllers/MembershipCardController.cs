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
    public class MembershipCardController : ControllerBase
    {
        private readonly IMembershipCardService _cardService;

        public MembershipCardController(IMembershipCardService cardService)
        {
            _cardService = cardService;
        }

        // GET /api/membershipcard/my-card
        [HttpGet("my-card")]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> GetMyCard()
        {
            var clientId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var card = await _cardService.GetMyCardAsync(clientId);

            var dto = new MembershipCardDto
            {
                Id = card.Id,
                CardType = card.CardType,
                BonusPoints = card.BonusPoints,
                IsActive = card.Status
            };
            return Ok(dto);
        }

        // PUT /api/membershipcard/admin/{clientId}
        [HttpPut("admin/{clientId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateCardByAdmin(int clientId, [FromBody] AdminUpdateCardRequestDto request)
        {
            try
            {
                var updatedCard = await _cardService.UpdateCardByAdminAsync(clientId, request);
                var dto = new MembershipCardDto
                {
                    Id = updatedCard.Id,
                    CardType = updatedCard.CardType,
                    BonusPoints = updatedCard.BonusPoints,
                    IsActive = updatedCard.Status
                };
                return Ok(dto);
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