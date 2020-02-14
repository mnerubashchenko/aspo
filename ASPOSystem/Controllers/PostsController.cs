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
    public class PostsController : Controller
    {
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetPost")]
        public List<Posts> GetPost()
        {
            return db.Posts.Where(p => p.IdPost.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        [HttpPost]
        [Route("CreatePost")]
        public void CreatePost([FromBody] Posts newPost)
        {
            db.Posts.Add(newPost);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdatePost")]
        public void UpdatePost([FromBody] Posts updatedPost)
        {
            db.Posts.Update(updatedPost);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeletePost")]
        public void DeletePost(Guid idPost)
        {
            db.Posts.Remove(db.Posts.Find(idPost));
            db.SaveChanges();
        }
    }
}
