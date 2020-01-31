using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class CommentsProtocol
    {
        public Guid IdCommentprotocol { get; set; }
        public Guid? CommentLink { get; set; }
        public Guid? ProtocolCommentLink { get; set; }

        public Comments CommentLinkNavigation { get; set; }
        public Protocol ProtocolCommentLinkNavigation { get; set; }
    }
}
