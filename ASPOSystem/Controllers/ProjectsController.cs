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
    public class ProjectsController : Controller
    {
        [HttpGet]
        [Route("GetProjects")]
        public List<Project> GetProjects()
        {
            List<Project> projects;
            using (RSSContext db = new RSSContext())
            {
                projects = db.Project.ToList();
            }

            return projects;
        }

        [HttpPost]
        [Route("CreateProject")]
        public void CreateProject([FromBody] Project newProject)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Project.Add(newProject);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateProject")]
        public void UpdateProject([FromBody] Project updatedProject)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Project.Update(updatedProject);
                db.SaveChanges();
            }
        }

        [HttpDelete]
        [Route("DeleteProject")]
        public void DeleteProject(Guid idProject)
        {
            using (RSSContext db = new RSSContext())
            {
                Project deletedProject = db.Project.Find(idProject);
                db.Project.Remove(deletedProject);
                db.SaveChanges();
            }
        }
    }
}
