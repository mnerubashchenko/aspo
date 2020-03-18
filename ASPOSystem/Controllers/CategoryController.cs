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
    public class CategoryController : Controller
    {
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetCategory"), Authorize(Roles = "Администратор, Гость")]
        public List<Category> GetCategory()
        {
            return db.Category.Where(p => p.IdCategory.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        [HttpPost]
        [Route("CreateCategory"), Authorize(Roles = "Администратор")]
        public void CreateCategory([FromBody] Category newCategory)
        {
            db.Category.Add(newCategory);
            db.SaveChanges();

        }

        [HttpPut]
        [Route("UpdateCategory"), Authorize(Roles = "Администратор")]
        public void UpdateCategory([FromBody] Category updatedCategory)
        {
            db.Category.Update(updatedCategory);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteCategory"), Authorize(Roles = "Администратор")]
        public void DeleteCategory(Guid idCategory)
        {
            db.Category.Remove(db.Category.Find(idCategory));
            db.SaveChanges();
        }
    }
}
