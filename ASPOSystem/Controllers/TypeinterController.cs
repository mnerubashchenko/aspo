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
    public class TypeinterController : Controller
    {
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetTypeinter")]
        public List<Typeinter> GetTypeinter()
        {
            return db.Typeinter.Where(p => p.IdTypeinter.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        [HttpPost]
        [Route("CreateTypeinter")]
        public void CreateTypeinter([FromBody] Typeinter newTypeinter)
        {
            db.Typeinter.Add(newTypeinter);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateTypeinter")]
        public void UpdateTypeinter([FromBody] Typeinter updatedTypeinter)
        {
            db.Typeinter.Update(updatedTypeinter);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteTypeinter")]
        public void DeleteTypeinter(Guid idTypeinter)
        {
            db.Typeinter.Remove(db.Typeinter.Find(idTypeinter));
            db.SaveChanges();
        }
    }
}
