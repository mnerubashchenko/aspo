using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Mvc;

namespace ASPOSystem.Controllers
{
    [Route("api/[controller]")]
    public class RolesController : Controller
    {
        [HttpGet("[action]")]
        public List<Roles> GetRole()
        {
            List<Roles> roles;
            using (RSSContext db = new RSSContext())
            {
                roles = db.Roles.ToList();
            }

            return roles;
        }
    }
}
