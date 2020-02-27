using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]"), Authorize(Roles = "Администратор")]
    public class DevicesMeasureController : Controller
    {
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetLinks")]
        public List<DevicesMeasure> GetLinks()
        {
            return db.DevicesMeasure.ToList();
        }

        [HttpPost]
        [Route("CreateLink")]
        public void CreateLink([FromBody] DevicesMeasure newLink)
        {
            db.DevicesMeasure.Add(newLink);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateLink")]
        public void UpdateLink([FromBody] DevicesMeasure updatedLink)
        {
            db.DevicesMeasure.Update(updatedLink);
            db.SaveChanges();
        }

        [HttpDelete("{id}")]
        [Route("DeleteLink")]
        public void DeleteLink(Guid id)
        {
            db.DevicesMeasure.Remove(db.DevicesMeasure.Find(id));
            db.SaveChanges();
        }
    }
}
