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
        public string HasItems { get; set; }
        public string ParentId { get; set; }
        public string LongName { get; set; }
        public string ShortName { get; set; }
        public int? ByteNumber { get; set; }
        public int? StartBit { get; set; }
        public int? Lenght { get; set; }
        public string PossibleValues { get; set; }
        public string Value { get; set; }

        public ICollection<ProjectTelemetry> ProjectTelemetry { get; set; }
    }
}
