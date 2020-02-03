using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Mvc;

namespace ASPOSystem.Controllers
{
    [Route("api/[controller]")]
    public class ProgrammCommandsController : Controller
    {
        [HttpGet("[action]")]
        public List<Programmcommands> GetCommand()
        {
            List<Programmcommands> commands;
            using (RSSContext db = new RSSContext())
            {
                commands = db.Programmcommands.ToList();
            }

            return commands;
        }
    }
}
