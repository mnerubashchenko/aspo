using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Measure
    {
        public Measure()
        {
            ProjectMeasure = new HashSet<ProjectMeasure>();
        }

        public Guid Id { get; set; }
        public string GroupMeasure { get; set; }
        public string NameMeasure { get; set; }
        public string IsCheckMeasure { get; set; }
        public string StatusMeasure { get; set; }
        public Guid? TypeMeasure { get; set; }
        public string ManualMeasure { get; set; }
        public DateTime? DateCreateMeasure { get; set; }

        public Typemeasure TypeMeasureNavigation { get; set; }
        public ICollection<ProjectMeasure> ProjectMeasure { get; set; }
    }
}
