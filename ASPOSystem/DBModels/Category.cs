using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Category
    {
        public Category()
        {
            Project = new HashSet<Project>();
        }

        public Guid IdCategory { get; set; }
        public string NameCategory { get; set; }

        public ICollection<Project> Project { get; set; }
    }
}
