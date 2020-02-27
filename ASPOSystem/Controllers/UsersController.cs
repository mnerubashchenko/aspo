using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetUsers")]
        public List<Users> GetUsers()
        {
            return db.Users.Where(p => p.IdUser.ToString() != "00000000-0000-0000-0000-000000000000"
                                       && p.IdUser.ToString() != "11111111-1111-1111-1111-111111111111").ToList();
        }

        [HttpPost]
        [Route("CreateUser")]
        public void CreateUser([FromBody] Users newUser)
        {
            var salt = new byte[128 / 8];
            string salt1;

            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: newUser.PasswordUser.ToString(),
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA1,
            iterationCount: 10000,
            numBytesRequested: 256 / 8));

            salt1 = Convert.ToBase64String(salt);

            newUser.PasswordUser = string.Concat(Convert.ToBase64String(salt), hashed);

            newUser.RoleUser = new Guid("775ACD72-5459-EA11-B83A-645106511DF0");

            db.Users.Add(newUser);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateUser")]
        public void UpdateUser([FromBody] Users updatedUser)
        {
            db.Users.Update(updatedUser);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteUser")]
        public void DeleteUser(Guid idUser)
        {
            db.Users.Remove(db.Users.Find(idUser));
            db.SaveChanges();
        }
    }
}
