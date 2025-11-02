using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Client : User
    {
        public int MembershipCardId { get; private set; }
        public MembershipCard MembershipCard { get; set; } = null!;

        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        public ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();
    }

    public class MembershipCard
    {
        public int Id { get; private set; }
        public string CardType { get; private set; } = string.Empty;
        public int BonusPoints { get; private set; }
        public bool Status { get; private set; }

        public int ClientId { get; set; }
        public Client Client { get; set; } = null!;
        
        public MembershipCard(string cardType)
        {
            this.CardType = cardType;
            this.BonusPoints = 0;
            this.Status = true;
        }
        
        public void AddPoints(int points)
        {
            if (points <= 0) return;
            this.BonusPoints += points;
        }

        public void SpendPoints(int points)
        {
            if (points <= 0) return;
            if (this.BonusPoints < points)
            {
                throw new InvalidOperationException("Недостатньо бонусів.");
            }
            this.BonusPoints -= points;
        }

        public void UpgradeCard(string newType)
        {
            this.CardType = newType;
        }

        public void Freeze()
        {
            this.Status = false;
        }
        public void Activate()
        {
            this.Status = true;
        }
    }
}