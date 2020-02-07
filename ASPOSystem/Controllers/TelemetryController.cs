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
    public class TelemetryController
    {
        [HttpGet]
        [Route("GetTelemetry")]
        public List<Telemetry> GetTelemetry()
        {
            List<Telemetry> telemetries;
            using (RSSContext db = new RSSContext())
            {
                telemetries = db.Telemetry.Where(p => p.IdTelemetry.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
            }

            return telemetries;
        }

        [HttpPost]
        [Route("CreateTelemetry")]
        public void CreateTelemetry([FromBody] Telemetry newTelemetry)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Telemetry.Add(newTelemetry);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateTelemetry")]
        public void UpdateTelemetry([FromBody] Telemetry updatedTelemetry)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Telemetry.Update(updatedTelemetry);
                db.SaveChanges();
            }
        }

        [HttpDelete]
        [Route("DeleteTelemetry")]
        public void DeleteRole(Guid idTelemetry)
        {
            using (RSSContext db = new RSSContext())
            {
                Telemetry deletedTelemetry = db.Telemetry.Find(idTelemetry);
                db.Telemetry.Remove(deletedTelemetry);
                db.SaveChanges();
            }
        }
    }
}
