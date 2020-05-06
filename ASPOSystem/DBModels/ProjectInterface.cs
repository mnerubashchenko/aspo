/* Класс "Модель связей протоколов и интерфейсов".
 * Название: ProjectInterface.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает таблицу связей протоколов и интерфейсов.
 * Свойства, описанные в классе:
 *      Id - поле Id таблицы связей протоколов и интерфейсов;
 *      IdProject - поле IdProject таблицы связей протоколов и интерфейсов;
 *      IdInterface - поле IdInterface таблицы связей протоколов и интерфейсов;
 *      IdInterfaceNavigation - связь интерфейса и протокола;
 *      IdProjectNavigation - связь протокола и интерфейса;
 */

using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class ProjectInterface
    {
        public Guid Id { get; set; }
        public Guid? IdProject { get; set; }
        public Guid? IdInterface { get; set; }

        public Interfaces IdInterfaceNavigation { get; set; }
        public Project IdProjectNavigation { get; set; }
    }
}
