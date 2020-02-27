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
    public class DevicesController : Controller
    {
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetDevices")]
        public List<Devices> GetDevices()
        {
            return db.Devices.Where(p => p.IdDevice.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        [HttpPost]
        [Route("CreateDevice")]
        public void CreateDevice([FromBody] Devices newDevice)
        {
            db.Devices.Add(newDevice);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateDevice")]
        public void UpdateDevice([FromBody] Devices updatedDevice)
        {
            db.Devices.Update(updatedDevice);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteDevice")]
        public void DeleteDevice(Guid idDevice)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Devices.Remove(db.Devices.Find(idDevice));
                db.SaveChanges();
            }
        }
    }
}
