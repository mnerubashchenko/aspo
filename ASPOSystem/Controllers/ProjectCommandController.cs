/* Класс "Контроллер связей протоколов и программных команд".
 * Название: ProjectCommandController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс позволяет работать со связями протоколов и программных команд.
 * Переменная, используемая в классе:
 *      db - переменная контекста базы данных.
 * Функции, используемые в классе:
 *      GetLinksForOneProject() - вывод названий программных команд, используемых в выбранном протоколе;
 *      CreateLinkFromAccount() - создание связей последнего созданного протокола и выбранных программных команд;
 *      UpdateLinkFromProjectChanger() - изменение связей выбранного протокола и программных команд.
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
    public class ProjectCommandController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        /* GetLinksForOneProject() - вывод названий программных команд, используемых в выбранном протоколе.
         * Формальный параметр:
         *      projectName - название выбранного протокола.
         * Локальные переменные: 
         *      idCommands - идентификаторы програмнных команд, используемых в выбранном протоколе;
         *      namesOfCommands - названия программных команд, используемых в выбранном протоколе;
         *      d - переменная, используемая для перебора идентификаторов программных команд, используемых в выбранном протоколе.
         */
        [HttpGet]
        [Route("GetLinksForOneProject"), Authorize(Roles = "Администратор, Гость")]
        public List<string> GetLinksForOneProject(string projectName)
        {
            List<Guid?> idCommands = db.ProjectCommand.Where(item => item.IdProject == (db.Project.FirstOrDefault(i => i.NameProject == projectName).Id)).Select(p => p.IdCommand).ToList();

            List<string> namesOfCommands = new List<string>();

            foreach (Guid d in idCommands)                                                                                   // Заполнение списка названий, используемых 
            {                                                                                                                // в протоколе программных команд
                namesOfCommands.Add(db.Programmcommands.FirstOrDefault(i => i.Id == d).Name);
            }

            return namesOfCommands;
        }


        /* CreateLinkFromAccount() - создание связей последнего созданного протокола и выбранных программных команд.
         * Формальный параметр:
         *      namesOfCommands - список выбранных программных команд.
         * Локальные переменные:
         *      idOfProject - идентификатор последнего созданного протокола;
         *      newLink - новая связь протокола и программной команды;
         *      noc - переменная, используемая для перебора выбранных программных команд.
         */
        [HttpPost]
        [Route("CreateLinkFromAccount"), Authorize(Roles = "Администратор, Гость")]
        public void CreateLinkFromAccount([FromBody] List<string> namesOfCommands)
        {
            Guid idOfProject = db.Project.FirstOrDefault(item => item.DateCreateProject == db.Project.Max(p => p.DateCreateProject)).Id;
            foreach (string noc in namesOfCommands)
            {
                ProjectCommand newLink = new ProjectCommand();
                newLink.IdProject = idOfProject;
                newLink.IdCommand = db.Programmcommands.FirstOrDefault(com => com.Name == noc).Id;
                db.ProjectCommand.Add(newLink);
                db.SaveChanges();
            }
        }

        /* UpdateLinkFromProjectChanger() - изменение связей выбранного протокола и программных команд.
         * Формальные параметры:
         *      projectName - название выбранного протокола;
         *      namesOfCommands - список выбранных программных команд.
         * Локальные переменные:
         *      nocs - десериализированный список выбранных программных команд;
         *      idOfProject - идентификатор выбранного протокола;
         *      links - старые связи выбранного протокола и программных команд.
         *      l - переменная, используемая для перебора старых связей выбранного протокола и программных команд;
         *      noc - переменная, используемая для перебора выбранных программных команд для новых связей;
         *      Link - новая связь выбранного протокола и программной команды.
         */
        [HttpPut]
        [Route("UpdateLinkFromProjectChanger"), Authorize(Roles = "Администратор, Гость")]
        public void UpdateLinkFromProjectChanger(string projectName, string namesOfCommands)
        {
            List<string> nocs = JsonConvert.DeserializeObject<List<string>>(namesOfCommands);

            Guid idOfProject = db.Project.FirstOrDefault(proj => proj.NameProject == projectName).Id;

            List<ProjectCommand> links = db.ProjectCommand.Where(link => link.IdProject == idOfProject).ToList();

            foreach (ProjectCommand l in links)
            {
                db.ProjectCommand.Remove(l);                                                                                 // Удаление старых связей выбранного
                db.SaveChanges();                                                                                            // протокола и программных команд
            } 

            foreach (string noc in nocs)
            {
                ProjectCommand Link = new ProjectCommand
                {
                    IdProject = idOfProject,                                                                                 // Создание связей выбранного протокола
                    IdCommand = db.Programmcommands.FirstOrDefault(com => com.Name == noc).Id                                // с выбранными программными командами
                };

                db.ProjectCommand.Add(Link);
                db.SaveChanges();
            }
        }
    }
}
