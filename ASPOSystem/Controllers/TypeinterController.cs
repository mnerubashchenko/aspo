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
        [HttpGet]
        [Route("GetTypeinter")]
        public List<Typeinter> GetTypeinter()
        {
            List<Typeinter> typesinter;
            using (RSSContext db = new RSSContext())
            {
                typesinter = db.Typeinter.Where(p => p.IdTypeinter.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
            }

            return typesinter;
        }

        [HttpPost]
        [Route("CreateTypeinter")]
        public void CreateTypeinter([FromBody] Typeinter newTypeinter)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Typeinter.Add(newTypeinter);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateTypeinter")]
        public void UpdateTypeinter([FromBody] Typeinter updatedTypeinter)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Typeinter.Update(updatedTypeinter);
                db.SaveChanges();
            }
        }

        [HttpDelete]
        [Route("DeleteTypeinter")]
        public void DeleteTypeinter(Guid idTypeinter)
        {
            using (RSSContext db = new RSSContext())
            {
                Typeinter deletedTypeinter = db.Typeinter.Find(idTypeinter);
                db.Typeinter.Remove(deletedTypeinter);
                db.SaveChanges();
            }
        }
    }
}
