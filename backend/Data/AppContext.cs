using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        
        public DbSet<User> Users { get; set; } 
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Hall> Halls { get; set; }
        public DbSet<MembershipCard> MembershipCards { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasDiscriminator<string>("UserType") 
                .HasValue<Client>("Client")
                .HasValue<Trainer>("Trainer") 
                .HasValue<Admin>("Admin");
            
            modelBuilder.Entity<Client>()
                .HasOne(c => c.MembershipCard) 
                .WithOne(m => m.Client)
                .HasForeignKey<MembershipCard>(m => m.ClientId); 
            
            modelBuilder.Entity<Client>()
                .HasMany(c => c.Bookings) 
                .WithOne(b => b.Client)   
                .HasForeignKey(b => b.ClientId); 

            modelBuilder.Entity<Client>()
                .HasMany(c => c.Subscriptions)
                .WithOne(s => s.Client)
                .HasForeignKey(s => s.ClientId);

            modelBuilder.Entity<Trainer>()
                .HasMany(t => t.Sections)
                .WithOne(s => s.Trainer)
                .HasForeignKey(s => s.TrainerId);

            modelBuilder.Entity<Section>()
                .HasMany(s => s.Bookings)
                .WithOne(b => b.Section)
                .HasForeignKey(b => b.SectionId)
                .IsRequired(false); 

            modelBuilder.Entity<Hall>()
                .HasMany(h => h.Bookings)
                .WithOne(b => b.Hall)
                .HasForeignKey(b => b.HallId)
                .IsRequired(false); 

            modelBuilder.Entity<Admin>()
                .Property(a => a.AccessLevel)
                .HasConversion<string>();

            modelBuilder.Entity<Section>()
                .Property(s => s.Price)
                .HasColumnType("decimal(18,2)");
        }
    }
}