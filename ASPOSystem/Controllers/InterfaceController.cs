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
    public class InterfaceController : Controller
    {
        [HttpGet]
        [Route("GetInterfaces")]
        public List<Interfaces> GetInterfaces()
        {
            List<Interfaces> interfaces;
            using (RSSContext db = new RSSContext())
            {
                interfaces = db.Interfaces.ToList();
            }

            return interfaces;
        }

        [HttpPost]
        [Route("CreateInterface")]
        public void CreateInterface([FromBody] Interfaces newInterface)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Interfaces.Add(newInterface);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateInterface")]
        public void UpdateInterface([FromBody] Interfaces updatedInterface)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Interfaces.Update(updatedInterface);
                db.SaveChanges();
            }
        }

        [HttpDelete]
        [Route("DeleteInterface")]
        public void DeleteInterface(Guid idInterface)
        {
            using (RSSContext db = new RSSContext())
            {
                Interfaces deletedInterface = db.Interfaces.Find(idInterface);
                db.Interfaces.Remove(deletedInterface);
                db.SaveChanges();
            }
        }
    }
}
