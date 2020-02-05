using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Mvc;

namespace ASPOSystem.Controllers
{
    [Route("api/[controller]")]
    public class TypeinterController : Controller
    {
        [HttpGet("[action]")]
        public List<Typeinter> GetTypeinter()
        {
            List<Typeinter> typesinter;
            using (RSSContext db = new RSSContext())
            {
                typesinter = db.Typeinter.Where(p => p.IdTypeinter.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
            }

            return typesinter;
        }
    }
}
