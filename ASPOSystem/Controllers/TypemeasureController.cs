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
    public class TypemeasureController : Controller
    {
        [HttpGet]
        [Route("GetTypemeasure")]
        public List<Typemeasure> GetTypemeasure()
        {
            List<Typemeasure> typesmeasure;
            using (RSSContext db = new RSSContext())
            {
                typesmeasure = db.Typemeasure.Where(p => p.IdTypemeasure.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
            }

            return typesmeasure;
        }

        [HttpPost]
        [Route("CreateTypemeasure")]
        public void CreateTypemeasure([FromBody] Typemeasure newTypemeasure)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Typemeasure.Add(newTypemeasure);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateTypemeasure")]
        public void UpdateTypemeasure([FromBody] Typemeasure updatedTypemeasure)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Typemeasure.Update(updatedTypemeasure);
                db.SaveChanges();
            }
        }

        [HttpDelete]
        [Route("DeleteTypemeasure")]
        public void DeleteTypemeasure(Guid idTypemeasure)
        {
            using (RSSContext db = new RSSContext())
            {
                Typemeasure deletedTypemeasure = db.Typemeasure.Find(idTypemeasure);
                db.Typemeasure.Remove(deletedTypemeasure);
                db.SaveChanges();
            }
        }
    }
}
