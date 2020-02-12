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
    public class MeasureController : Controller
    {
        [HttpGet]
        [Route("GetMeasures")]
        public List<Measure> GetMeasures()
        {
            List<Measure> measures;
            using (RSSContext db = new RSSContext())
            {
                measures = db.Measure.ToList();
            }

            return measures;
        }

        [HttpPost]
        [Route("CreateMeasure")]
        public void CreateMeasure([FromBody] Measure newMeasure)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Measure.Add(newMeasure);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateMeasure")]
        public void UpdateMeasure([FromBody] Measure updatedMeasure)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Measure.Update(updatedMeasure);
                db.SaveChanges();
            }
        }

        [HttpDelete]
        [Route("DeleteMeasure")]
        public void DeleteMeasure(Guid idMeasure)
        {
            using (RSSContext db = new RSSContext())
            {
                Measure deletedMeasure = db.Measure.Find(idMeasure);
                db.Measure.Remove(deletedMeasure);
                db.SaveChanges();
            }
        }
    }
}
