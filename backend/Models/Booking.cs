using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Booking
    {
        public int Id { get; private set; }
        public DateTime StartTime { get; private set; }
        public DateTime EndTime { get; private set; } 

        public int ClientId { get; set; }
        public Client Client { get; set; } = null!;

        public int? SectionId { get; set; }
        public Section? Section { get; set; }

        public int? HallId { get; set; }
        public Hall? Hall { get; set; }
    }
}