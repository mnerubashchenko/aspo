/* Класс "Контроллер типов иземерений".
 * Название: TypemeasureController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс позволяет работать с информацией о типах измерений.
 * Переменная, используемая в классе:
 *      db - переменная контекста базы данных.
 * Функции, используемые в классе:
 *      GetTypemeasure() - вывод записей из таблицы типов измерений;
 *      CreateTypemeasure() - создание записи о типе измерения;
 *      UpdateTypemeasure() - изменение записи о типе измерения;
 *      DeleteTypemeasure() -  удаление записи о типе измерения.
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
    public class TypemeasureController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        /* GetTypemeasure() - вывод записей таблицы типов измерений.
         * Формальный параметр:
         *      correction - параметр, уточняющий, все ли данные нужны.
         */
        [HttpGet]
        [Route("GetTypemeasure"), Authorize(Roles = "Администратор")]
        public List<Typemeasure> GetTypemeasure(string correction)
        {
            if (correction == "full")
                return db.Typemeasure.ToList();
            else
                return db.Typemeasure.Where(p => p.Id.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        /* CreateTypemeasure() - создание записи о типе измерения.
         * Формальный параметр:
         *      newTypemeasure - информация о добавляемом типе измерения.
         */
        [HttpPost]
        [Route("CreateTypemeasure"), Authorize(Roles = "Администратор")]
        public void CreateTypemeasure([FromBody] Typemeasure newTypemeasure)
        {
            db.Typemeasure.Add(newTypemeasure);
            db.SaveChanges();
        }

        /* UpdateTypemeasure() - изменение записи о типе измерения.
         * Формальный параметр:
         *      updatedTypemeasure - информация об изменяемом типе измерения.
         */
        [HttpPut]
        [Route("UpdateTypemeasure"), Authorize(Roles = "Администратор")]
        public void UpdateTypemeasure([FromBody] Typemeasure updatedTypemeasure)
        {
            db.Typemeasure.Update(updatedTypemeasure);
            db.SaveChanges();
        }

        /* DeleteTypemeasure() - удаление записи о типе измерения.
         * Формальный параметр:
         *      idTypemeasure - идентификатор типа измерения, который требуется удалить.
         */
        [HttpDelete]
        [Route("DeleteTypemeasure"), Authorize(Roles = "Администратор")]
        public void DeleteTypemeasure(Guid idTypemeasure)
        {
            db.Typemeasure.Remove(db.Typemeasure.Find(idTypemeasure));
            db.SaveChanges();
        }
    }
}
