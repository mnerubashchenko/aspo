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
    public class ProgrammCommandsController : Controller
    {
        [HttpGet]
        [Route("GetCommand")]
        public List<Programmcommands> GetCommand()
        {
            List<Programmcommands> commands;
            using (RSSContext db = new RSSContext())
            {
                commands = db.Programmcommands.Where(p => p.IdCommand.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
            }

            return commands;
        }

        [HttpPost]
        [Route("CreateCommand")]
        public void CreateCommand([FromBody] Programmcommands command)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Programmcommands.Add(command);
                db.SaveChanges();
            }
        }
    }
}
