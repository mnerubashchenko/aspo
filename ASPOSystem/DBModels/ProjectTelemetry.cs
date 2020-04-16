using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class ProjectTelemetry
    {
        public Guid Id { get; set; }
        public Guid? IdProject { get; set; }
        public Guid? IdTelemetry { get; set; }

        public Project IdProjectNavigation { get; set; }
        public Telemetry IdTelemetryNavigation { get; set; }
    }
}
