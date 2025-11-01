using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Trainer : User
    {
        public int ExpirienceYears { get; set; }
        public string Specialization { get; set; }

        public ICollection<Section> Sections { get; set; } = new List<Section>();
    }
}