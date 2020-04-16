using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Telemetry
    {
        public Telemetry()
        {
            ProjectTelemetry = new HashSet<ProjectTelemetry>();
        }

        public Guid Id { get; set; }
        public string LongNameTelemetry { get; set; }
        public string ShortNameTelemetry { get; set; }
        public int? ByteNumberTelemetry { get; set; }
        public int? StartBitTelemetry { get; set; }
        public int? LenghtTelemetry { get; set; }
        public string PossibleValuesTelemetry { get; set; }

        public ICollection<ProjectTelemetry> ProjectTelemetry { get; set; }
    }
}
