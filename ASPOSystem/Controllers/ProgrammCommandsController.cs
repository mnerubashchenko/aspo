/* Класс "Контроллер программных команд".
 * Название: ProgrammCommandsController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс позволяет работать с информацией о программных командах.
 * Переменная, используемая в классе:
 *      db - переменная контекста базы данных.
 * Методы, используемые в классе:
 *      GetCommand() - вывод всех записей из таблицы программных команд;
 *      GetNamesOfCommands() - вывод названий всех программных команд;
 *      CreateCommand() - создание записи о программной команде;
 *      UpdateCommand() -  изменение записи о программной команде;
 *      DeleteCommand() - удаление записи о программной команде.
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
    public class ProgrammCommandsController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        /* GetCommand() - вывод всех записей из таблицы программных команд. */
        [HttpGet]
        [Route("GetCommand"), Authorize(Roles = "Администратор")]
        public List<Programmcommands> GetCommand()
        {
            return db.Programmcommands.Where(p => p.Id.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        /* GetNamesOfCommands() - вывод названий всех программных команд. */
        [HttpGet]
        [Route("GetNamesOfCommands"), Authorize(Roles = "Администратор, Гость")]
        public List<string> GetNamesOfCommands()
        {
            return db.Programmcommands.Where(p => p.Id.ToString() != "00000000-0000-0000-0000-000000000000").Select(item => item.Name).ToList();
        }

        /* CreateCommand() - создание записи о программной команде.
         * Формальный параметр:
         *      newCommand - информация о добавляемой программной команде.
         */
        [HttpPost]
        [Route("CreateCommand"), Authorize(Roles = "Администратор")]
        public void CreateCommand([FromBody] Programmcommands newCommand)
        {
            db.Programmcommands.Add(newCommand);
            db.SaveChanges();
        }

        /* UpdateCommand() - изменение записи о программной команде.
         * Формальный параметр:
         *      updatedCommand - информация об изменяемой программной команде.
         */
        [HttpPut]
        [Route("UpdateCommand"), Authorize(Roles = "Администратор")]
        public void UpdateCommand([FromBody] Programmcommands updatedCommand)
        {
            db.Programmcommands.Update(updatedCommand);
            db.SaveChanges();
        }

        /* DeleteCommand() - удаление записи о программной команде.
         * Формальный параметр:
         *      idCommand - идентификатор программной команды, которую требуется удалить.
         */
        [HttpDelete]
        [Route("DeleteCommand"), Authorize(Roles = "Администратор")]
        public void DeleteCommand(Guid idCommand)
        {
            db.Programmcommands.Remove(db.Programmcommands.Find(idCommand));
            db.SaveChanges();
        }
    }
}
