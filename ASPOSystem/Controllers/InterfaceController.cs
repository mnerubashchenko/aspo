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
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetInterfaces")]
        public List<Interfaces> GetInterfaces()
        {
            return db.Interfaces.ToList();
        }

        [HttpPost]
        [Route("CreateInterface")]
        public void CreateInterface([FromBody] Interfaces newInterface)
        {
            db.Interfaces.Add(newInterface);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateInterface")]
        public void UpdateInterface([FromBody] Interfaces updatedInterface)
        {
            db.Interfaces.Update(updatedInterface);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteInterface")]
        public void DeleteInterface(Guid idInterface)
        {
            db.Interfaces.Remove(db.Interfaces.Find(idInterface));
            db.SaveChanges();
        }
    }
}
