using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Devices
    {
        public Devices()
        {
            ProjectDevice = new HashSet<ProjectDevice>();
        }

        public Guid Id { get; set; }
        public Guid? Type { get; set; }
        public string Caption { get; set; }
        public Guid? Brand { get; set; }
        public string Model { get; set; }
        public string Status { get; set; }
        public string IpInput { get; set; }
        public string ActualIp { get; set; }
        public string Port { get; set; }
        public string PositionNumber { get; set; }

        public Brands BrandNavigation { get; set; }
        public Typedev TypeNavigation { get; set; }
        public ICollection<ProjectDevice> ProjectDevice { get; set; }
    }
}
