using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPOSystem.DBModels
{
    public class JsonModel
    {
        public List<Measure> measures { get; set; }
        public List<Devices> devices { get; set; }
        public List<Interfaces> interfaces { get; set; }
        public List<Programmcommands> commands { get; set; }
        public List<Telemetry> telemetryItems { get; set; }
    }
}
