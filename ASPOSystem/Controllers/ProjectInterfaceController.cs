/* Класс "Контроллер связей протоколов и интерфейсов".
 * Название: ProjectInterfaceController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс позволяет работать со связями протоколов и интерфейсов.
 * Переменная, используемая в классе:
 *      db - переменная контекста базы данных.
 * Методы, используемые в классе:
 *      GetLinksForOneProject() - вывод названий интерфейсов, используемых в выбранном протоколе;
 *      CreateLinkFromAccount() - создание связей последнего созданного протокола и выбранных интерфейсов;
 *      UpdateLinkFromProjectChanger() - изменение связей выбранного протокола и интерфейсов.
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
    public class ProjectInterfaceController : Controller
    {
        /* GetLinksForOneProject() - вывод названий интерфейсов, используемых в выбранном протоколе.
         * Формальный параметр:
         *      projectName - название выбранного протокола.
         * Локальные переменные: 
         *      idInterfaces - идентификаторы интерфейсов, используемых в выбранном протоколе;
         *      namesOfInterfaces - названия интерфейсов, используемых в выбранном протоколе;
         *      d - переменная, используемая для перебора идентификаторов интерфейсов, используемых в выбранном протоколе.
         */
        [HttpGet]
        [Route("GetLinksForOneProject"), Authorize(Roles = "Администратор, Гость")]
        public List<string> GetLinksForOneProject(string projectName)
        {
            using (var db = new RSSForVKRContext())
            {
                List<Guid?> idInterfaces = db.ProjectInterface.Where(item => item.IdProject == (db.Project.FirstOrDefault(i => i.NameProject == projectName).Id)).Select(p => p.IdInterface).ToList();

                var namesOfInterfaces = new List<string>();

                idInterfaces.ForEach(x => namesOfInterfaces.Add(db.Interfaces.FirstOrDefault(i => i.Id == x).Name));

                return namesOfInterfaces;
            }
        }

        /* CreateLinkFromAccount() - создание связей последнего созданного протокола и выбранных интерфейсов.
         * Формальный параметр:
         *      namesOfInterfaces - список выбранных интерфейсов.
         * Локальные переменные:
         *      idOfProject - идентификатор последнего созданного протокола;
         *      newLink - новая связь протокола и интерфейса;
         *      noi - переменная, используемая для перебора выбранных интерфейсов.
         */
        [HttpPost]
        [Route("CreateLinkFromAccount"), Authorize(Roles = "Администратор, Гость")]
        public void CreateLinkFromAccount([FromBody] List<string> namesOfInterfaces)
        {
            using (var db = new RSSForVKRContext())
            {
                Guid idOfProject = db.Project.FirstOrDefault(item => item.DateCreateProject == db.Project.Max(p => p.DateCreateProject)).Id;
                foreach (string noi in namesOfInterfaces)
                {
                    ProjectInterface newLink = new ProjectInterface();
                    newLink.IdProject = idOfProject;
                    newLink.IdInterface = db.Interfaces.FirstOrDefault(inter => inter.Name == noi).Id;
                    db.ProjectInterface.Add(newLink);
                    db.SaveChanges();
                }
            }
        }

        /* UpdateLinkFromProjectChanger() - изменение связей выбранного протокола и интерфейсов.
         * Формальные параметры:
         *      projectName - название выбранного протокола;
         *      namesOfInterfaces - список выбранных интерфейсов.
         * Локальные переменные:
         *      nois - десериализированный список выбранных интерфейсов;
         *      idOfProject - идентификатор выбранного протокола;
         *      links - старые связи выбранного протокола и интерфейсов.
         *      l - переменная, используемая для перебора старых связей выбранного протокола и интерфейсов;
         *      noi - переменная, используемая для перебора выбранных интерфейсов для новых связей;
         *      Link - новая связь выбранного протокола и интерфейса.
         */
        [HttpPut]
        [Route("UpdateLinkFromProjectChanger"), Authorize(Roles = "Администратор, Гость")]
        public void UpdateLinkFromProjectChanger(string projectName, string namesOfInterfaces)
        {
            using (var db = new RSSForVKRContext())
            {
                List<string> nois = JsonConvert.DeserializeObject<List<string>>(namesOfInterfaces);

                Guid idOfProject = db.Project.FirstOrDefault(proj => proj.NameProject == projectName).Id;

                List<ProjectInterface> links = db.ProjectInterface.Where(link => link.IdProject == idOfProject).ToList();

                foreach (ProjectInterface l in links)
                {
                    db.ProjectInterface.Remove(l);                                                                                     // Удаление старых связей выбранного
                    db.SaveChanges();                                                                                                  // протокола и интерфейсов
                }

                foreach (string noi in nois)
                {
                    ProjectInterface Link = new ProjectInterface
                    {
                        IdProject = idOfProject,                                                                                       // Создание связей выбранного
                        IdInterface = db.Interfaces.FirstOrDefault(inter => inter.Name == noi).Id                                      // протокола с выбранными интерфейсами
                    };

                    db.ProjectInterface.Add(Link);
                    db.SaveChanges();
                }
            }
        }
    }
}
