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
        public void CreateTelemetry([FromBody] Telemetry telemetry)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Telemetry.Add(telemetry);
                db.SaveChanges();
            }
        }
    }
}
