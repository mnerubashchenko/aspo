using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Programmcommands
    {
        public Programmcommands()
        {
            PrcommandsProtocol = new HashSet<PrcommandsProtocol>();
        }

        public Guid IdCommand { get; set; }
        public string CodeCommand { get; set; }
        public string NameCommand { get; set; }
        public string PurposeCommand { get; set; }
        public string DescriptionCommand { get; set; }
        public string TelemetryCommand { get; set; }

        public ICollection<PrcommandsProtocol> PrcommandsProtocol { get; set; }
    }
}
