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
    [Route("[controller]")]
    public class MeasureController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        [HttpGet]
        [Route("GetMeasures"), Authorize(Roles = "Администратор")]
        public List<Measure> GetMeasures()
        {
            return db.Measure.ToList();
        }

        [HttpGet]
        [Route("GetNamesOfMeasures"), Authorize(Roles = "Администратор")]
        public List<string> GetNamesOfMeasures()
        {
            return db.Measure.Select(item => item.Name).ToList();
        }

        [HttpPost]
        [Route("CreateMeasure"), Authorize(Roles = "Администратор")]
        public void CreateMeasure([FromBody] Measure newMeasure)
        {
            db.Measure.Add(newMeasure);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateMeasure"), Authorize(Roles = "Администратор")]
        public void UpdateMeasure([FromBody] Measure updatedMeasure)
        {
            db.Measure.Update(updatedMeasure);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteMeasure"), Authorize(Roles = "Администратор")]
        public void DeleteMeasure(Guid idMeasure)
        {
            db.Measure.Remove(db.Measure.Find(idMeasure));
            db.SaveChanges();

        }
    }
}
