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
    public class TypemeasureController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        [HttpGet]
        [Route("GetTypemeasure"), Authorize(Roles = "Администратор")]
        public List<Typemeasure> GetTypemeasure()
        {
            return db.Typemeasure.Where(p => p.Id.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        [HttpPost]
        [Route("CreateTypemeasure"), Authorize(Roles = "Администратор")]
        public void CreateTypemeasure([FromBody] Typemeasure newTypemeasure)
        {
            db.Typemeasure.Add(newTypemeasure);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateTypemeasure"), Authorize(Roles = "Администратор")]
        public void UpdateTypemeasure([FromBody] Typemeasure updatedTypemeasure)
        {
            db.Typemeasure.Update(updatedTypemeasure);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteTypemeasure"), Authorize(Roles = "Администратор")]
        public void DeleteTypemeasure(Guid idTypemeasure)
        {
            db.Typemeasure.Remove(db.Typemeasure.Find(idTypemeasure));
            db.SaveChanges();
        }
    }
}
