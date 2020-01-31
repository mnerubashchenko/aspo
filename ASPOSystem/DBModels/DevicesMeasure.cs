using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class DevicesMeasure
    {
        public Guid IdDevmeas { get; set; }
        public Guid? DeviceLink { get; set; }
        public Guid? MeasureLink { get; set; }

        public Devices DeviceLinkNavigation { get; set; }
        public Measure MeasureLinkNavigation { get; set; }
    }
}
