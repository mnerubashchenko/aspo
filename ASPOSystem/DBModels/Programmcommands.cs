using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Programmcommands
    {
        public Programmcommands()
        {
            ProjectCommand = new HashSet<ProjectCommand>();
        }

        public Guid Id { get; set; }
        public string CodeCommand { get; set; }
        public string NameCommand { get; set; }
        public string PurposeCommand { get; set; }
        public string DescriptionCommand { get; set; }
        public string TelemetryCommand { get; set; }

        public ICollection<ProjectCommand> ProjectCommand { get; set; }
    }
}
