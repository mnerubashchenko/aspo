﻿using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommentsController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        [HttpGet]
        [Route("GetComments"), Authorize(Roles = "Администратор")]
        public List<Comments> GetComments()
        {
            return db.Comments.ToList();
        }

        [HttpGet]
        [Route("GetCommentsForOneProject"), Authorize(Roles = "Администратор, Гость")]
        public string GetCommentsForOneProject(string projectName)
        {
            return JsonConvert.SerializeObject(db.Comments.Where(p => p.ProjectComment == (db.Project.FirstOrDefault(i => i.NameProject == projectName).Id)).ToList(),
                   new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
        }

        [HttpPost]
        [Route("CreateComment"), Authorize(Roles = "Администратор, Гость")]
        public void CreateComment(string nameProject, Guid authorProject, string bodyComment)
        {
            var newComment = new Comments();
            newComment.Id = new Guid();
            newComment.AuthorComment = authorProject;
            newComment.ProjectComment = db.Project.FirstOrDefault(pr=>pr.NameProject == nameProject).Id;
            newComment.BodyComment = bodyComment;
            newComment.DateCreateComment = DateTime.Now;
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
        public void DeleteComment(Guid id)
        {
            db.Comments.Remove(db.Comments.Find(id));
            db.SaveChanges();
        }
    }
}
