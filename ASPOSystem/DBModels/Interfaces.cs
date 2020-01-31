using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Interfaces
    {
        public Interfaces()
        {
            Devices = new HashSet<Devices>();
            Measure = new HashSet<Measure>();
        }

        public Guid IdInterface { get; set; }
        public string NameInterface { get; set; }
        public string IsReadyStatusInterface { get; set; }
        public string IsUsedInterface { get; set; }
        public string SelectedPortInterface { get; set; }
        public Guid? TypeInterface { get; set; }
        public string IpInputInterface { get; set; }
        public string ActualIpInterface { get; set; }

        public Typeinter TypeInterfaceNavigation { get; set; }
        public ICollection<Devices> Devices { get; set; }
        public ICollection<Measure> Measure { get; set; }
    }
}
