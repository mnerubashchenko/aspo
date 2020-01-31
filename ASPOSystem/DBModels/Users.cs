using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Users
    {
        public Users()
        {
            Comments = new HashSet<Comments>();
            Project = new HashSet<Project>();
        }

        public Guid IdUser { get; set; }
        public string NameUser { get; set; }
        public string MiddlenameUser { get; set; }
        public string LastnameUser { get; set; }
        public string LoginUser { get; set; }
        public Guid? PostUser { get; set; }
        public Guid? RoleUser { get; set; }

        public Posts PostUserNavigation { get; set; }
        public Roles RoleUserNavigation { get; set; }
        public ICollection<Comments> Comments { get; set; }
        public ICollection<Project> Project { get; set; }
    }
}
