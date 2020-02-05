using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Mvc;

namespace ASPOSystem.Controllers
{
    [Route("api/[controller]")]
    public class TypedevController : Controller
    {
        [HttpGet("[action]")]
        public List<Typedev> GetTypedev()
        {
            List<Typedev> typesdev;
            using (RSSContext db = new RSSContext())
            {
                typesdev = db.Typedev.Where(p => p.IdTypedev.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
            }

            return typesdev;
        }
    }
}
