using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Mvc;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RolesController : Controller
    {
        [HttpGet]
        [Route("GetRole")]
        public List<Roles> GetRole()
        {
            List<Roles> roles;
            using (RSSContext db = new RSSContext())
            {
                roles = db.Roles.Where(p => p.IdRole.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
            }

            return roles;
        }

        [HttpPost]
        [Route("CreateRole")]
        public void CreateRole([FromBody] Roles role)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Roles.Add(role);
                db.SaveChanges();
            }
        }
    }
}
