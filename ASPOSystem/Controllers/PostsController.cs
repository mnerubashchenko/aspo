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
        [HttpGet]
        [Route("GetPost")]
        public List<Posts> GetPost()
        {
            List<Posts> posts;
            using (RSSContext db = new RSSContext())
            {
                posts = db.Posts.Where(p => p.IdPost.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
            }

            return posts;
        }

        [HttpPost]
        [Route("CreatePost")]
        public void CreatePost([FromBody] Posts newPost)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Posts.Add(newPost);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdatePost")]
        public void UpdatePost([FromBody] Posts updatedPost)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Posts.Update(updatedPost);
                db.SaveChanges();
            }
        }

        [HttpDelete]
        [Route("DeletePost")]
        public void DeletePost(Guid idPost)
        {
            using (RSSContext db = new RSSContext())
            {       Posts deletedPost = db.Posts.Find(idPost);
                db.Posts.Remove(deletedPost);
                db.SaveChanges();
            }
        }
         
    }
}
