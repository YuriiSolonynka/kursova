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
    public class SubscriptionsController : ControllerBase
    {
        private readonly ISubscriptionService _subscriptionService;

        public SubscriptionsController(ISubscriptionService subscriptionService)
        {
            _subscriptionService = subscriptionService;
        }

        // GET /api/subscriptions/my-subscriptions
        [HttpGet("my-subscriptions")]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> GetMySubscriptions()
        {
            var clientId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var subscriptions = await _subscriptionService.GetMySubscriptionsAsync(clientId);

            var dtos = subscriptions.Select(s => new SubscriptionDto
            {
                Id = s.Id,
                Type = s.Type,
                ValidUntil = s.ValidUntil,
                ClientId = s.ClientId
            });
            
            return Ok(dtos);
        }

        // POST /api/subscriptions
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateSubscription([FromBody] CreateSubscriptionRequestDto request)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                var newSub = await _subscriptionService.CreateSubscriptionAsync(request);
                return Ok(newSub);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        // DELETE /api/subscriptions/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteSubscription(int id)
        {
            try
            {
                await _subscriptionService.DeleteSubscriptionAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}