using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Measure
    {
        public Measure()
        {
            DevicesMeasure = new HashSet<DevicesMeasure>();
            MeasureProtocol = new HashSet<MeasureProtocol>();
        }

        public Guid IdMeasure { get; set; }
        public string GroupMeasure { get; set; }
        public string NameMeasure { get; set; }
        public string IsCheckMeasure { get; set; }
        public string StatusMeasure { get; set; }
        public Guid? TypeMeasure { get; set; }
        public string ManualMeasure { get; set; }
        public Guid? InterfaceMeasure { get; set; }
        public DateTime? DateCreateMeasure { get; set; }

        public Interfaces InterfaceMeasureNavigation { get; set; }
        public Typemeasure TypeMeasureNavigation { get; set; }
        public ICollection<DevicesMeasure> DevicesMeasure { get; set; }
        public ICollection<MeasureProtocol> MeasureProtocol { get; set; }
    }
}
