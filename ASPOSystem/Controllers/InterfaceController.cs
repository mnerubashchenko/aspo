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
    [Route("[controller]")]
    public class InterfaceController : Controller
    {
        private RSSForVKRContext db = new RSSForVKRContext();

        [HttpGet]
        [Route("GetInterfaces"), Authorize(Roles = "Администратор")]
        public List<Interfaces> GetInterfaces()
        {
            return db.Interfaces.ToList();
        }

        [HttpGet]
        [Route("GetNamesOfInterfaces"), Authorize(Roles = "Администратор")]
        public List<string> GetNamesOfInterfaces()
        {
            return db.Interfaces.Select(item => item.Name).ToList();
        }

        [HttpPost]
        [Route("CreateInterface"), Authorize(Roles = "Администратор")]
        public void CreateInterface([FromBody] Interfaces newInterface)
        {
            db.Interfaces.Add(newInterface);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateInterface"), Authorize(Roles = "Администратор")]
        public void UpdateInterface([FromBody] Interfaces updatedInterface)
        {
            db.Interfaces.Update(updatedInterface);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteInterface"), Authorize(Roles = "Администратор")]
        public void DeleteInterface(Guid idInterface)
        {
            db.Interfaces.Remove(db.Interfaces.Find(idInterface));
            db.SaveChanges();
        }
    }
}
