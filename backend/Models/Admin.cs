using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public enum AdminAccessLevel
    {
        Viewer,
        Editor
    }
    public class Admin : User
    {
        public AdminAccessLevel AccessLevel { get; private set; } 

        public void UpdateAccessLevel(AdminAccessLevel newLevel)
        {
            this.AccessLevel = newLevel;
        }
    }
}