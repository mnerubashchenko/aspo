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
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetRole")]
        public List<Roles> GetRole()
        {
            return db.Roles.Where(p => p.IdRole.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        [HttpPost]
        [Route("CreateRole")]
        public void CreateRole([FromBody] Roles newRole)
        {
            db.Roles.Add(newRole);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateRole")]
        public void UpdateRole([FromBody] Roles updatedRole)
        {
            db.Roles.Update(updatedRole);
            db.SaveChanges();

        }

        [HttpDelete]
        [Route("DeleteRole")]
        public void DeleteRole(Guid idRole)
        {
            db.Roles.Remove(db.Roles.Find(idRole));
            db.SaveChanges();
        }

    }
}
