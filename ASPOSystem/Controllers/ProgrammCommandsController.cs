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
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetCommand")]
        public List<Programmcommands> GetCommand()
        {
            return db.Programmcommands.Where(p => p.IdCommand.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        [HttpPost]
        [Route("CreateCommand")]
        public void CreateCommand([FromBody] Programmcommands newCommand)
        {
            db.Programmcommands.Add(newCommand);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateCommand")]
        public void UpdateCommand([FromBody] Programmcommands updatedCommand)
        {
            db.Programmcommands.Update(updatedCommand);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteCommand")]
        public void DeleteCommand(Guid idCommand)
        {
            db.Programmcommands.Remove(db.Programmcommands.Find(idCommand));
            db.SaveChanges();
        }
    }
}
