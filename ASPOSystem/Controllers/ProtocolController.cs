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
    public class ProtocolController : Controller
    {
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetProtocols")]
        public List<Protocol> GetProtocols()
        {
            return db.Protocol.Where(p => p.IdProtocol.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        [HttpPost]
        [Route("CreateProtocol")]
        public void CreateProtocol([FromBody] Protocol newProtocol)
        {
            db.Protocol.Add(newProtocol);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateProtocol")]
        public void UpdateProtocol([FromBody] Protocol updatedProtocol)
        {
            db.Protocol.Update(updatedProtocol);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteProtocol")]
        public void DeleteProtocol(Guid idProtocol)
        {
            db.Protocol.Remove(db.Protocol.Find(idProtocol));
            db.SaveChanges();
        }
    }
}
