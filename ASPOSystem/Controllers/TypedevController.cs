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
                typesdev = db.Typedev.ToList();
            }

            return typesdev;
        }
    }
}
