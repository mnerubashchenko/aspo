/* Класс "Модель связей протоколов и программных команд".
 * Название: ProjectCommand.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает таблицу связей протоколов и программных команд.
 * Свойства, описанные в классе:
 *      Id - поле Id таблицы связей протоколов и программных команд;
 *      IdProject - поле IdProject таблицы связей протоколов и программных команд;
 *      IdCommand - поле IdCommand таблицы связей протоколов и программных команд;
 *      IdCommandNavigation - связь программной команды и протокола;
 *      IdProjectNavigation - связь протокола и программной команды;
 */

using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class ProjectCommand
    {
        public Guid Id { get; set; }
        public Guid? IdProject { get; set; }
        public Guid? IdCommand { get; set; }

        public Programmcommands IdCommandNavigation { get; set; }
        public Project IdProjectNavigation { get; set; }
    }
}
