using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPOSystem.DBModels
{
    public class JsonModel
    {
        public List<Telemetry> Telemetry { get; set; }

        public List<Programmcommands> Programmcommand { get; set; }
    }
}
