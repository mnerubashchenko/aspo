using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Typedev
    {
        public Typedev()
        {
            Devices = new HashSet<Devices>();
        }

        public Guid IdTypedev { get; set; }
        public string NameTypedev { get; set; }

        public ICollection<Devices> Devices { get; set; }
    }
}
