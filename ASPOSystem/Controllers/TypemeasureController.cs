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
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetTypemeasure")]
        public List<Typemeasure> GetTypemeasure()
        {
            return db.Typemeasure.Where(p => p.IdTypemeasure.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        [HttpPost]
        [Route("CreateTypemeasure")]
        public void CreateTypemeasure([FromBody] Typemeasure newTypemeasure)
        {
            db.Typemeasure.Add(newTypemeasure);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateTypemeasure")]
        public void UpdateTypemeasure([FromBody] Typemeasure updatedTypemeasure)
        {
            db.Typemeasure.Update(updatedTypemeasure);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteTypemeasure")]
        public void DeleteTypemeasure(Guid idTypemeasure)
        {
            db.Typemeasure.Remove(db.Typemeasure.Find(idTypemeasure));
            db.SaveChanges();
        }
    }
}
