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
    public class CategoryController : Controller
    {
        [HttpGet]
        [Route("GetCategory")]
        public List<Category> GetCategory()
        {
            List<Category> categories;
            using (RSSContext db = new RSSContext())
            {
                categories = db.Category.Where(p=> p.IdCategory.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
            }

            return categories;
        }

        [HttpPost]
        [Route("CreateCategory")]
        public void CreateCategory([FromBody] Category category)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Category.Add(category);
                db.SaveChanges();
            }
        }
    }
}
