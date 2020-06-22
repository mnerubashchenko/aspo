/* Класс "Контроллер протоколов".
 * Название: ProjectsController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс позволяет работать с информацией о протоколах.
 * Переменная, используемая в классе:
 *      db - переменная контекста базы данных.
 * Методы, используемые в классе:
 *      GetProjects() - вывод всех записей из таблицы протоколов;
 *      GetNamesOfProjects() - вывод названий всех протоколов;
 *      GetOneProject() - вывод информации об одном выбранном протоколе;
 *      GetPersonalProjects() -  вывод протоколов, создателем которых является авторизированный пользователь;
 *      CreateProject() - создание записи о протоколе;
 *      UpdateProject() - изменение записи о протоколе из расширенной версии приложения;
 *      UpdateProjectFromProjectChanger() - изменение записи о протоколе из базовой версии приложения;
 *      DeleteProject() - удаление записи о протоколе.
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectsController : Controller
    {
        /* GetProjects() - вывод всех записей из таблицы протоколов. */
        [HttpGet]
        [Route("GetProjects"), Authorize(Roles = "Администратор, Гость")]
        public List<Project> GetProjects()
        {
            using (var db = new RSSForVKRContext())
            {
                return db.Project.ToList();
            }
        }

        /* GetNamesOfProjects() - вывод названий всех протоколов. */
        [HttpGet]
        [Route("GetNamesOfProjects"), Authorize(Roles = "Администратор, Гость")]
        public List<string> GetNamesOfProjects()
        {
            using (var db = new RSSForVKRContext())
            {
                return db.Project.Select(item => item.NameProject).ToList();
            }
        }

        /* GetOneProject() - вывод информации об одном выбранном протоколе.
         * Формальный параметр:
         *      projectName - название протокола, о котором требуется информация.
         */
        [HttpGet]
        [Route("GetOneProject"), Authorize(Roles = "Администратор, Гость")]
        public Project GetOneProject(string projectName)
        {
            using (var db = new RSSForVKRContext())
            {
                return db.Project.FirstOrDefault(r => r.NameProject == projectName);
            }
        }

        /* GetPersonalProjects() - вывод протоколов, создателем которых является авторизированный пользователь.
         * Формальный параметр:
         *      author - логин авторизированного пользователя.
         */
        [HttpGet]
        [Route("GetPersonalProjects"), Authorize(Roles = "Администратор, Гость")]
        public List<Project> GetPersonalProjects(string author)
        {
            using (var db = new RSSForVKRContext())
            {
                return db.Project.Where(p => p.DirectorProject == db.Users.FirstOrDefault(r => r.LoginUser == author).Id).ToList();
            }
        }

        /* CreateProject() - создание записи о протоколе.
         * Формальный параметр:
         *      newProject - информация о добавляемом протоколе.
         */
        [HttpPost]
        [Route("CreateProject"), Authorize(Roles = "Администратор, Гость")]
        public IActionResult CreateProject([FromBody] Project newProject)
        {
            using (var db = new RSSForVKRContext())
            {
                if (db.Project.Any(i => i.NameProject.ToLower() == newProject.NameProject.ToLower()))                                    // Проверка занятости введенного
                    return BadRequest("Протокол с таким названием уже существует!");                                                     // название протокола
                else if (newProject.NameProject == "" || newProject.NameProject == null)
                    return BadRequest("Вы не ввели название протокола!");
                else
                {
                    newProject.DateCreateProject = DateTime.Now;
                    db.Project.Add(newProject);
                    db.SaveChanges();

                    return Ok();
                }
            }
        }

        /* UpdateProject() - изменение записи о протоколе из расширенной версии приложения.
         * Формальный параметр:
         *      updatedProject - информация об изменяемом протоколе.
         */
        [HttpPut]
        [Route("UpdateProject"), Authorize(Roles = "Администратор, Гость")]
        public void UpdateProject([FromBody] Project updatedProject)
        {
            using (var db = new RSSForVKRContext())
            {
                db.Project.Update(updatedProject);
                db.SaveChanges();
            }
        }

        /* UpdateProjectFromProjectChanger() - изменение записи о протоколе из базовой версии приложения.
         * Формальные параметры:
         *      projectId - идентификатор протокола, информацию которого требуется изменить;
         *      newProjectName - новое название протокола;
         *      newProjectDescription - новое описание протокола.
         * Локальная переменная:
         *      updatedProject - информация об изменяемом протоколе.
         */
        [HttpPut]
        [Route("UpdateProjectFromProjectChanger")]
        public IActionResult UpdateProjectFromProjectChanger(string projectId, string newProjectName, string newProjectDescription)
        {
            using (var db = new RSSForVKRContext())
            {
                Project updatedProject = db.Project.FirstOrDefault(proj => proj.Id.ToString() == projectId);

                if ((updatedProject.NameProject == newProjectName) || (!db.Project.Any(p => p.NameProject == newProjectName)))           // Проверка занятости введенного 
                {                                                                                                                        // названия протокола
                    updatedProject.NameProject = newProjectName;
                    updatedProject.DescriptionProject = newProjectDescription;

                    db.Project.Update(updatedProject);
                    db.SaveChanges();
                    return Ok();
                }

                else
                    return BadRequest("Проект с таким названием уже существует!");
            }
        }

        /* DeleteProject() - удаление записи о протоколе.
         * Формальный параметр:
         *      idProject - идентификатор протокола, который требуется удалить.
         */
        [HttpDelete]
        [Route("DeleteProject"), Authorize(Roles = "Администратор, Гость")]
        public void DeleteProject(Guid idProject)
        {
            using (var db = new RSSForVKRContext())
            {
                db.Project.Remove(db.Project.Find(idProject));
                db.SaveChanges();
            }
        }
    }
}
