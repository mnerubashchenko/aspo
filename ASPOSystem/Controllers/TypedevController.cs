﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]"), Authorize(Roles = "Администратор")]
    public class TypedevController : Controller
    {
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetTypedev")]
        public List<Typedev> GetTypedev()
        {
            return db.Typedev.Where(p => p.IdTypedev.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        [HttpPost]
        [Route("CreateTypedev")]
        public void CreateTypedev([FromBody] Typedev newTypedev)
        {
            db.Typedev.Add(newTypedev);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateTypedev")]
        public void UpdateTypedev([FromBody] Typedev updatedTypedev)
        {
            db.Typedev.Update(updatedTypedev);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteTypedev")]
        public void DeleteRole(Guid idTypedev)
        {
            db.Typedev.Remove(db.Typedev.Find(idTypedev));
            db.SaveChanges();
        }
    }
}
