using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class ProjectInterface
    {
        public Guid Id { get; set; }
        public Guid? IdProject { get; set; }
        public Guid? IdInterface { get; set; }

        public Interfaces IdInterfaceNavigation { get; set; }
        public Project IdProjectNavigation { get; set; }
    }
}
