using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Typemeasure
    {
        public Typemeasure()
        {
            Measure = new HashSet<Measure>();
        }

        public Guid Id { get; set; }
        public string NameTypemeasure { get; set; }

        public ICollection<Measure> Measure { get; set; }
    }
}
