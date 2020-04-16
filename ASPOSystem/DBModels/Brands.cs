using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Brands
    {
        public Brands()
        {
            Devices = new HashSet<Devices>();
        }

        public Guid Id { get; set; }
        public string NameBrand { get; set; }

        public ICollection<Devices> Devices { get; set; }
    }
}
