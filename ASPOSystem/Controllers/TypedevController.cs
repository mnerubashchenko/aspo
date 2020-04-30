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
    public class TypedevController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        [HttpGet]
        [Route("GetTypedev"), Authorize(Roles = "Администратор")]
        public List<Typedev> GetTypedev(string correction)
        {
            if (correction == "full")
                return db.Typedev.ToList();
            else
                return db.Typedev.Where(p => p.Id.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        [HttpPost]
        [Route("CreateTypedev"), Authorize(Roles = "Администратор")]
        public void CreateTypedev([FromBody] Typedev newTypedev)
        {
            db.Typedev.Add(newTypedev);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateTypedev"), Authorize(Roles = "Администратор")]
        public void UpdateTypedev([FromBody] Typedev updatedTypedev)
        {
            db.Typedev.Update(updatedTypedev);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteTypedev"), Authorize(Roles = "Администратор")]
        public void DeleteRole(Guid idTypedev)
        {
            db.Typedev.Remove(db.Typedev.Find(idTypedev));
            db.SaveChanges();
        }
    }
}
