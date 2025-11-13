using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Hall
    {
        public int Id { get; private set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public decimal Price { get; set; }

        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}