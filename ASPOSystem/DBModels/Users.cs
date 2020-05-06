/* Класс "Модель таблицы пользователей".
 * Название: Users.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает таблицу пользователей.
 * Свойства, описанные в классе:
 *      Id - поле Id таблицы пользователей;
 *      NameUser - поле NameUser таблицы пользователей;
 *      MiddlenameUser - поле MiddlenameUser таблицы пользователей;
 *      LastnameUser - поле LastnameUser таблицы пользователей;
 *      LoginUser - поле LoginUser таблицы пользователей;
 *      PasswordUser - поле PasswordUser таблицы пользователей;
 *      PostUser - поле PostUser таблицы пользователей;
 *      RoleUser - поле RoleUser таблицы пользователей;
 *      PostUserNavigation - связь пользователя и его должности;
 *      RoleUserNavigation - связь пользователя и его роли;
 *      Comments - связь конкретного пользователя и комментариев, которые он оставил;
 *      Project - связь конкретного пользователя и протоколов, которые он создал.
 */

using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Users
    {
        /* Конструктор класса Users. */
        public Users()
        {
            Comments = new HashSet<Comments>();
            Project = new HashSet<Project>();
        }

        public Guid Id { get; set; }
        public string NameUser { get; set; }
        public string MiddlenameUser { get; set; }
        public string LastnameUser { get; set; }
        public string LoginUser { get; set; }
        public string PasswordUser { get; set; }
        public Guid? PostUser { get; set; }
        public Guid? RoleUser { get; set; }

        public Posts PostUserNavigation { get; set; }
        public Roles RoleUserNavigation { get; set; }
        public ICollection<Comments> Comments { get; set; }
        public ICollection<Project> Project { get; set; }
    }
}
