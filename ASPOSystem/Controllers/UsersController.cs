using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Mvc;

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
