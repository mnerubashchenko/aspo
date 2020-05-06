/* Класс "Модель таблицы должностей пользователей".
 * Название: Posts.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает таблицу должностей пользователей.
 * Свойства, описанные в классе:
 *      Id - поле Id таблицы должностей пользователей;
 *      NamePost - поле NamePost таблицы должностей пользователей;
 *      Users - связь конкретной должности и пользователей, занимающих данную должность.
 */

using System;
using System.Collections.Generic;

namespace ASPOSystem.DBModels
{
    public partial class Posts
    {
        /* Конструктор класса Posts. */
        public Posts()
        {
            Users = new HashSet<Users>();
        }

        public Guid Id { get; set; }
        public string NamePost { get; set; }

        public ICollection<Users> Users { get; set; }
    }
}
