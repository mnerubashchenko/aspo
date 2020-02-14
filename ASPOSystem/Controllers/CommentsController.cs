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
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetComments")]
        public List<Comments> GetComments()
        {
            return db.Comments.ToList();
        }

        [HttpPost]
        [Route("CreateComment")]
        public void CreateComment([FromBody] Comments newComment)
        {
            db.Comments.Add(newComment);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateComment")]
        public void UpdateComment([FromBody] Comments updatedComment)
        {
            db.Comments.Update(updatedComment);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteComment")]
        public void DeleteComment(Guid idComment)
        {
            db.Comments.Remove(db.Comments.Find(idComment));
            db.SaveChanges();
        }
    }
}
