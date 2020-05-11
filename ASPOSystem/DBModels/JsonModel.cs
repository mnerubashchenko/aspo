/* Класс "Модель файла настроек JSON".
 * Название: JsonModel.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает структуру файла настроек JSON.
 * Свойства, описанные в классе:
 *      measures - список измерений;
 *      devices - список устройств;
 *      interfaces - список интерфейсов;
 *      commands - список программных команд;
 *      telemetryItems - список телеметрий.
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPOSystem.DBModels
{
    public class JsonModel
    {
        public List<object> measures { get; set; }
        public List<object> devices { get; set; }
        public List<object> interfaces { get; set; }
        public List<Programmcommands> commands { get; set; }
        public List<Telemetry> telemetryItems { get; set; }
    }
}
