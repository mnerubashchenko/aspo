using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using System.IO;
using ASPOSystem.DBModels;
using System.Collections;
using Newtonsoft.Json;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JSONMakerController : Controller
    {
        RSSForVKRContext db = new RSSForVKRContext(); 

        [HttpPost]
        [Route("ConfigMaker")]
        public void ConfigMaker (string telname, string commandname)
        {
            var options = new JsonSerializerOptions
            {
                WriteIndented = true
            };

            using (StreamWriter sw = new StreamWriter("testjson.json", false, System.Text.Encoding.UTF8))
            {
                var telemetries = db.Telemetry.Where(p => p.LongName == telname);
                var programmcommands = db.Programmcommands.Where(p => p.Name == commandname);
                var json = JsonConvert.SerializeObject(new JsonModel { Telemetry = telemetries.ToList(), Programmcommand = programmcommands.ToList()}, Formatting.Indented);
                sw.WriteLine(json);
            }
        }
    }
}
