/* Класс "Контроллер связей протоколов и устройств".
 * Название: ProjectDeviceController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс позволяет работать со связями протоколов и устройств.
 * Переменная, используемая в классе:
 *      db - переменная контекста базы данных.
 * Функции, используемые в классе:
 *      GetLinksForOneProject() - вывод названий устройств, используемых в выбранном протоколе;
 *      CreateLinkFromAccount() - создание связей последнего созданного протокола и выбранных устройств;
 *      UpdateLinkFromProjectChanger() - изменение связей выбранного протокола и устройств.
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectDeviceController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        /* GetLinksForOneProject() - вывод названий устройств, используемых в выбранном протоколе.
         * Формальный параметр:
         *      projectName - название выбранного протокола.
         * Локальные переменные: 
         *      idDevices - идентификаторы устройств, используемых в выбранном протоколе;
         *      namesOfDevices - названия устройств, используемых в выбранном протоколе;
         *      d - переменная, используемая для перебора идентификаторов устройств, используемых в выбранном протоколе.
         */
        [HttpGet]
        [Route("GetLinksForOneProject"), Authorize(Roles = "Администратор, Гость")]
        public List<string> GetLinksForOneProject(string projectName)
        {
            List<Guid?> idDevices = db.ProjectDevice.Where(item=>item.IdProject == (db.Project.FirstOrDefault(i=>i.NameProject == projectName).Id)).Select(p=>p.IdDevice).ToList();
           
            List<string> namesOfDevices = new List<string>();
            
            foreach (Guid d in idDevices)
            {                                                                                                          // Заполнение списка названий,
                namesOfDevices.Add(db.Devices.FirstOrDefault(i=>i.Id == d).Model);                                     // используемых в протоколе устройств
            } 

            return namesOfDevices;
        }


        /* CreateLinkFromAccount() - создание связей последнего созданного протокола и выбранных устройств.
         * Формальный параметр:
         *      namesOfDevices - список выбранных устройств.
         * Локальные переменные:
         *      idOfProject - идентификатор последнего созданного протокола;
         *      newLink - новая связь протокола и устройства;
         *      nod - переменная, используемая для перебора выбранных устройств.
         */
        [HttpPost]
        [Route("CreateLinkFromAccount"), Authorize(Roles = "Администратор, Гость")]
        public void CreateLinkFromAccount([FromBody] List<string> namesOfDevices)
        {
            Guid idOfProject = db.Project.FirstOrDefault(item => item.DateCreateProject == db.Project.Max(p => p.DateCreateProject)).Id;
            foreach (string nod in namesOfDevices)
            {
                ProjectDevice newLink = new ProjectDevice();
                newLink.IdProject = idOfProject;
                newLink.IdDevice = db.Devices.FirstOrDefault(dev => dev.Model == nod).Id;
                db.ProjectDevice.Add(newLink);
                db.SaveChanges();
            }
        }

        /* UpdateLinkFromProjectChanger() - изменение связей выбранного протокола и устройств.
         * Формальные параметры:
         *      projectName - название выбранного протокола;
         *      namesOfDevices - список выбранных устройств.
         * Локальные переменные:
         *      nods - десериализированный список выбранных устройств;
         *      idOfProject - идентификатор выбранного протокола;
         *      links - старые связи выбранного протокола и устройств.
         *      l - переменная, используемая для перебора старых связей выбранного протокола и устройств;
         *      nod - переменная, используемая для перебора выбранных устройств для новых связей;
         *      Link - новая связь выбранного протокола и устройства.
         */
        [HttpPut]
        [Route("UpdateLinkFromProjectChanger"), Authorize(Roles = "Администратор, Гость")]
        public void UpdateLinkFromProjectChanger(string projectName, string namesOfDevices)
        {
            List<string> nods = JsonConvert.DeserializeObject<List<string>>(namesOfDevices);

            Guid idOfProject = db.Project.FirstOrDefault(proj => proj.NameProject == projectName).Id;

            List<ProjectDevice> links = db.ProjectDevice.Where(link => link.IdProject == idOfProject).ToList();

            foreach (ProjectDevice l in links)
            {
                db.ProjectDevice.Remove(l);                                                                            // Удаление старых связей выбранного
                db.SaveChanges();                                                                                      // протокола и устройств
            }

            foreach (string nod in nods)
            {
                ProjectDevice Link = new ProjectDevice
                { 
                    IdProject = idOfProject,                                                                           // Создание связей выбранного
                    IdDevice = db.Devices.FirstOrDefault(dev => dev.Model == nod).Id                                   // протокола с выбранными устройствами
                };

                db.ProjectDevice.Add(Link);
                db.SaveChanges();
            }
        }
    }
}
