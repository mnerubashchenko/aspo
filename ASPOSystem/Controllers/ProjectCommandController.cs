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
    public class ProjectCommandController
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        [HttpGet]
        [Route("GetLinks"), Authorize(Roles = "Администратор")]
        public List<ProjectCommand> GetLinks()
        {
            return db.ProjectCommand.ToList();
        }

        [HttpGet]
        [Route("GetLinksForOneProject"), Authorize(Roles = "Администратор, Гость")]
        public List<string> GetLinksForOneProject(string projectName)
        {
            List<Guid?> idCommands = db.ProjectCommand.Where(item => item.IdProject == (db.Project.FirstOrDefault(i => i.NameProject == projectName).Id)).Select(p => p.IdCommand).ToList();

            List<string> namesOfCommands = new List<string>();

            foreach (Guid d in idCommands)
            {
                namesOfCommands.Add(db.Programmcommands.FirstOrDefault(i => i.Id == d).Name);
            }

            return namesOfCommands;
        }

        [HttpPost]
        [Route("CreateLink"), Authorize(Roles = "Администратор")]
        public void CreateLink([FromBody] ProjectCommand newLink)
        {
            db.ProjectCommand.Add(newLink);
            db.SaveChanges();
        }

        [HttpPost]
        [Route("CreateLinkFromAccount"), Authorize(Roles = "Администратор, Гость")]
        public void CreateLinkFromAccount([FromBody] List<string> namesOfCommands)
        {
            Guid idOfProject = db.Project.FirstOrDefault(item => item.DateCreateProject == db.Project.Max(p => p.DateCreateProject)).Id;
            foreach (string noc in namesOfCommands)
            {
                ProjectCommand newLink = new ProjectCommand();
                newLink.IdProject = idOfProject;
                newLink.IdCommand = db.Programmcommands.FirstOrDefault(com => com.Name == noc).Id;
                db.ProjectCommand.Add(newLink);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateLink"), Authorize(Roles = "Администратор")]
        public void UpdateLink([FromBody] ProjectCommand updatedLink)
        {
            db.ProjectCommand.Update(updatedLink);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateLinkFromProjectChanger"), Authorize(Roles = "Администратор, Гость")]
        public void UpdateLinkFromProjectChanger(string projectName, string namesOfCommands)
        {
            List<string> nocs = JsonConvert.DeserializeObject<List<string>>(namesOfCommands);

            Guid idOfProject = db.Project.FirstOrDefault(proj => proj.NameProject == projectName).Id;

            List<ProjectCommand> links = db.ProjectCommand.Where(link => link.IdProject == idOfProject).ToList();

            foreach (ProjectCommand l in links)
            {
                db.ProjectCommand.Remove(l);
                db.SaveChanges();
            }

            foreach (string noc in nocs)
            {
                ProjectCommand Link = new ProjectCommand
                {
                    IdProject = idOfProject,
                    IdCommand = db.Programmcommands.FirstOrDefault(com => com.Name == noc).Id
                };

                db.ProjectCommand.Add(Link);
                db.SaveChanges();
            }
        }

        [HttpDelete("{id}")]
        [Route("DeleteLink"), Authorize(Roles = "Администратор")]
        public void DeleteLink(Guid id)
        {
            db.ProjectCommand.Remove(db.ProjectCommand.Find(id));
            db.SaveChanges();
        }
    }
}
