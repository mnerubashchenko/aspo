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
    public class CommandsProtocolController : Controller
    {
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetLinks")]
        public List<PrcommandsProtocol> GetLinks()
        {
            return db.PrcommandsProtocol.ToList();
        }

        [HttpPost]
        [Route("CreateLink")]
        public void CreateLink([FromBody] PrcommandsProtocol newLink)
        {
            db.PrcommandsProtocol.Add(newLink);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateLink")]
        public void UpdateLink([FromBody] PrcommandsProtocol updatedLink)
        {
            db.PrcommandsProtocol.Update(updatedLink);
            db.SaveChanges();

        }

        [HttpDelete("{id}")]
        [Route("DeleteLink")]
        public void DeleteLink(Guid id)
        {
            db.PrcommandsProtocol.Remove(db.PrcommandsProtocol.Find(id));
            db.SaveChanges();
        }
    }
}
