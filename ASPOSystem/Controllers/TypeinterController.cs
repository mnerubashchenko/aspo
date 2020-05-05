/* Класс "Контроллер типов интерфейсов".
 * Название: TypeinterController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс позволяет работать с информацией о типах интерфейсов.
 * Переменная, используемая в классе:
 *      db - переменная контекста базы данных.
 * Методы, используемые в классе:
 *      GetTypeinter() - вывод записей из таблицы типов интерфейсов;
 *      CreateTypeinter() - создание записи о типе интерфейса;
 *      UpdateTypeinter() - изменение записи о типе интерфейса;
 *      DeleteTypeinter() -  удаление записи о типе интерфейса.
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
    public class TypeinterController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        /* GetTypeinter() - вывод записей таблицы типов интерфейсов.
         * Формальный параметр:
         *      correction - параметр, уточняющий, все ли данные нужны.
         */
        [HttpGet]
        [Route("GetTypeinter"), Authorize(Roles = "Администратор")]
        public List<Typeinter> GetTypeinter(string correction)
        {
            if (correction == "full")
                return db.Typeinter.ToList();
            else 
                return db.Typeinter.Where(p => p.Id.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        /* CreateTypeinter() - создание записи о типе интерфейса.
         * Формальный параметр:
         *      newTypeinter - информация о добавляемом типе интерфейса.
         */
        [HttpPost]
        [Route("CreateTypeinter"), Authorize(Roles = "Администратор")]
        public void CreateTypeinter([FromBody] Typeinter newTypeinter)
        {
            db.Typeinter.Add(newTypeinter);
            db.SaveChanges();
        }

        /* UpdateTypeinter() - изменение записи о типе интерфейса.
         * Формальный параметр:
         *      updatedTypeinter - информация об изменяемом типе интерфейса.
         */
        [HttpPut]
        [Route("UpdateTypeinter"), Authorize(Roles = "Администратор")]
        public void UpdateTypeinter([FromBody] Typeinter updatedTypeinter)
        {
            db.Typeinter.Update(updatedTypeinter);
            db.SaveChanges();
        }

        /* DeleteTypeinter() - удаление записи о типе интерфейса.
         * Формальный параметр:
         *      idTypeinter - идентификатор типа интерфейса, который требуется удалить.
         */
        [HttpDelete]
        [Route("DeleteTypeinter"), Authorize(Roles = "Администратор")]
        public void DeleteTypeinter(Guid idTypeinter)
        {
            db.Typeinter.Remove(db.Typeinter.Find(idTypeinter));
            db.SaveChanges();
        }
    }
}
