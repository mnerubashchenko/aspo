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
        public string Grouup { get; set; }
        public string IsParent { get; set; }
        public string IdMeasure { get; set; }
        public string ParentId { get; set; }
        public string Name { get; set; }
        public string Caption { get; set; }
        public int? MinValue { get; set; }
        public int? MaxValue { get; set; }
        public string IsCheck { get; set; }
        public string Status { get; set; }
        public Guid? Type { get; set; }
        public string Factor { get; set; }

        public Typemeasure TypeNavigation { get; set; }
        public ICollection<ProjectMeasure> ProjectMeasure { get; set; }
    }
}
