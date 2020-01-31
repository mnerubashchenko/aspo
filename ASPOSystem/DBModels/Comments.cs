using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Comments
    {
        public Comments()
        {
            CommentsProtocol = new HashSet<CommentsProtocol>();
        }

        public Guid IdComment { get; set; }
        public string TextComment { get; set; }
        public Guid? AuthorComment { get; set; }
        public DateTime? DateTimeComment { get; set; }

        public Users AuthorCommentNavigation { get; set; }
        public ICollection<CommentsProtocol> CommentsProtocol { get; set; }
    }
}
