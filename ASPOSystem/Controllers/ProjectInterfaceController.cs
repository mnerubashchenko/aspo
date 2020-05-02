using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectInterfaceController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        [HttpGet]
        [Route("GetLinksForOneProject"), Authorize(Roles = "Администратор, Гость")]
        public List<string> GetLinksForOneProject(string projectName)
        {
            List<Guid?> idInterfaces = db.ProjectInterface.Where(item => item.IdProject == (db.Project.FirstOrDefault(i => i.NameProject == projectName).Id)).Select(p => p.IdInterface).ToList();

            List<string> namesOfInterfaces = new List<string>();

            foreach (Guid d in idInterfaces)
            {
                namesOfInterfaces.Add(db.Interfaces.FirstOrDefault(i => i.Id == d).Name);
            }

            return namesOfInterfaces;
        }

        [HttpPost]
        [Route("CreateLinkFromAccount"), Authorize(Roles = "Администратор, Гость")]
        public void CreateLinkFromAccount([FromBody] List<string> namesOfInterfaces)
        {
            Guid idOfProject = db.Project.FirstOrDefault(item => item.DateCreateProject == db.Project.Max(p => p.DateCreateProject)).Id;
            foreach (string noi in namesOfInterfaces)
            {
                ProjectInterface newLink = new ProjectInterface();
                newLink.IdProject = idOfProject;
                newLink.IdInterface = db.Interfaces.FirstOrDefault(inter => inter.Name == noi).Id;
                db.ProjectInterface.Add(newLink);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateLinkFromProjectChanger"), Authorize(Roles = "Администратор, Гость")]
        public void UpdateLinkFromProjectChanger(string projectName, string namesOfInterfaces)
        {
            List<string> nois = JsonConvert.DeserializeObject<List<string>>(namesOfInterfaces);

            Guid idOfProject = db.Project.FirstOrDefault(proj => proj.NameProject == projectName).Id;

            List<ProjectInterface> links = db.ProjectInterface.Where(link => link.IdProject == idOfProject).ToList();

            foreach (ProjectInterface l in links)
            {
                db.ProjectInterface.Remove(l);
                db.SaveChanges();
            }

            foreach (string noi in nois)
            {
                ProjectInterface Link = new ProjectInterface
                {
                    IdProject = idOfProject,
                    IdInterface = db.Interfaces.FirstOrDefault(inter => inter.Name == noi).Id
                };

                db.ProjectInterface.Add(Link);
                db.SaveChanges();
            }
        }
    }
}
