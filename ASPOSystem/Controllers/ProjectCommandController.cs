using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Authorization;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectCommandController
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        [HttpGet]
        [Route("GetLinks"), Authorize(Roles = "Администратор")]
        public List<ProjectCommand> GetLinks()
        {
            return db.ProjectCommand.ToList();
        }

        [HttpPost]
        [Route("CreateLink"), Authorize(Roles = "Администратор")]
        public void CreateLink([FromBody] ProjectCommand newLink)
        {
            db.ProjectCommand.Add(newLink);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateLink"), Authorize(Roles = "Администратор")]
        public void UpdateLink([FromBody] ProjectCommand updatedLink)
        {
            db.ProjectCommand.Update(updatedLink);
            db.SaveChanges();
        }

        [HttpDelete("{id}")]
        [Route("DeleteLink"), Authorize(Roles = "Администратор")]
        public void DeleteLink(Guid id)
        {
            db.ProjectCommand.Remove(db.ProjectCommand.Find(id));
            db.SaveChanges();
        }
    }
}
