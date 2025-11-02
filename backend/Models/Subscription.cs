using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Subscription
    {
        public int Id { get; private set; } 
        public string Type { get; set; }
        public DateTime ValidUntil { get; set; }  
        
        public int ClientId { get; set; }
        public Client Client { get; set; }
    }
}