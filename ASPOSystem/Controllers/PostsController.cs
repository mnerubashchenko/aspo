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
    public class PostsController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        [HttpGet]
        [Route("GetPost"), Authorize(Roles = "Администратор, Гость")]
        public List<Posts> GetPost()
        {
            return db.Posts.Where(p => p.Id.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        [HttpPost]
        [Route("CreatePost"), Authorize(Roles = "Администратор")]
        public void CreatePost([FromBody] Posts newPost)
        {
            db.Posts.Add(newPost);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdatePost"), Authorize(Roles = "Администратор")]
        public void UpdatePost([FromBody] Posts updatedPost)
        {
            db.Posts.Update(updatedPost);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeletePost"), Authorize(Roles = "Администратор")]
        public void DeletePost(Guid idPost)
        {
            db.Posts.Remove(db.Posts.Find(idPost));
            db.SaveChanges();
        }
    }
}
