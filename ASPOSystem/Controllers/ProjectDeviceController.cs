using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectDeviceController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        [HttpGet]
        [Route("GetLinks"), Authorize(Roles = "Администратор")]
        public List<ProjectDevice> GetLinks()
        {
            return db.ProjectDevice.ToList();
        }

        [HttpGet]
        [Route("GetLinksForOneProject"), Authorize(Roles = "Администратор")]
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
        [Route("CreateLink"), Authorize(Roles = "Администратор")]
        public void CreateLink([FromBody] ProjectDevice newLink)
        {
            db.ProjectDevice.Add(newLink);
            db.SaveChanges();
        }

        [HttpPost]
        [Route("CreateLinkFromAccount"), Authorize(Roles = "Администратор")]
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
        [Route("UpdateLink"), Authorize(Roles = "Администратор")]
        public void UpdateLink([FromBody] ProjectDevice updatedLink)
        {
            db.ProjectDevice.Update(updatedLink);
            db.SaveChanges();
        }

        [HttpDelete("{id}")]
        [Route("DeleteLink"), Authorize(Roles = "Администратор")]
        public void DeleteLink(Guid id)
        {
            db.ProjectDevice.Remove(db.ProjectDevice.Find(id));
            db.SaveChanges();
        }
    }
}
