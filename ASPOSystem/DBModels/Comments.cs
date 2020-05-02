using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Comments
    {
        public Guid Id { get; set; }
        public Guid? AuthorComment { get; set; }
        public Guid? ProjectComment { get; set; }
        public string BodyComment { get; set; }
        public DateTime? DateCreateComment { get; set; }

        public Users AuthorCommentNavigation { get; set; }
        public Project ProjectCommentNavigation { get; set; }
    }
}
