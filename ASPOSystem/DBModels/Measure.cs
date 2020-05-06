/* Класс "Модель таблицы измерений".
 * Название: Measure.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает таблицу измерений.
 * Свойства, описанные в классе:
 *      Id - поле Id таблицы измерений;
 *      Grouup - поле Grouup таблицы измерений;
 *      IsParent - поле IsParent таблицы измерений;
 *      IdMeasure - поле IdMeasure таблицы измерений;
 *      ParentId - поле ParentId таблицы измерений;
 *      Name - поле Name таблицы измерений;
 *      Caption - поле Caption таблицы измерений;
 *      MinValue - поле MinValue таблицы измерений;
 *      MaxValue - поле MaxValue таблицы измерений;
 *      IsCheck - поле IsCheck таблицы измерений;
 *      Status - поле Status таблицы измерений;
 *      Type - поле Type таблицы измерений;
 *      Factor - поле Factor таблицы измерений;
 *      TypeNavigation - связь измерения и его типа;
 *      ProjectMeasure - связь конкретного измерения и протоколов, использующих данное измерение.
 */

using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Measure
    {
        /* Конструктор класса Measure. */
        public Measure()
        {
            ProjectMeasure = new HashSet<ProjectMeasure>();
        }

        public Guid Id { get; set; }
        public string Grouup { get; set; }
        public string IsParent { get; set; }
        public string IdMeasure { get; set; }
        public string ParentId { get; set; }
        public string Name { get; set; }
        public string Caption { get; set; }
        public int? MinValue { get; set; }
        public int? MaxValue { get; set; }
        public string IsCheck { get; set; }
        public string Status { get; set; }
        public Guid? Type { get; set; }
        public string Factor { get; set; }

        public Typemeasure TypeNavigation { get; set; }
        public ICollection<ProjectMeasure> ProjectMeasure { get; set; }
    }
}
