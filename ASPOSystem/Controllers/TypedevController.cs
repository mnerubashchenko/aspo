/* Класс "Контроллер типов устройств".
 * Название: TypedevController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс позволяет работать с информацией о типах устройств.
 * Переменная, используемая в классе:
 *      db - переменная контекста базы данных.
 * Методы, используемые в классе:
 *      GetTypedev() - вывод записей из таблицы типов устройств;
 *      CreateTypedev() - создание записи о типе устройства;
 *      UpdateTypedev() - изменение записи о типе устройства;
 *      DeleteTypedev() -  удаление записи о типе устройства.
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
    public class TypedevController : Controller
    {
        /* GetTypedev() - вывод записей таблицы типов устройств.
         * Формальный параметр:
         *      correction - параметр, уточняющий, все ли данные нужны.
         */
        [HttpGet]
        [Route("GetTypedev"), Authorize(Roles = "Администратор")]
        public List<Typedev> GetTypedev(string correction)
        {
            using (var db = new RSSForVKRContext())
            {
                if (correction == "full")
                    return db.Typedev.ToList();
                else
                    return db.Typedev.Where(p => p.Id.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
            }
        }

        /* CreateTypedev() - создание записи о типе устройства.
         * Формальный параметр:
         *      newTypedev - информация о добавляемом типе устройства.
         */
        [HttpPost]
        [Route("CreateTypedev"), Authorize(Roles = "Администратор")]
        public void CreateTypedev([FromBody] Typedev newTypedev)
        {
            using (var db = new RSSForVKRContext())
            {
                db.Typedev.Add(newTypedev);
                db.SaveChanges();
            }
        }

        /* UpdateTypedev() - изменение записи о типе устройства.
         * Формальный параметр:
         *      updatedTypedev - информация об изменяемом типе устройства.
         */
        [HttpPut]
        [Route("UpdateTypedev"), Authorize(Roles = "Администратор")]
        public void UpdateTypedev([FromBody] Typedev updatedTypedev)
        {
            using (var db = new RSSForVKRContext())
            {
                db.Typedev.Update(updatedTypedev);
                db.SaveChanges();
            }
        }

        /* DeleteTypedev() - удаление записи о типе устройства.
         * Формальный параметр:
         *      idTypedev - идентификатор типа устройства, который требуется удалить.
         */
        [HttpDelete]
        [Route("DeleteTypedev"), Authorize(Roles = "Администратор")]
        public void DeleteRole(Guid idTypedev)
        {
            using (var db = new RSSForVKRContext())
            {
                db.Typedev.Remove(db.Typedev.Find(idTypedev));
                db.SaveChanges();
            }
        }
    }
}
