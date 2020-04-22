using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using ASPOSystem.DBModels;
using System.Collections;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JSONMakerController : Controller
    {
        RSSForVKRContext db = new RSSForVKRContext(); 

        [HttpPost]
        [Route("ConfigMaker")]
        public object ConfigMaker (string nameProject)
        {
            Guid idProject = db.Project.FirstOrDefault(p => p.NameProject == nameProject).Id;

            List<Measure> measures = new List<Measure>();

            List<Devices> devices = new List<Devices>();

            List<Interfaces> interfaces = new List<Interfaces>();

            List<Programmcommands> commands = new List<Programmcommands>();

            List<Telemetry> telemetries = new List<Telemetry>();

            var measuresId = db.ProjectMeasure.Where(p => p.IdProject == idProject).Select(item=>item.IdMeasure).ToList();

            foreach (Guid mi in measuresId)
            {
                measures.Add(db.Measure.FirstOrDefault(p => p.Id == mi));
            }

            var devicesId = db.ProjectDevice.Where(p => p.IdProject == idProject).Select(item => item.IdDevice).ToList();

            foreach (Guid di in devicesId)
            {
                devices.Add(db.Devices.FirstOrDefault(p => p.Id == di));
            }

            var interfacesId = db.ProjectInterface.Where(p => p.IdProject == idProject).Select(item => item.IdInterface).ToList();

            foreach (Guid ii in interfacesId)
            {
                interfaces.Add(db.Interfaces.FirstOrDefault(p => p.Id == ii));
            }

            var commandsId = db.ProjectCommand.Where(p => p.IdProject == idProject).Select(item => item.IdCommand).ToList();

            foreach (Guid ci in commandsId)
            {
                commands.Add(db.Programmcommands.FirstOrDefault(p => p.Id == ci));
            }

            var telemetriesId = db.ProjectTelemetry.Where(p => p.IdProject == idProject).Select(item => item.IdTelemetry).ToList();

            foreach (Guid ti in telemetriesId)
            {
                telemetries.Add(db.Telemetry.FirstOrDefault(p => p.Id == ti));
            }

            return new JsonModel { measures = measures, devices = devices, interfaces = interfaces, commands = commands, telemetryItems = telemetries } ;
        }
    }
}
