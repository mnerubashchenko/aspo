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
    public class CommentsController
    {
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetComments"), Authorize(Roles = "Администратор")]
        public List<Comments> GetComments()
        {
            return db.Comments.ToList();
        }

        [HttpPost]
        [Route("CreateComment"), Authorize(Roles = "Администратор")]
        public void CreateComment([FromBody] Comments newComment)
        {
            db.Comments.Add(newComment);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateComment"), Authorize(Roles = "Администратор")]
        public void UpdateComment([FromBody] Comments updatedComment)
        {
            db.Comments.Update(updatedComment);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteComment"), Authorize(Roles = "Администратор")]
        public void DeleteComment(Guid idComment)
        {
            db.Comments.Remove(db.Comments.Find(idComment));
            db.SaveChanges();
        }
    }
}
