using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Section
    {
        public int Id { get; private set; }
        public string Title { get; set; }
        public string SportType { get; set; }
        public decimal Price { get; set; }

        public int TrainerId { get; set; }
        public Trainer Trainer { get; set; }
        
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}