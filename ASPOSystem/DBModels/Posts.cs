using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Posts
    {
        public Posts()
        {
            Users = new HashSet<Users>();
        }

        public Guid IdPost { get; set; }
        public string NamePost { get; set; }

        public ICollection<Users> Users { get; set; }
    }
}
