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
    public class MeasureProtocolController : Controller
    {
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetLinks")]
        public List<MeasureProtocol> GetLinks()
        {
            return db.MeasureProtocol.ToList();
        }

        [HttpPost]
        [Route("CreateLink")]
        public void CreateLink([FromBody] MeasureProtocol newLink)
        {
            db.MeasureProtocol.Add(newLink);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateLink")]
        public void UpdateLink([FromBody] MeasureProtocol updatedLink)
        {
            db.MeasureProtocol.Update(updatedLink);
            db.SaveChanges();
        }

        [HttpDelete("{id}")]
        [Route("DeleteLink")]
        public void DeleteLink(Guid id)
        {
            db.MeasureProtocol.Remove(db.MeasureProtocol.Find(id));
            db.SaveChanges();
        }
    }
}
