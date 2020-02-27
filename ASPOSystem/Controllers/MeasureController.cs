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
    public class MeasureController : Controller
    {
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetMeasures")]
        public List<Measure> GetMeasures()
        {
            return db.Measure.ToList();
        }

        [HttpPost]
        [Route("CreateMeasure")]
        public void CreateMeasure([FromBody] Measure newMeasure)
        {
            db.Measure.Add(newMeasure);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateMeasure")]
        public void UpdateMeasure([FromBody] Measure updatedMeasure)
        {
            db.Measure.Update(updatedMeasure);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteMeasure")]
        public void DeleteMeasure(Guid idMeasure)
        {
            db.Measure.Remove(db.Measure.Find(idMeasure));
            db.SaveChanges();

        }
    }
}
