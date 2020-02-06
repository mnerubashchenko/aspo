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
    public class TypedevController : Controller
    {
        [HttpGet]
        [Route("GetTypedev")]
        public List<Typedev> GetTypedev()
        {
            List<Typedev> typesdev;
            using (RSSContext db = new RSSContext())
            {
                typesdev = db.Typedev.Where(p => p.IdTypedev.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
            }

            return typesdev;
        }

        [HttpPost]
        [Route("CreateTypedev")]
        public void CreateTypedev([FromBody] Typedev td)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Typedev.Add(td);
                db.SaveChanges();
            }
        }
    }
}
