using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Mvc;

namespace ASPOSystem.Controllers
{
    [Route("api/[controller]")]
    public class TelemetryController
    {
        [HttpGet("[action]")]
        public List<Telemetry> GetTelemetry()
        {
            List<Telemetry> telemetries;
            using (RSSContext db = new RSSContext())
            {
                telemetries = db.Telemetry.Where(p => p.IdTelemetry.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
            }

            return telemetries;
        }
    }
}
