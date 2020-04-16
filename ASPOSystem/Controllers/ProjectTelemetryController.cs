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
    [Route("controller")]
    public class ProjectTelemetryController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        [HttpGet]
        [Route("GetLinks"), Authorize(Roles = "Администратор")]
        public List<ProjectTelemetry> GetLinks()
        {
            return db.ProjectTelemetry.ToList();
        }

        [HttpPost]
        [Route("CreateLink"), Authorize(Roles = "Администратор")]
        public void CreateLink([FromBody] ProjectTelemetry newLink)
        {
            db.ProjectTelemetry.Add(newLink);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateLink"), Authorize(Roles = "Администратор")]
        public void UpdateLink([FromBody] ProjectTelemetry updatedLink)
        {
            db.ProjectTelemetry.Update(updatedLink);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteLink"), Authorize(Roles = "Администратор")]
        public void DeleteLink(Guid id)
        {
            db.ProjectTelemetry.Remove(db.ProjectTelemetry.Find(id));
            db.SaveChanges();
        }
    }
}
