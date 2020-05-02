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
    public class ProjectDeviceController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        [HttpGet]
        [Route("GetLinksForOneProject"), Authorize(Roles = "Администратор, Гость")]
        public List<string> GetLinksForOneProject(string projectName)
        {
            List<Guid?> idDevices = db.ProjectDevice.Where(item=>item.IdProject == (db.Project.FirstOrDefault(i=>i.NameProject == projectName).Id)).Select(p=>p.IdDevice).ToList();
           
            List<string> namesOfDevices = new List<string>();
            
            foreach (Guid d in idDevices)
            {
                namesOfDevices.Add(db.Devices.FirstOrDefault(i=>i.Id == d).Model);
            }

            return namesOfDevices;
        }

        [HttpPost]
        [Route("CreateLinkFromAccount"), Authorize(Roles = "Администратор, Гость")]
        public void CreateLinkFromAccount([FromBody] List<string> namesOfDevices)
        {
            Guid idOfProject = db.Project.FirstOrDefault(item => item.DateCreateProject == db.Project.Max(p => p.DateCreateProject)).Id;
            foreach (string nod in namesOfDevices)
            {
                ProjectDevice newLink = new ProjectDevice();
                newLink.IdProject = idOfProject;
                newLink.IdDevice = db.Devices.FirstOrDefault(dev => dev.Model == nod).Id;
                db.ProjectDevice.Add(newLink);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateLinkFromProjectChanger"), Authorize(Roles = "Администратор, Гость")]
        public void UpdateLinkFromProjectChanger(string projectName, string namesOfDevices)
        {
            List<string> nods = JsonConvert.DeserializeObject<List<string>>(namesOfDevices);

            Guid idOfProject = db.Project.FirstOrDefault(proj => proj.NameProject == projectName).Id;

            List<ProjectDevice> links = db.ProjectDevice.Where(link => link.IdProject == idOfProject).ToList();

            foreach (ProjectDevice l in links)
            {
                db.ProjectDevice.Remove(l);
                db.SaveChanges();
            }

            foreach (string nod in nods)
            {
                ProjectDevice Link = new ProjectDevice
                {
                    IdProject = idOfProject,
                    IdDevice = db.Devices.FirstOrDefault(dev => dev.Model == nod).Id
                };

                db.ProjectDevice.Add(Link);
                db.SaveChanges();
            }
        }
    }
}
