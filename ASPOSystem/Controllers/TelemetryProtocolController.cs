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
    public class TelemetryProtocolController : Controller
    {
        [HttpGet]
        [Route("GetLinks")]
        public List<TelemetryProtocol> GetLinks()
        {
            List<TelemetryProtocol> links;
            using (RSSContext db = new RSSContext())
            {
                links = db.TelemetryProtocol.ToList();
            }

            return links;
        }

        [HttpPost]
        [Route("CreateLink")]
        public void CreateLink([FromBody] TelemetryProtocol newLink)
        {
            using (RSSContext db = new RSSContext())
            {
                db.TelemetryProtocol.Add(newLink);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateLink")]
        public void UpdateLink([FromBody] TelemetryProtocol updatedLink)
        {
            using (RSSContext db = new RSSContext())
            {
                db.TelemetryProtocol.Update(updatedLink);
                db.SaveChanges();
            }
        }

        [HttpDelete("{id}")]
        [Route("DeleteLink")]
        public void DeleteLink(Guid id)
        {
            using (RSSContext db = new RSSContext())
            {
                TelemetryProtocol deletedLink = db.TelemetryProtocol.Find(id);
                db.TelemetryProtocol.Remove(deletedLink);
                db.SaveChanges();
            }
        }
    }
}
