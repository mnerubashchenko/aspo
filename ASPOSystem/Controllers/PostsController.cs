/* Класс "Контроллер должностей пользователей".
 * Название: PostsController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс позволяет работать с информацией о должностях пользователей.
 * Переменная, используемая в классе:
 *      db - переменная контекста базы данных.
 * Методы, используемые в классе:
 *      GetPost() - вывод записей из таблицы должностей;
 *      CreatePost() - создание записи о должности;
 *      UpdatePost() - изменение записи о должности;
 *      DeletePost() -  удаление записи о должности.
 */

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
        /* GetPost() - вывод записей таблицы должностей.
         * Формальный параметр:
         *      correction - параметр, уточняющий, все ли данные нужны.
         */
        [HttpGet]
        [Route("GetPost"), Authorize(Roles = "Администратор, Гость")]
        public List<Posts> GetPost(string correction)
        {
            using (var db = new RSSForVKRContext())
            {
                if (correction == "full")
                    return db.Posts.ToList();
                else
                    return db.Posts.Where(p => p.Id.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
            }
        }

        /* CreatePost() - создание записи о должности.
         * Формальный параметр:
         *      newPost - информация о добавляемой должности.
         */
        [HttpPost]
        [Route("CreatePost"), Authorize(Roles = "Администратор")]
        public void CreatePost([FromBody] Posts newPost)
        {
            using (var db = new RSSForVKRContext())
            {
                db.Posts.Add(newPost);
                db.SaveChanges();
            }
        }

        /* UpdateBrand() - изменение записи о должности.
         * Формальный параметр:
         *      updatedPost - информация об изменяемой должности.
         */
        [HttpPut]
        [Route("UpdatePost"), Authorize(Roles = "Администратор")]
        public void UpdatePost([FromBody] Posts updatedPost)
        {
            using (var db = new RSSForVKRContext())
            {
                db.Posts.Update(updatedPost);
                db.SaveChanges();
            }
        }

        /* DeletePost() - удаление записи о должности.
         * Формальный параметр:
         *      idPost - идентификатор должности, которую требуется удалить.
         */
        [HttpDelete]
        [Route("DeletePost"), Authorize(Roles = "Администратор")]
        public void DeletePost(Guid idPost)
        {
            using (var db = new RSSForVKRContext())
            {
                db.Posts.Remove(db.Posts.Find(idPost));
                db.SaveChanges();
            }
        }
    }
}
