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
    public class MeasureProtocolController : Controller
    {
        [HttpGet]
        [Route("GetLinks")]
        public List<MeasureProtocol> GetLinks()
        {
            List<MeasureProtocol> links;
            using (RSSContext db = new RSSContext())
            {
                links = db.MeasureProtocol.ToList();
            }

            return links;
        }

        [HttpPost]
        [Route("CreateLink")]
        public void CreateLink([FromBody] MeasureProtocol newLink)
        {
            using (RSSContext db = new RSSContext())
            {
                db.MeasureProtocol.Add(newLink);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateLink")]
        public void UpdateLink([FromBody] MeasureProtocol updatedLink)
        {
            using (RSSContext db = new RSSContext())
            {
                db.MeasureProtocol.Update(updatedLink);
                db.SaveChanges();
            }
        }

        [HttpDelete("{id}")]
        [Route("DeleteLink")]
        public void DeleteLink(Guid id)
        {
            using (RSSContext db = new RSSContext())
            {
                MeasureProtocol deletedLink = db.MeasureProtocol.Find(id);
                db.MeasureProtocol.Remove(deletedLink);
                db.SaveChanges();
            }
        }
    }
}
