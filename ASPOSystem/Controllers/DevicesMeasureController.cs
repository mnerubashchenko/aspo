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
    public class DevicesMeasureController : Controller
    {
        [HttpGet]
        [Route("GetLinks")]
        public List<DevicesMeasure> GetLinks()
        {
            List<DevicesMeasure> links;
            using (RSSContext db = new RSSContext())
            {
                links = db.DevicesMeasure.ToList();
            }

            return links;
        }

        [HttpPost]
        [Route("CreateLink")]
        public void CreateLink([FromBody] DevicesMeasure newLink)
        {
            using (RSSContext db = new RSSContext())
            {
                db.DevicesMeasure.Add(newLink);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateLink")]
        public void UpdateLink([FromBody] DevicesMeasure updatedLink)
        {
            using (RSSContext db = new RSSContext())
            {
                db.DevicesMeasure.Update(updatedLink);
                db.SaveChanges();
            }
        }

        [HttpDelete("{id}")]
        [Route("DeleteLink")]
        public void DeleteLink(Guid id)
        {
            using (RSSContext db = new RSSContext())
            {
                DevicesMeasure deletedLink = db.DevicesMeasure.Find(id);
                db.DevicesMeasure.Remove(deletedLink);
                db.SaveChanges();
            }
        }
    }
}
