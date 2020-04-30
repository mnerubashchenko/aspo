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
    public class TypeinterController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        [HttpGet]
        [Route("GetTypeinter"), Authorize(Roles = "Администратор")]
        public List<Typeinter> GetTypeinter(string correction)
        {
            if (correction == "full")
                return db.Typeinter.ToList();
            else 
                return db.Typeinter.Where(p => p.Id.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        [HttpPost]
        [Route("CreateTypeinter"), Authorize(Roles = "Администратор")]
        public void CreateTypeinter([FromBody] Typeinter newTypeinter)
        {
            db.Typeinter.Add(newTypeinter);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateTypeinter"), Authorize(Roles = "Администратор")]
        public void UpdateTypeinter([FromBody] Typeinter updatedTypeinter)
        {
            db.Typeinter.Update(updatedTypeinter);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteTypeinter"), Authorize(Roles = "Администратор")]
        public void DeleteTypeinter(Guid idTypeinter)
        {
            db.Typeinter.Remove(db.Typeinter.Find(idTypeinter));
            db.SaveChanges();
        }
    }
}
