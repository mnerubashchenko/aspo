using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class PrcommandsProtocol
    {
        public Guid IdPrcprot { get; set; }
        public Guid? CommandLink { get; set; }
        public Guid? ProtocolCommandLink { get; set; }

        public Programmcommands CommandLinkNavigation { get; set; }
        public Protocol ProtocolCommandLinkNavigation { get; set; }
    }
}
