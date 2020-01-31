using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class TelemetryProtocol
    {
        public Guid IdTelprot { get; set; }
        public Guid? TelemetryLink { get; set; }
        public Guid? ProtocolTelemetryLink { get; set; }

        public Protocol ProtocolTelemetryLinkNavigation { get; set; }
        public Telemetry TelemetryLinkNavigation { get; set; }
    }
}
