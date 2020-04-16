using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class ProjectCommand
    {
        public Guid Id { get; set; }
        public Guid? IdProject { get; set; }
        public Guid? IdCommand { get; set; }

        public Programmcommands IdCommandNavigation { get; set; }
        public Project IdProjectNavigation { get; set; }
    }
}
