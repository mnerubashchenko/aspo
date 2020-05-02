using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProgrammCommandsController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        [HttpGet]
        [Route("GetCommand"), Authorize(Roles = "Администратор")]
        public List<Programmcommands> GetCommand()
        {
            return db.Programmcommands.Where(p => p.Id.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        [HttpGet]
        [Route("GetNamesOfCommands"), Authorize(Roles = "Администратор, Гость")]
        public List<string> GetNamesOfCommands()
        {
            return db.Programmcommands.Where(p => p.Id.ToString() != "00000000-0000-0000-0000-000000000000").Select(item => item.Name).ToList();
        }

        [HttpPost]
        [Route("CreateCommand"), Authorize(Roles = "Администратор")]
        public void CreateCommand([FromBody] Programmcommands newCommand)
        {
            db.Programmcommands.Add(newCommand);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateCommand"), Authorize(Roles = "Администратор")]
        public void UpdateCommand([FromBody] Programmcommands updatedCommand)
        {
            db.Programmcommands.Update(updatedCommand);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteCommand"), Authorize(Roles = "Администратор")]
        public void DeleteCommand(Guid idCommand)
        {
            db.Programmcommands.Remove(db.Programmcommands.Find(idCommand));
            db.SaveChanges();
        }
    }
}
