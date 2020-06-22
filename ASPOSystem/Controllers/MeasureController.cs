/* Класс "Контроллер измерений".
 * Название: MeasureController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс позволяет работать с информацией об измерениях.
 * Переменная, используемая в классе:
 *      db - переменная контекста базы данных.
 * Методы, используемые в классе:
 *      GetMeasures() - вывод всех записей из таблицы измерений;
 *      GetNamesOfMeasures() - вывод названий всех измерений;
 *      CreateMeasure() - создание записи об измерении;
 *      UpdateMeasure() -  изменение записи об измерении;
 *      DeleteMeasure() - удаление записи об измерении.
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
    public class MeasureController : Controller
    {
        /* GetMeasures() - вывод всех записей из таблицы измерений. */
        [HttpGet]
        [Route("GetMeasures"), Authorize(Roles = "Администратор")]
        public List<Measure> GetMeasures()
        {
            using (var db = new RSSForVKRContext())
            {
                return db.Measure.ToList();
            }
        }

        /* GetNamesOfMeasures() - вывод названий всех измерений. */
        [HttpGet]
        [Route("GetNamesOfMeasures"), Authorize(Roles = "Администратор, Гость")]
        public List<string> GetNamesOfMeasures()
        {
            using (var db = new RSSForVKRContext())
            {
                return db.Measure.Select(item => item.Name).ToList();
            }
        }

        /* CreateMeasure() - создание записи об измерении.
         * Формальный параметр:
         *      newMeasure - информация о добавляемом измерении.
         */
        [HttpPost]
        [Route("CreateMeasure"), Authorize(Roles = "Администратор")]
        public void CreateMeasure([FromBody] Measure newMeasure)
        {
            using (var db = new RSSForVKRContext())
            {
                db.Measure.Add(newMeasure);
                db.SaveChanges();
            }
        }

        /* UpdateMeasure() - изменение записи об измерении.
         * Формальный параметр:
         *      updatedMeasure - информация об изменяемом измерении.
         */
        [HttpPut]
        [Route("UpdateMeasure"), Authorize(Roles = "Администратор")]
        public void UpdateMeasure([FromBody] Measure updatedMeasure)
        {
            using (var db = new RSSForVKRContext())
            {
                db.Measure.Update(updatedMeasure);
                db.SaveChanges();
            }
        }

        /* DeleteMeasure() - удаление записи об измерении.
         * Формальный параметр:
         *      idMeasure - идентификатор измерения, которое требуется удалить.
         */
        [HttpDelete]
        [Route("DeleteMeasure"), Authorize(Roles = "Администратор")]
        public void DeleteMeasure(Guid idMeasure)
        {
            using (var db = new RSSForVKRContext())
            {
                db.Measure.Remove(db.Measure.Find(idMeasure));
                db.SaveChanges();
            }
        }
    }
}
