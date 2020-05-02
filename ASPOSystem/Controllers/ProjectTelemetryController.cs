using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectTelemetryController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        [HttpGet]
        [Route("GetLinks"), Authorize(Roles = "Администратор")]
        public List<ProjectTelemetry> GetLinks()
        {
            return db.ProjectTelemetry.ToList();
        }

        [HttpGet]
        [Route("GetLinksForOneProject"), Authorize(Roles = "Администратор, Гость")]
        public List<string> GetLinksForOneProject(string projectName)
        {
            List<Guid?> idTelemetries = db.ProjectTelemetry.Where(item => item.IdProject == (db.Project.FirstOrDefault(i => i.NameProject == projectName).Id)).Select(p => p.IdTelemetry).ToList();

            List<string> namesOfTelemetries = new List<string>();

            foreach (Guid d in idTelemetries)
            {
                namesOfTelemetries.Add(db.Telemetry.FirstOrDefault(i => i.Id == d).ShortName);
            }

            return namesOfTelemetries;
        }

        [HttpPost]
        [Route("CreateLink"), Authorize(Roles = "Администратор")]
        public void CreateLink([FromBody] ProjectTelemetry newLink)
        {
            db.ProjectTelemetry.Add(newLink);
            db.SaveChanges();
        }

        [HttpPost]
        [Route("CreateLinkFromAccount"), Authorize(Roles = "Администратор, Гость")]
        public void CreateLinkFromAccount([FromBody] List<string> namesOfTelemetries)
        {
            Guid idOfProject = db.Project.FirstOrDefault(item => item.DateCreateProject == db.Project.Max(p => p.DateCreateProject)).Id;
            foreach (string not in namesOfTelemetries)
            {
                ProjectTelemetry newLink = new ProjectTelemetry();
                newLink.IdProject = idOfProject;
                newLink.IdTelemetry = db.Telemetry.FirstOrDefault(com => com.ShortName == not).Id;
                db.ProjectTelemetry.Add(newLink);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateLink"), Authorize(Roles = "Администратор")]
        public void UpdateLink([FromBody] ProjectTelemetry updatedLink)
        {
            db.ProjectTelemetry.Update(updatedLink);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateLinkFromProjectChanger"), Authorize(Roles = "Администратор, Гость")]
        public void UpdateLinkFromProjectChanger(string projectName, string namesOfTelemetries)
        {
            List<string> nots = JsonConvert.DeserializeObject<List<string>>(namesOfTelemetries);

            Guid idOfProject = db.Project.FirstOrDefault(proj => proj.NameProject == projectName).Id;

            List<ProjectTelemetry> links = db.ProjectTelemetry.Where(link => link.IdProject == idOfProject).ToList();

            foreach (ProjectTelemetry l in links)
            {
                db.ProjectTelemetry.Remove(l);
                db.SaveChanges();
            }

            foreach (string not in nots)
            {
                ProjectTelemetry Link = new ProjectTelemetry
                {
                    IdProject = idOfProject,
                    IdTelemetry = db.Telemetry.FirstOrDefault(tel => tel.ShortName == not).Id
                };

                db.ProjectTelemetry.Add(Link);
                db.SaveChanges();
            }
        }

        [HttpDelete("{id}")]
        [Route("DeleteLink"), Authorize(Roles = "Администратор")]
        public void DeleteLink(Guid id)
        {
            db.ProjectTelemetry.Remove(db.ProjectTelemetry.Find(id));
            db.SaveChanges();
        }
    }
}
