using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Interfaces
    {
        public Interfaces()
        {
            ProjectInterface = new HashSet<ProjectInterface>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string IsReadyStatus { get; set; }
        public string IsUsed { get; set; }
        public string SelectedPort { get; set; }
        public Guid? Type { get; set; }
        public string IpInput { get; set; }
        public string ActualIp { get; set; }

        public Typeinter TypeNavigation { get; set; }
        public ICollection<ProjectInterface> ProjectInterface { get; set; }
    }
}
