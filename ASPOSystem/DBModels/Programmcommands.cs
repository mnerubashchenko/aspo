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
        public string Name { get; set; }
        public string Code { get; set; }
        public string LongName { get; set; }
        public string Device { get; set; }

        public ICollection<ProjectCommand> ProjectCommand { get; set; }
    }
}
