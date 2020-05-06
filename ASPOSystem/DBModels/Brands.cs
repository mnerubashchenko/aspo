/* Класс "Модель таблицы брендов устройств".
 * Название: Brands.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает таблицу брендов устройств.
 * Свойства, описанные в классе:
 *      Id - поле Id таблицы брендов;
 *      NameBrand - поле NameBrand таблицы брендов;
 *      Devices - связь конкретного бренда и устройств, использующих данный бренд.
 */

using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Brands
    {
        /* Конструктор класса Brands. */
        public Brands()
        {
            Devices = new HashSet<Devices>();
        }

        public Guid Id { get; set; }
        public string NameBrand { get; set; }

        public ICollection<Devices> Devices { get; set; }
    }
}
