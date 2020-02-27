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
    [Route("[controller]"), Authorize(Roles = "Администратор")]
    public class ProjectsController : Controller
    {
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetProjects")]
        public List<Project> GetProjects()
        {
            return db.Project.ToList();
        }

        [HttpPost]
        [Route("CreateProject")]
        public void CreateProject([FromBody] Project newProject)
        {
            db.Project.Add(newProject);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateProject")]
        public void UpdateProject([FromBody] Project updatedProject)
        {
            db.Project.Update(updatedProject);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteProject")]
        public void DeleteProject(Guid idProject)
        {
            db.Project.Remove(db.Project.Find(idProject));
            db.SaveChanges();
        }
    }
}
