using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Project
    {
        public Project()
        {
            Comments = new HashSet<Comments>();
            ProjectCommand = new HashSet<ProjectCommand>();
            ProjectDevice = new HashSet<ProjectDevice>();
            ProjectInterface = new HashSet<ProjectInterface>();
            ProjectMeasure = new HashSet<ProjectMeasure>();
            ProjectTelemetry = new HashSet<ProjectTelemetry>();
        }

        public Guid Id { get; set; }
        public string NameProject { get; set; }
        public Guid? DirectorProject { get; set; }
        public string DescriptionProject { get; set; }
        public DateTime? DateCreateProject { get; set; }

        public Users DirectorProjectNavigation { get; set; }
        public ICollection<Comments> Comments { get; set; }
        public ICollection<ProjectCommand> ProjectCommand { get; set; }
        public ICollection<ProjectDevice> ProjectDevice { get; set; }
        public ICollection<ProjectInterface> ProjectInterface { get; set; }
        public ICollection<ProjectMeasure> ProjectMeasure { get; set; }
        public ICollection<ProjectTelemetry> ProjectTelemetry { get; set; }
    }
}
