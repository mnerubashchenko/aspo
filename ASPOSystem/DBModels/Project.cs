using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Project
    {
        public Project()
        {
            ProjectProtocol = new HashSet<ProjectProtocol>();
        }

        public Guid IdProject { get; set; }
        public string NameProject { get; set; }
        public Guid? DirectorProject { get; set; }
        public Guid? CategoryProject { get; set; }
        public string DescriptionProject { get; set; }
        public DateTime? DateCreateProject { get; set; }

        public Category CategoryProjectNavigation { get; set; }
        public Users DirectorProjectNavigation { get; set; }
        public ICollection<ProjectProtocol> ProjectProtocol { get; set; }
    }
}
