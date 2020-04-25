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
    public class ProjectMeasureController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        [HttpGet]
        [Route("GetLinks"), Authorize(Roles = "Администратор")]
        public List<ProjectMeasure> GetLinks()
        {
            return db.ProjectMeasure.ToList();
        }

        [HttpGet]
        [Route("GetLinksForOneProject"), Authorize(Roles = "Администратор")]
        public List<string> GetLinksForOneProject(string projectName)
        {
            List<Guid?> idMeasures = db.ProjectMeasure.Where(item => item.IdProject == (db.Project.FirstOrDefault(i => i.NameProject == projectName).Id)).Select(p => p.IdMeasure).ToList();

            List<string> namesOfMeasures = new List<string>();

            foreach (Guid d in idMeasures)
            {
                namesOfMeasures.Add(db.Measure.FirstOrDefault(i => i.Id == d).Name);
            }

            return namesOfMeasures;
        }

        [HttpPost]
        [Route("CreateLink"), Authorize(Roles = "Администратор")]
        public void CreateLink([FromBody] ProjectMeasure newLink)
        {
            db.ProjectMeasure.Add(newLink);
            db.SaveChanges();
        }

        [HttpPost]
        [Route("CreateLinkFromAccount"), Authorize(Roles = "Администратор")]
        public void CreateLinkFromAccount([FromBody] List<string> namesOfMeasures)
        {
            Guid idOfProject = db.Project.FirstOrDefault(item => item.DateCreateProject == db.Project.Max(p=>p.DateCreateProject)).Id;
            foreach (string nom in namesOfMeasures)
            {
                ProjectMeasure newLink = new ProjectMeasure();
                newLink.IdProject = idOfProject;
                newLink.IdMeasure = db.Measure.FirstOrDefault(meas => meas.Name == nom).Id;
                db.ProjectMeasure.Add(newLink);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateLink"), Authorize(Roles = "Администратор")]
        public void UpdateLink([FromBody] ProjectMeasure updatedLink)
        {
            db.ProjectMeasure.Update(updatedLink);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateLinkFromProjectChanger")]
        public void UpdateLinkFromProjectChanger(string projectName, string namesOfMeasures)
        {
            List<string> noms = JsonConvert.DeserializeObject<List<string>>(namesOfMeasures);

            Guid idOfProject = db.Project.FirstOrDefault(proj => proj.NameProject == projectName).Id;

            List<ProjectMeasure> links = db.ProjectMeasure.Where(link => link.IdProject == idOfProject).ToList();

            foreach (ProjectMeasure l in links)
            {
                db.ProjectMeasure.Remove(l);
                db.SaveChanges();
            }

            foreach (string nom in noms)
            {
                ProjectMeasure Link = new ProjectMeasure
                {
                    IdProject = idOfProject,
                    IdMeasure = db.Measure.FirstOrDefault(meas => meas.Name == nom).Id
                };

                db.ProjectMeasure.Add(Link);
                db.SaveChanges();
            }
        }

        [HttpDelete("{id}")]
        [Route("DeleteLink"), Authorize(Roles = "Администратор")]
        public void DeleteLink(Guid id)
        {
            db.ProjectMeasure.Remove(db.ProjectMeasure.Find(id));
            db.SaveChanges();
        }

    }
}
