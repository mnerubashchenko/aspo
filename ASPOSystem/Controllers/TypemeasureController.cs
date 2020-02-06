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
    public class TypemeasureController : Controller
    {
        [HttpGet]
        [Route("GetTypemeasure")]
        public List<Typemeasure> GetTypemeasure()
        {
            List<Typemeasure> typesmeasure;
            using (RSSContext db = new RSSContext())
            {
                typesmeasure = db.Typemeasure.Where(p => p.IdTypemeasure.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
            }

            return typesmeasure;
        }

        [HttpPost]
        [Route("CreateTypemeasure")]
        public void CreateTypemeasure([FromBody] Typemeasure tm)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Typemeasure.Add(tm);
                db.SaveChanges();
            }
        }
    }
}
