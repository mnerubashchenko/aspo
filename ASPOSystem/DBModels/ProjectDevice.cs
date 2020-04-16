using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class ProjectDevice
    {
        public Guid Id { get; set; }
        public Guid? IdProject { get; set; }
        public Guid? IdDevice { get; set; }

        public Devices IdDeviceNavigation { get; set; }
        public Project IdProjectNavigation { get; set; }
    }
}
