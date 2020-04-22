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
    public class ProjectsController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        [HttpGet]
        [Route("GetProjects"), Authorize(Roles = "Администратор, Гость")]
        public List<Project> GetProjects()
        {
            return db.Project.ToList();
        }

        [HttpGet]
        [Route("GetNamesOfProjects"), Authorize(Roles = "Администратор, Гость")]
        public List<string> GetNamesOfProjects()
        {
            return db.Project.Select(item => item.NameProject).ToList();
        }

        [HttpGet]
        [Route("GetPersonalProjects"), Authorize(Roles = "Администратор, Гость")]
        public List<Project> GetPersonalProjects(string author)
        {
            return db.Project.Where(p => p.DirectorProject == db.Users.FirstOrDefault(r => r.LoginUser == author).Id).ToList();
        }

        [HttpPost]
        [Route("CreateProject"), Authorize(Roles = "Администратор, Гость")]
        public void CreateProject([FromBody] Project newProject)
        {
            newProject.DateCreateProject = DateTime.Now;
            db.Project.Add(newProject);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateProject"), Authorize(Roles = "Администратор, Гость")]
        public void UpdateProject([FromBody] Project updatedProject)
        {
            db.Project.Update(updatedProject);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteProject"), Authorize(Roles = "Администратор, Гость")]
        public void DeleteProject(Guid idProject)
        {
            db.Project.Remove(db.Project.Find(idProject));
            db.SaveChanges();
        }
    }
}
