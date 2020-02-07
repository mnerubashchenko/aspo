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
        public void CreateCategory([FromBody] Category newCategory)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Category.Add(newCategory);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateCategory")]
        public void UpdateCategory([FromBody] Category updatedCategory)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Category.Update(updatedCategory);
                db.SaveChanges();
            }
        }

        [HttpDelete]
        [Route("DeleteCategory")]
        public void DeleteCategory(Guid idCategory)
        {
            using (RSSContext db = new RSSContext())
            {
                Category deletedCategory = db.Category.Find(idCategory);
                db.Category.Remove(deletedCategory);
                db.SaveChanges();
            }
        }
    }
}
