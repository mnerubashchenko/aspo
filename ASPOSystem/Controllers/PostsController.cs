using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Mvc;

namespace ASPOSystem.Controllers
{
    [Route("api/[controller]")]
    public class PostsController : Controller
    {
        [HttpGet("[action]")]
        public List<Posts> GetPost()
        {
            List<Posts> posts;
            using (RSSContext db = new RSSContext())
            {
                posts = db.Posts.ToList();
            }

            return posts;
        }
    }
}
