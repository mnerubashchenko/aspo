/* Класс "Модель таблицы типов интерфейсов".
 * Название: Typeinter.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает таблицу типов интерфейсов.
 * Свойства, описанные в классе:
 *      Id - поле Id таблицы типов интерфейсов;
 *      NameTypeinter - поле NameTypeinter таблицы типов интерфейсов;
 *      Interfaces - связь конкретного типа и интерфейсов, имеющих данный тип.
 */

using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Typeinter
    {
        /* Конструктор класса Typeinter. */
        public Typeinter()
        {
            Interfaces = new HashSet<Interfaces>();
        }

        public Guid Id { get; set; }
        public string NameTypeinter { get; set; }

        public ICollection<Interfaces> Interfaces { get; set; }
    }
}
