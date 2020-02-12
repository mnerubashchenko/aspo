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
    public class ProtocolController : Controller
    {
        [HttpGet]
        [Route("GetProtocols")]
        public List<Protocol> GetProtocols()
        {
            List<Protocol> protocols;
            using (RSSContext db = new RSSContext())
            {
                protocols = db.Protocol.Where(p => p.IdProtocol.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
            }

            return protocols;
        }

        [HttpPost]
        [Route("CreateProtocol")]
        public void CreateProtocol([FromBody] Protocol newProtocol)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Protocol.Add(newProtocol);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateProtocol")]
        public void UpdateProtocol([FromBody] Protocol updatedProtocol)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Protocol.Update(updatedProtocol);
                db.SaveChanges();
            }
        }

        [HttpDelete]
        [Route("DeleteProtocol")]
        public void DeleteProtocol(Guid idProtocol)
        {
            using (RSSContext db = new RSSContext())
            {
                Protocol deletedProtocol = db.Protocol.Find(idProtocol);
                db.Protocol.Remove(deletedProtocol);
                db.SaveChanges();
            }
        }
    }
}
