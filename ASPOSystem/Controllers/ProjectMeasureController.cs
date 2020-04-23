﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Authorization;

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

        [HttpDelete("{id}")]
        [Route("DeleteLink"), Authorize(Roles = "Администратор")]
        public void DeleteLink(Guid id)
        {
            db.ProjectMeasure.Remove(db.ProjectMeasure.Find(id));
            db.SaveChanges();
        }

    }
}
