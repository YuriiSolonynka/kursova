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
    }
}