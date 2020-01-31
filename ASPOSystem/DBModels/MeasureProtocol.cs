using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class MeasureProtocol
    {
        public Guid IdMeasprot { get; set; }
        public Guid? MeasureLink { get; set; }
        public Guid? ProtocolMeasureLink { get; set; }

        public Measure MeasureLinkNavigation { get; set; }
        public Protocol ProtocolMeasureLinkNavigation { get; set; }
    }
}
