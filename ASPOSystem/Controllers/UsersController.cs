/* Класс "Контроллер пользователей".
 * Название: UsersController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс позволяет работать с информацией о пользователях.
 * Переменная, используемая в классе:
 *      db - переменная контекста базы данных.
 * Функции, используемые в классе:
 *      GetUsers() - вывод записей из таблицы пользователей;
 *      GetUserForAccount() - вывод информации об авторизированном пользователе;
 *      GetIdOfAuthorizedUser() - вывод идентификатора авторизированного пользователя;
 *      CreateUser() -  создание записи о пользователе;
 *      UpdateUser() - изменение записи о пользователе;
 *      PasswordChanger() - изменение пароля пользователя;
 *      HashPassword() - хэширование пароля;
 *      DeleteUser() - удаление записи о пользователе.
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        /* GetUsers() - вывод записей таблицы пользователей.
         * Формальный параметр:
         *      correction - параметр, уточняющий, все ли данные нужны.
         */
        [HttpGet]
        [Route("GetUsers"), Authorize(Roles = "Администратор, Гость")]
        public List<Users> GetUsers(string correction)
        {
            if (correction == "full")
                return db.Users.ToList();
            else
                return db.Users.Where(p => p.Id.ToString() != "00000000-0000-0000-0000-000000000000" 
                && p.Id.ToString() != "11111111-1111-1111-1111-111111111111").ToList();
        }

        /* GetUserForAccount() - вывод информации об авторизированном пользователе.
         * Формальный параметр:
         *      login - логин авторизированного пользователя.
         */
        [HttpGet]
        [Route("GetUserForAccount"), Authorize(Roles = "Администратор, Гость")]
        public List<Users> GetUserForAccount(string login)
        {
            return db.Users.Where(p => p.LoginUser == login).ToList();
        }

        /* GetIdOfAuthorizedUser() - вывод идентификатора авторизированного пользователя.
         * Формальный параметр:
         *      login - логин авторизированного пользователя.
         */
        [HttpGet]
        [Route("GetIdOfAuthorizedUser"), Authorize(Roles = "Администратор, Гость")]
        public Guid GetIdOfAuthorizedUser (string login)
        {
            return db.Users.FirstOrDefault(p => p.LoginUser == login).Id;
        }

        /* CreateUser() - создание записи о пользователе.
         * Формальный параметр:
         *      newUser - информация о добавляемом пользователе.
         * Локальная переменная:
         *      salt - соль для хэширования пароля.
         */
        [AllowAnonymous]
        [HttpPost]
        [Route("CreateUser")]
        public IActionResult CreateUser([FromBody] Users newUser)
        {
            if (db.Users.Any(r=> r.LoginUser == newUser.LoginUser))                                                        // Проверка занятости
                return BadRequest("Данный логин занят");                                                                   // введенного логина
            else
            {
                var salt = new byte[128 / 8];

                using (var rng = RandomNumberGenerator.Create())
                {
                rng.GetBytes(salt);
                }

                newUser.PasswordUser = HashPassword(Convert.ToBase64String(salt), newUser.PasswordUser);

                newUser.RoleUser = new Guid("775ACD72-5459-EA11-B83A-645106511DF0");

                db.Users.Add(newUser);
                db.SaveChanges();

                return Ok();
            }
        }


        /* UpdateUser() - изменение записи о пользователе.
         * Формальный параметр:
         *      updatedUser - информация об изменяемом пользователе.
         * Локальные переменные:
         *      user - информация об изменяемом пользователе;
         *      salt - соль для хэширования пароля.
         */
        [HttpPut]
        [Route("UpdateUser"), Authorize(Roles = "Администратор, Гость")]
        public IActionResult UpdateUser([FromBody] Users updatedUser)
        {
            Users user = db.Users.FirstOrDefault(r=>r.Id == updatedUser.Id);

            if ((user.LoginUser == updatedUser.LoginUser) || (!db.Users.Any(r => r.LoginUser == updatedUser.LoginUser)))      // Проверка занятости введенного логина
            {                                                                                                               
                if (user.PasswordUser != updatedUser.PasswordUser)                                                            // Проверка на то, был ли изменен пароль   
                {
                    var salt = new byte[128 / 8];

                    using (var rng = RandomNumberGenerator.Create())
                    {
                        rng.GetBytes(salt);
                    }

                    user.PasswordUser = HashPassword(Convert.ToBase64String(salt), updatedUser.PasswordUser);
                }

                user.LastnameUser = updatedUser.LastnameUser;
                user.LoginUser = updatedUser.LoginUser;
                user.MiddlenameUser = updatedUser.MiddlenameUser;
                user.NameUser = updatedUser.NameUser;
                user.PostUser = updatedUser.PostUser;
                user.RoleUser = updatedUser.RoleUser;

                db.SaveChanges();

                return Ok();
            }

            else 
                return BadRequest("Данный логин занят!");
        }


        /* PasswordChanger() - изменение пароля пользователя.
         * Формальные параметры:
         *      login - логин пользователя;
         *      oldPassword -  старый пароль пользователя;
         *      newPassword - новый пароль пользователя.
         * Локальные переменные:
         *      user - информация о пользователе, которому требуется смена пароля;
         *      saltOfOldPass - соль старого пароля пользователя;
         *      hashedOldPass - хэш старого пароля пользователя;
         *      salt - соль нового пароля пользователя.
         */
        [HttpPut]
        [Route("PasswordChanger"), Authorize(Roles = "Администратор, Гость")]
        public IActionResult PasswordChanger(string login, string oldPassword, string newPassword)
        {
            Users user = db.Users.FirstOrDefault(p => p.LoginUser == login);

            string saltOfOldPass = user.PasswordUser.ToString().Substring(0, 24);

            string hashedOldPass = HashPassword(saltOfOldPass, oldPassword);

            if (hashedOldPass == user.PasswordUser.ToString())                                                                // Проверка правильности
            {                                                                                                                 // введенного старого пароля
                var salt = new byte[128 / 8];

                using (var rng = RandomNumberGenerator.Create())
                {
                    rng.GetBytes(salt);
                }

                user.PasswordUser = HashPassword(Convert.ToBase64String(salt), newPassword);

                db.SaveChanges();

                return Ok();
            }

            else 
                return BadRequest("Неправильно введен ваш старый пароль");
        }


        /* HashPassword() - хэширование пароля.
         * Формальные параметры:
         *      salt - соль для хэширования пароля;
         *      pass -  пароль.
         * Локальная переменная:
         *      hashed - хэш пароля.
         */
        public string HashPassword (string salt, string pass)
        {
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: pass,
                salt: Convert.FromBase64String(salt),
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return string.Concat(salt, hashed);
        }

        /* DeleteUser() - удаление записи о пользователе.
         * Формальный параметр:
         *      idUser - идентификатор пользователя, которого требуется удалить.
         */
        [HttpDelete]
        [Route("DeleteUser"), Authorize(Roles = "Администратор")]
        public void DeleteUser(Guid idUser)
        {
            db.Users.Remove(db.Users.Find(idUser));
            db.SaveChanges();
        }
    }
}
