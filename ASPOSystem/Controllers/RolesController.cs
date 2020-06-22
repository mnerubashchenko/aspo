/* Класс "Контроллер ролей пользователей".
 * Название: RolesController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс позволяет работать с информацией о ролях пользователей.
 * Переменная, используемая в классе:
 *      db - переменная контекста базы данных.
 * Методы, используемые в классе:
 *      GetRole() - вывод записей из таблицы ролей;
 *      CreateRole() - создание записи о роли;
 *      UpdateRole() - изменение записи о роли;
 *      DeleteRole() -  удаление записи о роли.
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
    public class RolesController : Controller
    {
        /* GetRole() - вывод записей таблицы ролей.
        * Формальный параметр:
        *      correction - параметр, уточняющий, все ли данные нужны.
        */
        [HttpGet]
        [Route("GetRole"), Authorize(Roles = "Администратор, Гость")]
        public List<Roles> GetRole(string correction)
        {
            using (var db = new RSSForVKRContext())
            {
                if (correction == "full")
                    return db.Roles.ToList();
                else
                    return db.Roles.Where(p => p.Id.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
            }
        }

        /* CreateRole() - создание записи о роли.
         * Формальный параметр:
         *      newRole - информация о добавляемой роли.
         */
        [HttpPost]
        [Route("CreateRole"), Authorize(Roles = "Администратор")]
        public void CreateRole([FromBody] Roles newRole)
        {
            using (var db = new RSSForVKRContext())
            {
                db.Roles.Add(newRole);
                db.SaveChanges();
            }
        }

        /* UpdateRole() - изменение записи о роли.
         * Формальный параметр:
         *      updatedRole - информация об изменяемой роли.
         */
        [HttpPut]
        [Route("UpdateRole"), Authorize(Roles = "Администратор")]
        public void UpdateRole([FromBody] Roles updatedRole)
        {
            using (var db = new RSSForVKRContext())
            {
                db.Roles.Update(updatedRole);
                db.SaveChanges();
            }
        }

        /* DeleteRole() - удаление записи о роли.
         * Формальный параметр:
         *      idRole - идентификатор роли, которую требуется удалить.
         */
        [HttpDelete]
        [Route("DeleteRole"), Authorize(Roles = "Администратор")]
        public void DeleteRole(Guid idRole)
        {
            using (var db = new RSSForVKRContext())
            {
                db.Roles.Remove(db.Roles.Find(idRole));
                db.SaveChanges();
            }
        }
    }
}
