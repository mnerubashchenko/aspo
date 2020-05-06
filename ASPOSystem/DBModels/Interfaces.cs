/* Класс "Модель таблицы интерфейсов".
 * Название: Interfaces.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает таблицу интерфейсов.
 * Свойства, описанные в классе:
 *      Id - поле Id таблицы интерфейсов;
 *      Name - поле Name таблицы интерфейсов;
 *      IsReadyStatus - поле IsReadyStatus таблицы интерфейсов;
 *      IsUsed - поле IsUsed таблицы интерфейсов;
 *      SelectedPort - поле SelectedPort таблицы интерфейсов;
 *      Type - поле Type таблицы интерфейсов;
 *      IpInput - поле IpInput таблицы интерфейсов;
 *      ActualIp - поле ActualIp таблицы интерфейсов;
 *      TypeNavigation - связь интерфейса и его типа;
 *      ProjectInterface - связь конкретного интерфейса и протоколов, использующих данный интерфейс.
 */

using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Interfaces
    {
        /* Конструктор класса Interfaces. */
        public Interfaces()
        {
            ProjectInterface = new HashSet<ProjectInterface>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string IsReadyStatus { get; set; }
        public string IsUsed { get; set; }
        public string SelectedPort { get; set; }
        public Guid? Type { get; set; }
        public string IpInput { get; set; }
        public string ActualIp { get; set; }

        public Typeinter TypeNavigation { get; set; }
        public ICollection<ProjectInterface> ProjectInterface { get; set; }
    }
}
