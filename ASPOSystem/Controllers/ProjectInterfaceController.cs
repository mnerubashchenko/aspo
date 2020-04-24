﻿using System;
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
    public class ProjectInterfaceController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        [HttpGet]
        [Route("GetLinks"), Authorize(Roles = "Администратор")]
        public List<ProjectInterface> GetLinks()
        {
            return db.ProjectInterface.ToList();
        }

        [HttpGet]
        [Route("GetLinksForOneProject"), Authorize(Roles = "Администратор")]
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
        [Route("CreateLink"), Authorize(Roles = "Администратор")]
        public void CreateLink([FromBody] ProjectInterface newLink)
        {
            db.ProjectInterface.Add(newLink);
            db.SaveChanges();
        }

        [HttpPost]
        [Route("CreateLinkFromAccount"), Authorize(Roles = "Администратор")]
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
        [Route("UpdateLink"), Authorize(Roles = "Администратор")]
        public void UpdateLink([FromBody] ProjectInterface updatedLink)
        {
            db.ProjectInterface.Update(updatedLink);
            db.SaveChanges();
        }

        [HttpDelete("{id}")]
        [Route("DeleteLink"), Authorize(Roles = "Администратор")]
        public void DeleteLink(Guid id)
        {
            db.ProjectInterface.Remove(db.ProjectInterface.Find(id));
            db.SaveChanges();
        }
    }
}
