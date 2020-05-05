/* Класс "Контроллер телеметрий".
 * Название: TelemetryController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс позволяет работать с информацией о телеметриях.
 * Переменная, используемая в классе:
 *      db - переменная контекста базы данных.
 * Методы, используемые в классе:
 *      GetTelemetry() - вывод всех записей из таблицы телеметрий;
 *      GetNamesOfTelemetries() - вывод названий всех телеметрий;
 *      CreateTelemetry() - создание записи о телеметрии;
 *      UpdateTelemetry() -  изменение записи о телеметрии;
 *      DeleteTelemetry() - удаление записи о телеметрии.
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
    public class TelemetryController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        /* GetTelemetry() - вывод всех записей из таблицы телеметрий. */
        [HttpGet]
        [Route("GetTelemetry"), Authorize(Roles = "Администратор")]
        public List<Telemetry> GetTelemetry()
        {
            return db.Telemetry.Where(p => p.Id.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        /* GetNamesOfTelemetries() - вывод названий всех телеметрий. */
        [HttpGet]
        [Route("GetNamesOfTelemetries"), Authorize(Roles = "Администратор, Гость")]
        public List<string> GetNamesOfTelemetries()
        {
            return db.Telemetry.Where(p => p.Id.ToString() != "00000000-0000-0000-0000-000000000000").Select(item => item.ShortName).ToList();
        }

        /* CreateTelemetry() - создание записи о телеметрии.
         * Формальный параметр:
         *      newTelemetry - информация о добавляемой телеметрии.
         */
        [HttpPost]
        [Route("CreateTelemetry"), Authorize(Roles = "Администратор")]
        public void CreateTelemetry([FromBody] Telemetry newTelemetry)
        {
            db.Telemetry.Add(newTelemetry);
            db.SaveChanges();
        }

        /* UpdateTelemetry() - изменение записи о телеметрии.
         * Формальный параметр:
         *      updatedTelemetry - информация об изменяемой телеметрии.
         */
        [HttpPut]
        [Route("UpdateTelemetry"), Authorize(Roles = "Администратор")]
        public void UpdateTelemetry([FromBody] Telemetry updatedTelemetry)
        {
            db.Telemetry.Update(updatedTelemetry);
            db.SaveChanges();
        }

        /* DeleteTelemetry() - удаление записи о телеметрии.
         * Формальный параметр:
         *      idTelemetry - идентификатор телеметрии, которую требуется удалить.
         */
        [HttpDelete]
        [Route("DeleteTelemetry"), Authorize(Roles = "Администратор")]
        public void DeleteTelemetry(Guid idTelemetry)
        {
            db.Telemetry.Remove(db.Telemetry.Find(idTelemetry));
            db.SaveChanges();
        }
    }
}
