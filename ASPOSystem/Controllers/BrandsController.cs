/* Класс "Контроллер брендов устройств".
 * Название: BrandsController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс позволяет работать с информацией о брендах устройств.
 * Переменная, используемая в классе:
 *      db - переменная контекста базы данных.
 * Методы, используемые в классе:
 *      GetBrand() - вывод записей таблицы брендов устройств;
 *      CreateBrand() - создание записи о бренде;
 *      UpdateBrand() - изменение записи о бренде;
 *      DeleteBrand() -  удаление записи о бренде.
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BrandsController : Controller
    {
        /* GetBrand() - вывод записей таблицы брендов устройств.
         * Формальный параметр:
         *      correction - параметр, уточняющий, все ли данные нужны.
         */
        [HttpGet]
        [Route("GetBrand"), Authorize(Roles = "Администратор")]
        public List<Brands> GetBrand(string correction)
        {
            using (var db = new RSSForVKRContext())
            {
                if (correction == "full")                                                               // Проверка необходимости всех данных
                    return db.Brands.ToList();
                else
                    return db.Brands.Where(p => p.Id.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
            }
        }

        /* CreateBrand() - создание записи о бренде.
         * Формальный параметр:
         *      newBrand - информация о добавляемом бренде.
         */
        [HttpPost]
        [Route("CreateBrand"), Authorize(Roles = "Администратор")]
        public void CreateBrand([FromBody] Brands newBrand)
        {
            using (var db = new RSSForVKRContext())
            {
                db.Brands.Add(newBrand);
                db.SaveChanges();
            }
        }

        /* UpdateBrand() - изменение записи о бренде.
         * Формальный параметр:
         *      updatedBrand - информация об изменяемом бренде.
         */
        [HttpPut]
        [Route("UpdateBrand"), Authorize(Roles = "Администратор")]
        public void UpdateBrand([FromBody] Brands updatedBrand)
        {
            using (var db = new RSSForVKRContext())
            {
                db.Brands.Update(updatedBrand);
                db.SaveChanges();
            }
        }

        /* DeleteBrand() - удаление записи о бренде.
         * Формальный параметр:
         *      id - идентификатор бренда, который требуется удалить.
         */
        [HttpDelete]
        [Route("DeleteBrand"), Authorize(Roles = "Администратор")]
        public void DeleteBrand(Guid id)
        {
            using (var db = new RSSForVKRContext())
            {
                db.Brands.Remove(db.Brands.Find(id));
                db.SaveChanges();
            }
        }
    }
}
