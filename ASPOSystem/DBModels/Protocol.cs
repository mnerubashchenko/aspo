using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Protocol
    {
        public Protocol()
        {
            CommentsProtocol = new HashSet<CommentsProtocol>();
            MeasureProtocol = new HashSet<MeasureProtocol>();
            PrcommandsProtocol = new HashSet<PrcommandsProtocol>();
            ProjectProtocol = new HashSet<ProjectProtocol>();
            TelemetryProtocol = new HashSet<TelemetryProtocol>();
        }

        public Guid IdProtocol { get; set; }
        public string NameProtocol { get; set; }
        public DateTime? DateCreateProtocol { get; set; }

        public ICollection<CommentsProtocol> CommentsProtocol { get; set; }
        public ICollection<MeasureProtocol> MeasureProtocol { get; set; }
        public ICollection<PrcommandsProtocol> PrcommandsProtocol { get; set; }
        public ICollection<ProjectProtocol> ProjectProtocol { get; set; }
        public ICollection<TelemetryProtocol> TelemetryProtocol { get; set; }
    }
}
