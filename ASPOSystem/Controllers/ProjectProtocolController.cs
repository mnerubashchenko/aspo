using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Mvc;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectProtocolController : Controller
    {
        [HttpGet]
        [Route("GetProjProtLinks")]
        public List<ProjectProtocol> GetProjProtLinks()
        {
            List<ProjectProtocol> links;
            using (RSSContext db = new RSSContext())
            {
                links = db.ProjectProtocol.ToList();
            }

            return links;
        }

        [HttpPost]
        [Route("CreateProjProtLink")]
        public void CreateProjProtLink([FromBody] ProjectProtocol newLink)
        {
            using (RSSContext db = new RSSContext())
            {
                db.ProjectProtocol.Add(newLink);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateProjProtLink")]
        public void UpdateProjProtLink([FromBody] ProjectProtocol updatedLink)
        {
            using (RSSContext db = new RSSContext())
            {
                db.ProjectProtocol.Update(updatedLink);
                db.SaveChanges();
            }
        }

        [HttpDelete("{id}")]
        [Route("DeleteProjProtLink")]
        public void DeleteProjProtLink(Guid id)
        {
            using (RSSContext db = new RSSContext())
            {
                ProjectProtocol deletedLink = db.ProjectProtocol.Find(id);
                db.ProjectProtocol.Remove(deletedLink);
                db.SaveChanges();
            }
        }
    }
}
