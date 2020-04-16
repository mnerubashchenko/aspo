using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Typeinter
    {
        public Typeinter()
        {
            Interfaces = new HashSet<Interfaces>();
        }

        public Guid Id { get; set; }
        public string NameTypeinter { get; set; }

        public ICollection<Interfaces> Interfaces { get; set; }
    }
}
