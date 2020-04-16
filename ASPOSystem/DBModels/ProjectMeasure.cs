using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class ProjectMeasure
    {
        public Guid Id { get; set; }
        public Guid? IdProject { get; set; }
        public Guid? IdMeasure { get; set; }

        public Measure IdMeasureNavigation { get; set; }
        public Project IdProjectNavigation { get; set; }
    }
}
