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
                typesinter = db.Typeinter.ToList();
            }

            return typesinter;
        }
    }
}
