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
    public class CommandsProtocolController : Controller
    {
        [HttpGet]
        [Route("GetLinks")]
        public List<PrcommandsProtocol> GetLinks()
        {
            List<PrcommandsProtocol> links;
            using (RSSContext db = new RSSContext())
            {
                links = db.PrcommandsProtocol.ToList();
            }

            return links;
        }

        [HttpPost]
        [Route("CreateLink")]
        public void CreateLink([FromBody] PrcommandsProtocol newLink)
        {
            using (RSSContext db = new RSSContext())
            {
                db.PrcommandsProtocol.Add(newLink);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateLink")]
        public void UpdateLink([FromBody] PrcommandsProtocol updatedLink)
        {
            using (RSSContext db = new RSSContext())
            {
                db.PrcommandsProtocol.Update(updatedLink);
                db.SaveChanges();
            }
        }

        [HttpDelete("{id}")]
        [Route("DeleteLink")]
        public void DeleteLink(Guid id)
        {
            using (RSSContext db = new RSSContext())
            {
                PrcommandsProtocol deletedLink = db.PrcommandsProtocol.Find(id);
                db.PrcommandsProtocol.Remove(deletedLink);
                db.SaveChanges();
            }
        }
    }
}
