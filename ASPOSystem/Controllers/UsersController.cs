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

        [HttpGet]
        [Route("GetUsers"), Authorize(Roles = "Администратор")]
        public List<Users> GetUsers(string correction)
        {
            if (correction == "full")
                return db.Users.ToList();
            else
                return db.Users.Where(p => p.Id.ToString() != "00000000-0000-0000-0000-000000000000" 
                && p.Id.ToString() != "11111111-1111-1111-1111-111111111111").ToList();
        }

        [HttpGet]
        [Route("GetUserForAccount"), Authorize(Roles = "Администратор, Гость")]
        public List<Users> GetUserForAccount(string login)
        {
            return db.Users.Where(p => p.LoginUser == login).ToList();
        }

        [HttpGet]
        [Route("GetIdOfAuthorizedUser"), Authorize(Roles = "Администратор, Гость")]
        public Guid GetIdOfAuthorizedUser (string login)
        {
            return db.Users.FirstOrDefault(p => p.LoginUser == login).Id;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("CreateUser")]
        public IActionResult CreateUser([FromBody] Users newUser)
        {
            if (db.Users.Any(r=> r.LoginUser == newUser.LoginUser))
                return BadRequest("Данный логин занят");
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

        [HttpPut]
        [Route("UpdateUser"), Authorize(Roles = "Администратор, Гость")]
        public IActionResult UpdateUser([FromBody] Users updatedUser)
        {
            Users user = db.Users.FirstOrDefault(r=>r.Id == updatedUser.Id);

            List<string> logins = db.Users.Select(t => t.LoginUser).ToList();

            if ((user.LoginUser == updatedUser.LoginUser) || (!logins.Contains(updatedUser.LoginUser)))
            {
                if (user.PasswordUser != updatedUser.PasswordUser)
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

        [HttpPut]
        [Route("PasswordChanger"), Authorize(Roles = "Администратор, Гость")]
        public IActionResult PasswordChanger(string login, string oldPassword, string newPassword)
        {
            Users user = db.Users.FirstOrDefault(p => p.LoginUser == login);

            string saltOfOldPass = user.PasswordUser.ToString().Substring(0, 24);

            string hashedOldPass = HashPassword(saltOfOldPass, oldPassword);

            if (hashedOldPass == user.PasswordUser.ToString())
            {
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

        [HttpDelete]
        [Route("DeleteUser"), Authorize(Roles = "Администратор")]
        public void DeleteUser(Guid idUser)
        {
            db.Users.Remove(db.Users.Find(idUser));
            db.SaveChanges();
        }
    }
}
