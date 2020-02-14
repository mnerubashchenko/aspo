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
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetTelemetry")]
        public List<Telemetry> GetTelemetry()
        {
            return db.Telemetry.Where(p => p.IdTelemetry.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        [HttpPost]
        [Route("CreateTelemetry")]
        public void CreateTelemetry([FromBody] Telemetry newTelemetry)
        {
            db.Telemetry.Add(newTelemetry);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateTelemetry")]
        public void UpdateTelemetry([FromBody] Telemetry updatedTelemetry)
        {
            db.Telemetry.Update(updatedTelemetry);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteTelemetry")]
        public void DeleteRole(Guid idTelemetry)
        {
            db.Telemetry.Remove(db.Telemetry.Find(idTelemetry));
            db.SaveChanges();
        }
    }
}
