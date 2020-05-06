/* Класс "Модель таблицы программных команд".
 * Название: Programmcommands.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает таблицу программных команд.
 * Свойства, описанные в классе:
 *      Id - поле Id таблицы программных команд;
 *      Name - поле Name таблицы программных команд;
 *      Code - поле Code таблицы программных команд;
 *      LongName - поле LongName таблицы программных команд;
 *      Device - поле Device таблицы программных команд;
 *      ProjectCommand - связь конкретной программной команды и протоколов, использующих данную программную команду.
 */

using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Programmcommands
    {
        /* Конструктор класса Programmcommands. */
        public Programmcommands()
        {
            ProjectCommand = new HashSet<ProjectCommand>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string LongName { get; set; }
        public string Device { get; set; }

        public ICollection<ProjectCommand> ProjectCommand { get; set; }
    }
}
