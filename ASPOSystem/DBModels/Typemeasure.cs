/* Класс "Модель таблицы типов измерений".
 * Название: Typemeasure.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает таблицу типов измерений.
 * Свойства, описанные в классе:
 *      Id - поле Id таблицы типов измерений;
 *      NameTypemeasure - поле NameTypemeasure таблицы типов измерений;
 *      Measure - связь конкретного типа и измерений, имеющих данный тип.
 */

using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Typemeasure
    {
        public Typemeasure()
        {
            Measure = new HashSet<Measure>();
        }

        public Guid Id { get; set; }
        public string NameTypemeasure { get; set; }

        public ICollection<Measure> Measure { get; set; }
    }
}
