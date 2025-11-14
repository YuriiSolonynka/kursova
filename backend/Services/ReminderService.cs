using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class ReminderService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<ReminderService> _logger;
        private readonly TimeSpan _checkInterval = TimeSpan.FromMinutes(1);

        public ReminderService(IServiceProvider serviceProvider, ILogger<ReminderService> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Reminder Service запущено.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using (var scope = _serviceProvider.CreateScope())
                    {
                        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                        var emailService = scope.ServiceProvider.GetRequiredService<IEmailService>();

                        var now = DateTime.UtcNow;
                        
                        var reminderWindowStart = now.AddMinutes(59);
                        var reminderWindowEnd = now.AddMinutes(60);

                        var bookingsToRemind = await context.Bookings
                            .Include(b => b.Client)
                            .Include(b => b.Section)
                            .Where(b => b.StartTime > reminderWindowStart && 
                                        b.StartTime <= reminderWindowEnd)
                            .ToListAsync(stoppingToken);

                        foreach (var booking in bookingsToRemind)
                        {
                            string subject = "Нагадування про тренування!";
                            string body = $"<h1>Нагадування!</h1><p>Шановний {booking.Client.Name}, " +
                                          $"нагадуємо, що у вас заплановано тренування " +
                                          $"'{booking.Section?.Title ?? "в залі"}' " +
                                          $"сьогодні о {booking.StartTime.ToLocalTime():HH:mm}.</p>";
                            
                            await emailService.SendEmailAsync(booking.Client.Email, subject, body);

                            _logger.LogInformation($"Відправлено нагадування для бронювання {booking.Id}");
                        }
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Помилка в Reminder Service.");
                }

                await Task.Delay(_checkInterval, stoppingToken);
            }
        }
    }
}