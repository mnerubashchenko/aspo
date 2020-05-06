/* Класс "Модель таблицы типов устройств".
 * Название: Typedev.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает таблицу типов устройств.
 * Свойства, описанные в классе:
 *      Id - поле Id таблицы типов устройств;
 *      NameTypedev - поле NameTypedev таблицы типов устройств;
 *      Devices - связь конкретного типа и устройств, имеющих данный тип.
 */

using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Typedev
    {
        /* Конструктор класса Typedev. */
        public Typedev()
        {
            Devices = new HashSet<Devices>();
        }

        public Guid Id { get; set; }
        public string NameTypedev { get; set; }

        public ICollection<Devices> Devices { get; set; }
    }
}
