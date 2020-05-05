/* Класс "Контроллер устройств".
 * Название: DevicesController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс позволяет работать с информацией об устройствах.
 * Переменная, используемая в классе:
 *      db - переменная контекста базы данных.
 * Методы, используемые в классе:
 *      GetDevices() - вывод всех записей из таблицы устройств;
 *      GetNamesOfDevices() - вывод названий моделей всех устройств;
 *      CreateDevice() - создание записи об устройстве;
 *      UpdateDevice() -  изменение записи об устройстве;
 *      DeleteDevice() - удаление записи об устройстве.
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
    public class DevicesController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        /* GetDevices() - вывод всех записей из таблицы устройств. */
        [HttpGet]
        [Route("GetDevices"), Authorize(Roles = "Администратор")]
        public List<Devices> GetDevices()
        {
            return db.Devices.Where(p => p.Id.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        /* GetNamesOfDevices() - вывод названий моделей всех устройств. */
        [HttpGet]
        [Route("GetNamesOfDevices"), Authorize(Roles = "Администратор, Гость")]
        public List<string> GetNamesOfDevices()
        {
            return db.Devices.Where(p=> p.Id.ToString() != "00000000-0000-0000-0000-000000000000").Select(item => item.Model).ToList();
        }

        /* CreateDevice() - создание записи об устройстве.
         * Формальный параметр:
         *      newDevice - информация о добавляемом устройстве.
         */
        [HttpPost]
        [Route("CreateDevice"), Authorize(Roles = "Администратор")]
        public void CreateDevice([FromBody] Devices newDevice)
        {
            db.Devices.Add(newDevice);
            db.SaveChanges();
        }

        /* UpdateDevice() - изменение записи об устройстве.
         * Формальный параметр:
         *      updatedDevice - информация об изменяемом устройстве.
         */
        [HttpPut]
        [Route("UpdateDevice"), Authorize(Roles = "Администратор")]
        public void UpdateDevice([FromBody] Devices updatedDevice)
        {
            db.Devices.Update(updatedDevice);
            db.SaveChanges();
        }

        /* DeleteDevice() - удаление записи об устройстве.
         * Формальный параметр:
         *      idDevice - идентификатор устройства, которое требуется удалить.
         */
        [HttpDelete]
        [Route("DeleteDevice"), Authorize(Roles = "Администратор")]
        public void DeleteDevice(Guid idDevice)
        {
            using (RSSForVKRContext db = new RSSForVKRContext())
            {
                db.Devices.Remove(db.Devices.Find(idDevice));
                db.SaveChanges();
            }
        }
    }
}
