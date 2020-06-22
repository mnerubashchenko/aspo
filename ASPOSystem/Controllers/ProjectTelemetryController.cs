/* Класс "Контроллер связей протоколов и телеметрий".
 * Название: ProjectTelemetryController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс позволяет работать со связями протоколов и телеметрий.
 * Переменная, используемая в классе:
 *      db - переменная контекста базы данных.
 * Методы, используемые в классе:
 *      GetLinksForOneProject() - вывод названий телеметрий, используемых в выбранном протоколе;
 *      CreateLinkFromAccount() - создание связей последнего созданного протокола и выбранных телеметрий;
 *      UpdateLinkFromProjectChanger() - изменение связей выбранного протокола и телеметрий.
 */

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectTelemetryController : Controller
    {
        /* GetLinksForOneProject() - вывод названий телеметрий, используемых в выбранном протоколе.
         * Формальный параметр:
         *      projectName - название выбранного протокола.
         * Локальные переменные: 
         *      idTelemetries - идентификаторы телеметрий, используемых в выбранном протоколе;
         *      namesOfTelemetries - названия телеметрий, используемых в выбранном протоколе;
         *      d - переменная, используемая для перебора идентификаторов телеметрий, используемых в выбранном протоколе.
         */
        [HttpGet]
        [Route("GetLinksForOneProject"), Authorize(Roles = "Администратор, Гость")]
        public List<string> GetLinksForOneProject(string projectName)
        {
            using (var db = new RSSForVKRContext())
            {
                List<Guid?> idTelemetries = db.ProjectTelemetry.Where(item => item.IdProject == (db.Project.FirstOrDefault(i => i.NameProject == projectName).Id)).Select(p => p.IdTelemetry).ToList();

                var namesOfTelemetries = new List<string>();

                idTelemetries.ForEach(x => namesOfTelemetries.Add(db.Telemetry.FirstOrDefault(i => i.Id == x).ShortName));

                return namesOfTelemetries;
            }
        }

        /* CreateLinkFromAccount() - создание связей последнего созданного протокола и выбранных телеметрий.
         * Формальный параметр:
         *      namesOfTelemetries - список выбранных телеметрий.
         * Локальные переменные:
         *      idOfProject - идентификатор последнего созданного протокола;
         *      newLink - новая связь протокола и телеметрии;
         *      not - переменная, используемая для перебора выбранных телеметрий.
         */
        [HttpPost]
        [Route("CreateLinkFromAccount"), Authorize(Roles = "Администратор, Гость")]
        public void CreateLinkFromAccount([FromBody] List<string> namesOfTelemetries)
        {
            using (var db = new RSSForVKRContext())
            {
                Guid idOfProject = db.Project.FirstOrDefault(item => item.DateCreateProject == db.Project.Max(p => p.DateCreateProject)).Id;
                foreach (string not in namesOfTelemetries)
                {
                    ProjectTelemetry newLink = new ProjectTelemetry();
                    newLink.IdProject = idOfProject;
                    newLink.IdTelemetry = db.Telemetry.FirstOrDefault(com => com.ShortName == not).Id;
                    db.ProjectTelemetry.Add(newLink);
                    db.SaveChanges();
                }
            }
        }

        /* UpdateLinkFromProjectChanger() - изменение связей выбранного протокола и телеметрий.
         * Формальные параметры:
         *      projectName - название выбранного протокола;
         *      namesOfTelemetries - список выбранных телеметрий.
         * Локальные переменные:
         *      nots - десериализированный список выбранных телеметрий;
         *      idOfProject - идентификатор выбранного протокола;
         *      links - старые связи выбранного протокола и телеметрий.
         *      l - переменная, используемая для перебора старых связей выбранного протокола и телеметрий;
         *      not - переменная, используемая для перебора выбранных телеметрий для новых связей;
         *      Link - новая связь выбранного протокола и телеметрии.
         */
        [HttpPut]
        [Route("UpdateLinkFromProjectChanger"), Authorize(Roles = "Администратор, Гость")]
        public void UpdateLinkFromProjectChanger(string projectName, string namesOfTelemetries)
        {
            using (var db = new RSSForVKRContext())
            {
                List<string> nots = JsonConvert.DeserializeObject<List<string>>(namesOfTelemetries);

                Guid idOfProject = db.Project.FirstOrDefault(proj => proj.NameProject == projectName).Id;

                List<ProjectTelemetry> links = db.ProjectTelemetry.Where(link => link.IdProject == idOfProject).ToList();

                foreach (ProjectTelemetry l in links)
                {                                                                                                               // Удаление старых связей выбранного  
                    db.ProjectTelemetry.Remove(l);                                                                              // протокола и телеметрий
                    db.SaveChanges();
                }

                foreach (string not in nots)
                {
                    ProjectTelemetry Link = new ProjectTelemetry
                    {
                        IdProject = idOfProject,                                                                                // Создание связей выбранного
                        IdTelemetry = db.Telemetry.FirstOrDefault(tel => tel.ShortName == not).Id                               // протокола с выбранными телеметриями
                    };

                    db.ProjectTelemetry.Add(Link);
                    db.SaveChanges();
                }
            }
        }
    }
}
