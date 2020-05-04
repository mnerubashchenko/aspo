/* Класс "Контроллер интерфейсов".
 * Название: InterfaceController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс позволяет работать с информацией об интерфейсах.
 * Переменная, используемая в классе:
 *      db - переменная контекста базы данных.
 * Функции, используемые в классе:
 *      GetInterfaces() - вывод всех записей из таблицы интерфейсов;
 *      GetNamesOfInterfaces() - вывод названий всех интерфейсов;
 *      CreateInterface() - создание записи об интерфейсе;
 *      UpdateInterface() -  изменение записи об интерфейсе;
 *      DeleteInterface() - удаление записи об интерфейсе.
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
    public class InterfaceController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        /* GetInterfaces() - вывод всех записей из таблицы интерфейсов. */
        [HttpGet]
        [Route("GetInterfaces"), Authorize(Roles = "Администратор")]
        public List<Interfaces> GetInterfaces()
        {
            return db.Interfaces.ToList();
        }

        /* GetNamesOfInterfaces() - вывод названий всех интерфейсов. */
        [HttpGet]
        [Route("GetNamesOfInterfaces"), Authorize(Roles = "Администратор, Гость")]
        public List<string> GetNamesOfInterfaces()
        {
            return db.Interfaces.Select(item => item.Name).ToList();
        }

        /* CreateInterface() - создание записи об интерфейсе.
         * Формальный параметр:
         *      newInterface - информация о добавляемом интерфейсе.
         */
        [HttpPost]
        [Route("CreateInterface"), Authorize(Roles = "Администратор")]
        public void CreateInterface([FromBody] Interfaces newInterface)
        {
            db.Interfaces.Add(newInterface);
            db.SaveChanges();
        }

        /* UpdateInterface() - изменение записи об интерфейсе.
         * Формальный параметр:
         *      updatedInterface - информация об изменяемом интерфейсе.
         */
        [HttpPut]
        [Route("UpdateInterface"), Authorize(Roles = "Администратор")]
        public void UpdateInterface([FromBody] Interfaces updatedInterface)
        {
            db.Interfaces.Update(updatedInterface);
            db.SaveChanges();
        }

        /* DeleteInterface() - удаление записи об интерфейсе.
         * Формальный параметр:
         *      idInterface - идентификатор интерфейса, который требуется удалить.
         */
        [HttpDelete]
        [Route("DeleteInterface"), Authorize(Roles = "Администратор")]
        public void DeleteInterface(Guid idInterface)
        {
            db.Interfaces.Remove(db.Interfaces.Find(idInterface));
            db.SaveChanges();
        }
    }
}
