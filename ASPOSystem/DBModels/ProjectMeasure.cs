/* Класс "Модель связей протоколов и измерений".
 * Название: ProjectMeasure.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает таблицу связей протоколов и измерений.
 * Свойства, описанные в классе:
 *      Id - поле Id таблицы связей протоколов и измерений;
 *      IdProject - поле IdProject таблицы связей протоколов и измерений;
 *      IdMeasure - поле IdMeasure таблицы связей протоколов и измерений;
 *      IdMeasureNavigation - связь измерения и протокола;
 *      IdProjectNavigation - связь протокола и измерения;
 */

using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class ProjectMeasure
    {
        public Guid Id { get; set; }
        public Guid? IdProject { get; set; }
        public Guid? IdMeasure { get; set; }

        public Measure IdMeasureNavigation { get; set; }
        public Project IdProjectNavigation { get; set; }
    }
}
