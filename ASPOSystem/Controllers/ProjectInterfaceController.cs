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
    [Route("controller")]
    public class ProjectInterfaceController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        [HttpGet]
        [Route("GetLinks"), Authorize(Roles = "Администратор")]
        public List<ProjectInterface> GetLinks()
        {
            return db.ProjectInterface.ToList();
        }

        [HttpPost]
        [Route("CreateLink"), Authorize(Roles = "Администратор")]
        public void CreateLink([FromBody] ProjectInterface newLink)
        {
            db.ProjectInterface.Add(newLink);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateLink"), Authorize(Roles = "Администратор")]
        public void UpdateLink([FromBody] ProjectInterface updatedLink)
        {
            db.ProjectInterface.Update(updatedLink);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteLink"), Authorize(Roles = "Администратор")]
        public void DeleteLink(Guid id)
        {
            db.ProjectInterface.Remove(db.ProjectInterface.Find(id));
            db.SaveChanges();
        }
    }
}
