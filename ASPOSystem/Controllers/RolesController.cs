using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RolesController : Controller
    {
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetRole"), Authorize(Roles = "Администратор")]
        public List<Roles> GetRole()
        {
            return db.Roles.Where(p => p.IdRole.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        [HttpPost]
        [Route("CreateRole"), Authorize(Roles = "Администратор")]
        public void CreateRole([FromBody] Roles newRole)
        {
            db.Roles.Add(newRole);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateRole"), Authorize(Roles = "Администратор")]
        public void UpdateRole([FromBody] Roles updatedRole)
        {
            db.Roles.Update(updatedRole);
            db.SaveChanges();

        }

        [HttpDelete]
        [Route("DeleteRole"), Authorize(Roles = "Администратор")]
        public void DeleteRole(Guid idRole)
        {
            db.Roles.Remove(db.Roles.Find(idRole));
            db.SaveChanges();
        }

    }
}
