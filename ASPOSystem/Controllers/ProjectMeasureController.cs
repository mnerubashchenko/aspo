/* Класс "Контроллер связей протоколов и измерений".
 * Название: ProjectMeasureController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс позволяет работать со связями протоколов и измерений.
 * Переменная, используемая в классе:
 *      db - переменная контекста базы данных.
 * Методы, используемые в классе:
 *      GetLinksForOneProject() - вывод названий измерений, используемых в выбранном протоколе;
 *      CreateLinkFromAccount() - создание связей последнего созданного протокола и выбранных измерений;
 *      UpdateLinkFromProjectChanger() - изменение связей выбранного протокола и измерений.
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
    public class ProjectMeasureController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        /* GetLinksForOneProject() - вывод названий измерений, используемых в выбранном протоколе.
         * Формальный параметр:
         *      projectName - название выбранного протокола.
         * Локальные переменные: 
         *      idMeasures - идентификаторы измерений, используемых в выбранном протоколе;
         *      namesOfMeasures - названия измерений, используемых в выбранном протоколе;
         *      d - переменная, используемая для перебора идентификаторов измерений, используемых в выбранном протоколе.
         */
        [HttpGet]
        [Route("GetLinksForOneProject"), Authorize(Roles = "Администратор, Гость")]
        public List<string> GetLinksForOneProject(string projectName)
        {
            List<Guid?> idMeasures = db.ProjectMeasure.Where(item => item.IdProject == (db.Project.FirstOrDefault(i => i.NameProject == projectName).Id)).Select(p => p.IdMeasure).ToList();

            var namesOfMeasures = new List<string>();
                                                                                                                     
            idMeasures.ForEach(x => namesOfMeasures.Add(db.Measure.FirstOrDefault(i => i.Id == x).Name));

            return namesOfMeasures;
        }

        /* CreateLinkFromAccount() - создание связей последнего созданного протокола и выбранных интерфейсов.
         * Формальный параметр:
         *      namesOfMeasures - список выбранных измерений.
         * Локальные переменные:
         *      idOfProject - идентификатор последнего созданного протокола;
         *      newLink - новая связь протокола и измерения;
         *      nom - переменная, используемая для перебора выбранных измерений.
         */
        [HttpPost]
        [Route("CreateLinkFromAccount"), Authorize(Roles = "Администратор, Гость")]
        public void CreateLinkFromAccount([FromBody] List<string> namesOfMeasures)
        {
            Guid idOfProject = db.Project.FirstOrDefault(item => item.DateCreateProject == db.Project.Max(p=>p.DateCreateProject)).Id;
            foreach (string nom in namesOfMeasures)
            {
                ProjectMeasure newLink = new ProjectMeasure();
                newLink.IdProject = idOfProject;
                newLink.IdMeasure = db.Measure.FirstOrDefault(meas => meas.Name == nom).Id;
                db.ProjectMeasure.Add(newLink);
                db.SaveChanges();
            }
        }

        /* UpdateLinkFromProjectChanger() - изменение связей выбранного протокола и измерений.
         * Формальные параметры:
         *      projectName - название выбранного протокола;
         *      namesOfMeasures - список выбранных измерений.
         * Локальные переменные:
         *      noms - десериализированный список выбранных измерений;
         *      idOfProject - идентификатор выбранного протокола;
         *      links - старые связи выбранного протокола и измерений.
         *      l - переменная, используемая для перебора старых связей выбранного протокола и измерений;
         *      nom - переменная, используемая для перебора выбранных измерений для новых связей;
         *      Link - новая связь выбранного протокола и измерения.
         */
        [HttpPut]
        [Route("UpdateLinkFromProjectChanger")]
        public void UpdateLinkFromProjectChanger(string projectName, string namesOfMeasures)
        {
            List<string> noms = JsonConvert.DeserializeObject<List<string>>(namesOfMeasures);

            Guid idOfProject = db.Project.FirstOrDefault(proj => proj.NameProject == projectName).Id;

            List<ProjectMeasure> links = db.ProjectMeasure.Where(link => link.IdProject == idOfProject).ToList();

            foreach (ProjectMeasure l in links)
            {                                                                                                               // Удаление старых связей выбранного
                db.ProjectMeasure.Remove(l);                                                                                // протокола и  измерений
                db.SaveChanges();
            }

            foreach (string nom in noms)
            {
                ProjectMeasure Link = new ProjectMeasure
                {
                    IdProject = idOfProject,                                                                                // Создание связей выбранного
                    IdMeasure = db.Measure.FirstOrDefault(meas => meas.Name == nom).Id                                      // протокола с выбранными измерениями
                };

                db.ProjectMeasure.Add(Link);
                db.SaveChanges();
            }
        }
    }
}
