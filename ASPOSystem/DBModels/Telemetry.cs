using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Telemetry
    {
        public Telemetry()
        {
            TelemetryProtocol = new HashSet<TelemetryProtocol>();
        }

        public Guid IdTelemetry { get; set; }
        public string LongNameTelemetry { get; set; }
        public string ShortNameTelemetry { get; set; }
        public int? ByteNumberTelemetry { get; set; }
        public int? StartBitTelemetry { get; set; }
        public int? LenghtTelemetry { get; set; }
        public string PossibleValuesTelemetry { get; set; }

        public ICollection<TelemetryProtocol> TelemetryProtocol { get; set; }
    }
}
