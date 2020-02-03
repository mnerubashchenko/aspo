using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Mvc;

namespace ASPOSystem.Controllers
{
    [Route("api/[controller]")]
    public class TypemeasureController : Controller
    {
        [HttpGet("[action]")]
        public List<Typemeasure> GetTypemeasure()
        {
            List<Typemeasure> typesmeasure;
            using (RSSContext db = new RSSContext())
            {
                typesmeasure = db.Typemeasure.ToList();
            }

            return typesmeasure;
        }
    }
}
