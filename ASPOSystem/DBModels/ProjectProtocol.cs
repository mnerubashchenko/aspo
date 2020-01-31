using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class ProjectProtocol
    {
        public Guid IdProjprot { get; set; }
        public Guid? ProjectLink { get; set; }
        public Guid? ProtocolProjectLink { get; set; }

        public Project ProjectLinkNavigation { get; set; }
        public Protocol ProtocolProjectLinkNavigation { get; set; }
    }
}
