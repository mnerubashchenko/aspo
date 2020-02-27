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
    public class CommandsProtocolController : Controller
    {
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetLinks"), Authorize(Roles = "Администратор")]
        public List<PrcommandsProtocol> GetLinks()
        {
            return db.PrcommandsProtocol.ToList();
        }

        [HttpPost]
        [Route("CreateLink"), Authorize(Roles = "Администратор")]
        public void CreateLink([FromBody] PrcommandsProtocol newLink)
        {
            db.PrcommandsProtocol.Add(newLink);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateLink"), Authorize(Roles = "Администратор")]
        public void UpdateLink([FromBody] PrcommandsProtocol updatedLink)
        {
            db.PrcommandsProtocol.Update(updatedLink);
            db.SaveChanges();

        }

        [HttpDelete("{id}"), Authorize(Roles = "Администратор")]
        [Route("DeleteLink")]
        public void DeleteLink(Guid id)
        {
            db.PrcommandsProtocol.Remove(db.PrcommandsProtocol.Find(id));
            db.SaveChanges();
        }
    }
}
