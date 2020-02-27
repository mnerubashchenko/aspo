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
    [Route("[controller]")]
    public class TelemetryProtocolController : Controller
    {
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetLinks"), Authorize(Roles = "Администратор")]
        public List<TelemetryProtocol> GetLinks()
        {
            return db.TelemetryProtocol.ToList();
        }

        [HttpPost]
        [Route("CreateLink"), Authorize(Roles = "Администратор")]
        public void CreateLink([FromBody] TelemetryProtocol newLink)
        {
            db.TelemetryProtocol.Add(newLink);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateLink"), Authorize(Roles = "Администратор")]
        public void UpdateLink([FromBody] TelemetryProtocol updatedLink)
        {
            db.TelemetryProtocol.Update(updatedLink);
            db.SaveChanges();
        }

        [HttpDelete("{id}"), Authorize(Roles = "Администратор")]
        [Route("DeleteLink")]
        public void DeleteLink(Guid id)
        {
            db.TelemetryProtocol.Remove(db.TelemetryProtocol.Find(id));
            db.SaveChanges();
        }
    }
}
