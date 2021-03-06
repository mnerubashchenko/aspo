/* Класс "Контроллер создание файла настроек JSON".
 * Название: JSONMakerController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс создает модель файла настроек JSON по выбранному протоколу.
 * Метод, используемая в классе:
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

            var measures = new List<object>();

            var devices = new List<object>();

            var interfaces = new List<object>();

            var commands = new List<Programmcommands>();

            var telemetries = new List<Telemetry>();

            var measuresId = db.ProjectMeasure.Where(p => p.IdProject == idProject).Select(item => item.IdMeasure).ToList();            // Определение измерений, используемых
                                                                                                                                        // в выбранном протоколе
            foreach (Guid mi in measuresId)
            {
                measures.Add(db.Measure.Join(db.Typemeasure,
                    measure => measure.Type.ToString(),
                    type => type.Id.ToString(),
                    (measure, type) => new
                    {
                        measure.Id,
                        measure.Grouup,
                        measure.IsParent,
                        measure.IdMeasure,
                        measure.ParentId,
                        measure.Name,
                        measure.Caption,
                        measure.MinValue,
                        measure.MaxValue,
                        measure.IsCheck,
                        measure.Status,
                        Type = type.NameTypemeasure,
                        measure.Factor
                    }).ToList().FirstOrDefault(u => u.Id == mi));
            }

            var devicesId = db.ProjectDevice.Where(p => p.IdProject == idProject).Select(item => item.IdDevice).ToList();             // Определение устройств, используемых
                                                                                                                                      // в выбранном протоколе
            foreach (Guid di in devicesId)
            {
                var result = from device in db.Devices
                             join type in db.Typedev on device.Type equals type.Id
                             join brand in db.Brands on device.Brand equals brand.Id
                             where device.Id == di
                             select new
                             {
                                 device.Id,
                                 Type = type.NameTypedev,
                                 device.Caption,
                                 Brand = brand.NameBrand,
                                 device.Model,
                                 device.Status,
                                 device.IpInput,
                                 device.ActualIp,
                                 device.Port,
                                 device.PositionNumber
                             };
                devices.Add(result.ToList().First());
            }

            var interfacesId = db.ProjectInterface.Where(p => p.IdProject == idProject).Select(item => item.IdInterface).ToList();    // Определение интерфейсов, используемых
                                                                                                                                      // в выбранном протоколе
            foreach (Guid ii in interfacesId)
            {
                interfaces.Add(db.Interfaces.Join(db.Typeinter,
                    inter => inter.Type.ToString(),
                    type => type.Id.ToString(),
                    (inter, type) => new
                    {
                        inter.Id,
                        inter.Name,
                        inter.IsReadyStatus,
                        inter.IsUsed,
                        inter.SelectedPort,
                        type.NameTypeinter,
                        inter.IpInput,
                        inter.ActualIp
                    }).ToList().FirstOrDefault(u => u.Id == ii));
            }

            var commandsId = db.ProjectCommand.Where(p => p.IdProject == idProject).Select(item => item.IdCommand).ToList();

            commandsId.ForEach(x => commands.Add(db.Programmcommands.FirstOrDefault(p => p.Id == x)));

            var telemetriesId = db.ProjectTelemetry.Where(p => p.IdProject == idProject).Select(item => item.IdTelemetry).ToList();

            telemetriesId.ForEach(x => telemetries.Add(db.Telemetry.FirstOrDefault(p => p.Id == x)));

            return new JsonModel { measures = measures, devices = devices, interfaces = interfaces, commands = commands, telemetryItems = telemetries };
        }
    }
}
