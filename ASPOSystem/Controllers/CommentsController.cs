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
    public class CommentsController
    {
        [HttpGet]
        [Route("GetComments")]
        public List<Comments> GetComments()
        {
            List<Comments> comments;
            using (RSSContext db = new RSSContext())
            {
                comments = db.Comments.ToList();
            }

            return comments;
        }

        [HttpPost]
        [Route("CreateComment")]
        public void CreateComment([FromBody] Comments newComment)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Comments.Add(newComment);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateComment")]
        public void UpdateComment([FromBody] Comments updatedComment)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Comments.Update(updatedComment);
                db.SaveChanges();
            }
        }

        [HttpDelete]
        [Route("DeleteComment")]
        public void DeleteComment(Guid idComment)
        {
            using (RSSContext db = new RSSContext())
            {
                Comments deletedBrand = db.Comments.Find(idComment);
                db.Comments.Remove(deletedBrand);
                db.SaveChanges();
            }
        }
    }
}
