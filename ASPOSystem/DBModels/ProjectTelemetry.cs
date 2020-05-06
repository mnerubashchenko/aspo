/* Класс "Модель связей протоколов и телеметрий".
 * Название: ProjectTelemetry.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает таблицу связей протоколов и телеметрий.
 * Свойства, описанные в классе:
 *      Id - поле Id таблицы связей протоколов и телеметрий;
 *      IdProject - поле IdProject таблицы связей протоколов и телеметрий;
 *      IdTelemetry - поле IdTelemetry таблицы связей протоколов и телеметрий;
 *      IdMeasureNavigation - связь телеметрии и протокола;
 *      IdTelemetryNavigation - связь протокола и телеметрии;
 */

using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class ProjectTelemetry
    {
        public Guid Id { get; set; }
        public Guid? IdProject { get; set; }
        public Guid? IdTelemetry { get; set; }

        public Project IdProjectNavigation { get; set; }
        public Telemetry IdTelemetryNavigation { get; set; }
    }
}
