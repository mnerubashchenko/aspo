/* Класс "Модель таблицы телеметрий".
 * Название: Telemetry.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает таблицу телеметрий.
 * Свойства, описанные в классе:
 *      Id - поле Id таблицы телеметрий;
 *      HasItems - поле HasItems таблицы телеметрий;
 *      ParentId - поле ParentId таблицы телеметрий;
 *      LongName - поле LongName таблицы телеметрий;
 *      ShortName - поле ShortName таблицы телеметрий;
 *      ByteNumber - поле ByteNumber таблицы телеметрий;
 *      StartBit - поле StartBit таблицы телеметрий;
 *      Lenght - поле Lenght таблицы телеметрий;
 *      PossibleValues - поле PossibleValues таблицы телеметрий;
 *      Value - поле Value таблицы телеметрий;
 *      ProjectTelemetry -  связь конкретной телеметрии и протоколов, использующих данную телеметрию.
 */

using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Telemetry
    {
        /* Конструктор класса Telemetry. */
        public Telemetry()
        {
            ProjectTelemetry = new HashSet<ProjectTelemetry>();
        }

        public Guid Id { get; set; }
        public string HasItems { get; set; }
        public string ParentId { get; set; }
        public string LongName { get; set; }
        public string ShortName { get; set; }
        public int? ByteNumber { get; set; }
        public int? StartBit { get; set; }
        public int? Lenght { get; set; }
        public string PossibleValues { get; set; }
        public string Value { get; set; }

        public ICollection<ProjectTelemetry> ProjectTelemetry { get; set; }
    }
}
