/* Класс "Контроллер создание файла настроек JSON".
 * Название: JSONMakerController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс создает модель файла настроек JSON по выбранному протоколу.
 * Функция, используемая в классе:
 *      ConfigMaker() - создание модели файла настроек JSON по выбранному протоколу.
 */

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using ASPOSystem.DBModels;
using System.Collections;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JSONMakerController : Controller
    {
        /* ConfigMaker() - создание модели файла настроек JSON по выбранному протоколу.
         * Формальный параметр:
         *      nameProject - название протокола, по которому необходимо создать файл настроек JSON.
         * Локальные переменные:
         *      db - переменная контекста базы данных;
         *      idProject - идентификатор протокола, по которому необходимо создать файл настроек JSON;
         *      measures - вся информация об измерениях, используемых в выбранном протоколе;
         *      devices - вся информация об устройствах, используемых в выбранном протоколе;
         *      interfaces - вся информация об интерфейсах, используемых в выбранном протоколе;
         *      commands - вся информация о программных командах, используемых в выбранном протоколе;
         *      measuresId - идентификаторы всех измерений, хранящихся в базе данных;
         *      devicesId - идентификаторы всех устройств, хранящихся в базе данных;
         *      interfacesId - идентификаторы всех интерфейсов, хранящихся в базе данных;
         *      commandsId - идентификаторы всех программных команд, хранящихся в базе данных;
         *      telemetriesId - идентификаторы всех телеметрий, хранящихся в базе данных;
         *      mi - переменная для перебора идентификаторов измерений, используемых в выбранном протоколе;
         *      di - переменная для перебора идентификаторов устройств, используемых в выбранном протоколе;
         *      ii - переменная для перебора идентификаторов интерфейсов, используемых в выбранном протоколе;
         *      ci - переменная для перебора идентификаторов программных команд, используемых в выбранном протоколе;
         *      ti - переменная для перебора идентификаторов телеметрий, используемых в выбранном протоколе.
         */
        [HttpPost]
        [Route("ConfigMaker")]
        public object ConfigMaker(string nameProject)
        {
            RSSForVKRContext db = new RSSForVKRContext();

            Guid idProject = db.Project.FirstOrDefault(p => p.NameProject == nameProject).Id;

            List<Measure> measures = new List<Measure>();

            List<Devices> devices = new List<Devices>();

            List<Interfaces> interfaces = new List<Interfaces>();

            List<Programmcommands> commands = new List<Programmcommands>();

            List<Telemetry> telemetries = new List<Telemetry>();

            var measuresId = db.ProjectMeasure.Where(p => p.IdProject == idProject).Select(item => item.IdMeasure).ToList();            // Определение измерений, используемых
                                                                                                                                        // в выбранном протоколе
            foreach (Guid mi in measuresId)
            {
                measures.Add(db.Measure.FirstOrDefault(p => p.Id == mi));
            }

            var devicesId = db.ProjectDevice.Where(p => p.IdProject == idProject).Select(item => item.IdDevice).ToList();             // Определение устройств, используемых
                                                                                                                                      // в выбранном протоколе
            foreach (Guid di in devicesId)
            {
                devices.Add(db.Devices.FirstOrDefault(p => p.Id == di));
            }

            var interfacesId = db.ProjectInterface.Where(p => p.IdProject == idProject).Select(item => item.IdInterface).ToList();    // Определение интерфейсов, используемых
                                                                                                                                      // в выбранном протоколе
            foreach (Guid ii in interfacesId)
            {
                interfaces.Add(db.Interfaces.FirstOrDefault(p => p.Id == ii));
            }

            var commandsId = db.ProjectCommand.Where(p => p.IdProject == idProject).Select(item => item.IdCommand).ToList();          // Определение программных команд, используемых
                                                                                                                                      // в выбранном протоколе
            foreach (Guid ci in commandsId)
            {
                commands.Add(db.Programmcommands.FirstOrDefault(p => p.Id == ci));
            }

            var telemetriesId = db.ProjectTelemetry.Where(p => p.IdProject == idProject).Select(item => item.IdTelemetry).ToList();   // Определение телеметрий, используемых
                                                                                                                                      // в выбранном протоколе
            foreach (Guid ti in telemetriesId)
            {
                telemetries.Add(db.Telemetry.FirstOrDefault(p => p.Id == ti));
            }

            return new JsonModel { measures = measures, devices = devices, interfaces = interfaces, commands = commands, telemetryItems = telemetries };
        }
    }
}
