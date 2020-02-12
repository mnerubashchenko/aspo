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
    public class DevicesController : Controller
    {
        [HttpGet]
        [Route("GetDevices")]
        public List<Devices> GetDevices()
        {
            List<Devices> devices;
            using (RSSContext db = new RSSContext())
            {
                devices = db.Devices.Where(p => p.IdDevice.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
            }

            return devices;
        }

        [HttpPost]
        [Route("CreateDevice")]
        public void CreateDevice([FromBody] Devices newDevice)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Devices.Add(newDevice);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateDevice")]
        public void UpdateDevice([FromBody] Devices updatedDevice)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Devices.Update(updatedDevice);
                db.SaveChanges();
            }
        }

        [HttpDelete]
        [Route("DeleteDevice")]
        public void DeleteDevice(Guid idDevice)
        {
            using (RSSContext db = new RSSContext())
            {
                Devices deletedDevice = db.Devices.Find(idDevice);
                db.Devices.Remove(deletedDevice);
                db.SaveChanges();
            }
        }
    }
}
