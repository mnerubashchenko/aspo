/* Класс "Контроллер авторизации".
 * Название: AuthController.
 * Язык: C#.
 * Краткое описание:
 *      Данный класс производит авторизацию и аутентификацию пользователя.
 * Переменная, используемая в классе:
 *      db - переменная контекста базы данных.
 * Методы, используемые в классе:
 *      Login() - авторизация и аутентификация пользователя;
 *      GetSalt_Hash() - получение соли и хэша введенного пользователем пароля.
 */

using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace ASPOSystem.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        /* Login() - авторизация и аутентификация пользователя.
         * Формальный параметр:
         *      user - пароль и логин пользователя.
         * Локальные переменные:
         *      secretKey - секретный ключ для формирования JWT токена;
         *      signinCredentials - секретный ключ и алгоритм для кодирования токена;
         *      role - роль пользователя;
         *      claims - данные пользователя;
         *      tokeOptions - настройки JWT токена;
         *      tokerString - сформированный JWT токен.
         */
        [HttpPost, Route("login")]
        public IActionResult Login([FromBody]LoginModel user)
        {
            if (db.Users.Any(r=> r.LoginUser.ToString() == user.UserName && r.PasswordUser.ToString() == string.Concat(GetSalt_Hash(user.UserName,user.Password).Item1, GetSalt_Hash(user.UserName, user.Password).Item2)))
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var role = db.Roles.FirstOrDefault(r => r.Id == db.Users.FirstOrDefault(t => t.LoginUser == user.UserName).RoleUser).NameRole.ToString();
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Role, role.ToString())
                };

                var tokeOptions = new JwtSecurityToken(                                           // Определение настроек JWT токена
                    issuer: "http://localhost:5001",
                    audience: "http://localhost:5001",
                    claims: claims,
                    expires: DateTime.Now.AddHours(12),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new { Token = tokenString });
            }
            else
            {
                return Unauthorized();
            }
        }

        /* GetSalt_Hash() - получение соли и хэша введенного пользователем пароля.
         * Формальные параметры:
         *      login - логин пользователя;
         *      passwd - пароль пользователя.
         * Локальные переменные:
         *      u - информация о пользователе, если он существует;
         *      salt - соль реального пароля пользователя;
         *      hashed - хэш введенного пользователем пароля на основе реальной соли.
         */
        private Tuple<string,string> GetSalt_Hash(string login, string psswd) {
            if (db.Users.Any(r => r.LoginUser == login))                                         // Проверка на существование пользовтеля с введенным логином
            {
                Users u = db.Users.FirstOrDefault(r => r.LoginUser == login);                    // Хэширование введенного пользователем пароля
                string salt = u.PasswordUser.ToString().Substring(0, 24);
                string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: psswd,
                salt: Convert.FromBase64String(salt),
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
                return Tuple.Create(salt, hashed);
            }
               
            else
                return Tuple.Create("", "");

        }
    }
}
