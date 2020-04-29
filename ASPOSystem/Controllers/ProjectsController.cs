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
        [Route("GetOneProject"), Authorize(Roles = "Администратор, Гость")]
        public Project GetOneProject(string projectName)
        {
            return db.Project.FirstOrDefault(r => r.NameProject == projectName);
        }

        [HttpGet]
        [Route("GetPersonalProjects"), Authorize(Roles = "Администратор, Гость")]
        public List<Project> GetPersonalProjects(string author)
        {
            return db.Project.Where(p => p.DirectorProject == db.Users.FirstOrDefault(r => r.LoginUser == author).Id).ToList();
        }

        [HttpPost]
        [Route("CreateProject"), Authorize(Roles = "Администратор, Гость")]
        public IActionResult CreateProject([FromBody] Project newProject)
        {
            if (db.Project.Any(i => i.NameProject == newProject.NameProject))
                return BadRequest("Проект с таким названием уже существует!");
            else if (newProject.NameProject == "")
                return BadRequest("Вы не ввели название проекта!");
            else
            {
                newProject.DateCreateProject = DateTime.Now;
                db.Project.Add(newProject);
                db.SaveChanges();

                return Ok();
            }
        }

        [HttpPut]
        [Route("UpdateProject"), Authorize(Roles = "Администратор, Гость")]
        public void UpdateProject([FromBody] Project updatedProject)
        {
            db.Project.Update(updatedProject);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateProjectFromProjectChanger")]
        public IActionResult UpdateProjectFromProjectChanger(string projectId, string newProjectName, string newProjectDescription)
        {
            Project updatedProject = db.Project.FirstOrDefault(proj => proj.Id.ToString() == projectId);

            List<string> namesOfProjects = db.Project.Select(item => item.NameProject).ToList();

            if ((updatedProject.NameProject == newProjectName) || (!namesOfProjects.Contains(newProjectName)))
            {
                updatedProject.NameProject = newProjectName;
                updatedProject.DescriptionProject = newProjectDescription;

                db.Project.Update(updatedProject);
                db.SaveChanges();
                return Ok();
            }

            else
                return BadRequest("Проект с таким названием уже существует!");

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
