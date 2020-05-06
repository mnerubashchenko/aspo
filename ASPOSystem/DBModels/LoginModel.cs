/* Класс "Модель формы данных авторизации".
 * Название: LoginModel.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс описывает структуру данных при авторизации.
 * Свойства, описанные в классе:
 *      UserName - логин пользователя;
 *      Password - пароль пользователя.
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ASPOSystem.DBModels
{
    public class LoginModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}