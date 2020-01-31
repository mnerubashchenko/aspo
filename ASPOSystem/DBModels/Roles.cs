using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Roles
    {
        public Roles()
        {
            Users = new HashSet<Users>();
        }

        public Guid IdRole { get; set; }
        public string NameRole { get; set; }

        public ICollection<Users> Users { get; set; }
    }
}
