/* Класс "Контроллер комментариев к протоколам".
 * Название: CommentsController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс позволяет работать с комментариями о протоколах.
 * Переменная, используемая в классе:
 *      db - переменная контекста базы данных.
 * Методы, используемые в классе:
 *      GetComments() - вывод комментриев ко всем протоколам;
 *      GetCommentsForOneProject() - вывод комментарием к определенному протоколу;
 *      CreateComment() - добавление нового комментария;
 *      UpdateComment() -  изменение комментария;
 *      DeleteComment() - удаление комментария.
 */

using ASPOSystem.DBModels;
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
        /* GetComments() - вывод комментриев ко всем протоколам. */
        [HttpGet]
        [Route("GetComments"), Authorize(Roles = "Администратор")]
        public List<Comments> GetComments()
        {
            using (var db = new RSSForVKRContext())
            {
                return db.Comments.ToList();
            }

        }

        /* GetCommentsForOneProject() - вывод комментарием к определенному протоколу.
         * Формальный параметр:
         *      projectName - название протокола, к которому нужно получить комментарии.
         */
        [HttpGet]
        [Route("GetCommentsForOneProject"), Authorize(Roles = "Администратор, Гость")]
        public string GetCommentsForOneProject(string projectName)
        {
            using (var db = new RSSForVKRContext())
            {
                return JsonConvert.SerializeObject(db.Comments.Where(p => p.ProjectComment == (db.Project.FirstOrDefault(i => i.NameProject == projectName).Id)).ToList(),
                    new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore });
            }

        }

        /* CreateComment() - добавление нового комментария.
         * Формальные параметы:
         *      nameProject - название протокола, к которому нужно создать комментарий;
         *      authorProject - идентификатор автора комментария;
         *      bodyComment - текст комментария.
         * Локальная переменная:
         *      newComment - новый комментарий.
         */
        [HttpPost]
        [Route("CreateComment"), Authorize(Roles = "Администратор, Гость")]
        public void CreateComment(string nameProject, Guid authorProject, string bodyComment)
        {
            using (var db = new RSSForVKRContext())
            {
                var newComment = new Comments();
                newComment.Id = new Guid();
                newComment.AuthorComment = authorProject;
                newComment.ProjectComment = db.Project.FirstOrDefault(pr => pr.NameProject == nameProject).Id;
                newComment.BodyComment = bodyComment;
                newComment.DateCreateComment = DateTime.Now;
                db.Comments.Add(newComment);
                db.SaveChanges();
            }
        }

        /* UpdateComment() - изменение комментария.
         * Формальный параметр:
         *      updatedComment - изменяемый комментарий.
         */
        [HttpPut]
        [Route("UpdateComment"), Authorize(Roles = "Администратор")]
        public void UpdateComment([FromBody] Comments updatedComment)
        {
            using (var db = new RSSForVKRContext())
            {
                db.Comments.Update(updatedComment);
                db.SaveChanges();
            }
        }

        /* DeleteComment() - удаление комментария.
         * Формальный параметр:
         *      id - идентификатор комментария, который требуется удалить.
         */
        [HttpDelete]
        [Route("DeleteComment"), Authorize(Roles = "Администратор")]
        public void DeleteComment(Guid id)
        {
            using (var db = new RSSForVKRContext())
            {
                db.Comments.Remove(db.Comments.Find(id));
                db.SaveChanges();
            }
        }
    }
}
