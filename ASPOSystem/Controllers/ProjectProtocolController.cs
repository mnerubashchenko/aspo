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
    public class ProjectProtocolController : Controller
    {
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetProjProtLinks"), Authorize(Roles = "Администратор")]
        public List<ProjectProtocol> GetProjProtLinks()
        {
            return db.ProjectProtocol.ToList();
        }

        [HttpPost]
        [Route("CreateProjProtLink"), Authorize(Roles = "Администратор")]
        public void CreateProjProtLink([FromBody] ProjectProtocol newLink)
        {
            db.ProjectProtocol.Add(newLink);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateProjProtLink"), Authorize(Roles = "Администратор")]
        public void UpdateProjProtLink([FromBody] ProjectProtocol updatedLink)
        {
            db.ProjectProtocol.Update(updatedLink);
            db.SaveChanges();
        }

        [HttpDelete("{id}"), Authorize(Roles = "Администратор")]
        [Route("DeleteProjProtLink")]
        public void DeleteProjProtLink(Guid id)
        {
            db.ProjectProtocol.Remove(db.ProjectProtocol.Find(id));
            db.SaveChanges();
        }
    }
}
