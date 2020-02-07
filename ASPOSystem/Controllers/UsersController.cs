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
        [HttpGet]
        [Route("GetUsers")]
        public List<Users> GetUsers()
        {
            List<Users> users;
            using (RSSContext db = new RSSContext())
            {
                users = db.Users.Where(p => p.IdUser.ToString() != "00000000-0000-0000-0000-000000000000" 
                                            && p.IdUser.ToString() != "11111111-1111-1111-1111-111111111111").ToList();
            }

            return users;
        }

        [HttpPost]
        [Route("CreateUser")]
        public void CreateUser([FromBody] Users newUser)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Users.Add(newUser);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateUser")]
        public void UpdateUser([FromBody] Users updatedUser)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Users.Update(updatedUser);
                db.SaveChanges();
            }
        }

        [HttpDelete]
        [Route("DeleteUser")]
        public void DeleteUser(Guid idUser)
        {
            using (RSSContext db = new RSSContext())
            {
                Users deletedUser = db.Users.Find(idUser);
                db.Users.Remove(deletedUser);
                db.SaveChanges();
            }
        }
    }
}
