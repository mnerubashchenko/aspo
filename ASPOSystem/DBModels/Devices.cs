using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Devices
    {
        public Devices()
        {
            DevicesMeasure = new HashSet<DevicesMeasure>();
        }

        public Guid IdDevice { get; set; }
        public Guid? InterfaceDevice { get; set; }
        public Guid? BrandDevice { get; set; }
        public string ModelDevice { get; set; }
        public string StatusDevice { get; set; }
        public string IpInputDevice { get; set; }
        public string ActualIpDevice { get; set; }
        public string PortDevice { get; set; }
        public Guid? TypeDevice { get; set; }
        public string CaptionDevice { get; set; }

        public Brands BrandDeviceNavigation { get; set; }
        public Interfaces InterfaceDeviceNavigation { get; set; }
        public Typedev TypeDeviceNavigation { get; set; }
        public ICollection<DevicesMeasure> DevicesMeasure { get; set; }
    }
}
