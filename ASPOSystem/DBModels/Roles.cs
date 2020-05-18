/* Класс "Модель таблицы ролей пользователей".
 * Название: Roles.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает таблицу ролей пользователей.
 * Свойства, описанные в классе:
 *      Id - поле Id таблицы ролей пользователей;
 *      NameRole - поле NameRole таблицы ролей пользователей;
 *      Users - связь конкретной роли и пользователей, имеющих данную роль.
 */

using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Roles
    {
        public Roles()
        {
            Users = new HashSet<Users>();
        }

        public Guid Id { get; set; }
        public string NameRole { get; set; }

        public ICollection<Users> Users { get; set; }
    }
}
