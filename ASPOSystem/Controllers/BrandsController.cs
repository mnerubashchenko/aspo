using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ASPOSystem.Controllers
{
    [ApiController]
    [Route("[controller]"), Authorize(Roles = "7ACFB546-2D54-EA11-AB6A-2C56DC99B962")]
    public class BrandsController : Controller
    {
        private RSSContext db = new RSSContext();

        [HttpGet]
        [Route("GetBrand")]
        public List<Brands> GetBrand()
        {
            return db.Brands.Where(p => p.IdBrand.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
        }

        [HttpPost]
        [Route("CreateBrand")]
        public void CreateBrand([FromBody] Brands newBrand)
        {
            db.Brands.Add(newBrand);
            db.SaveChanges();
        }

        [HttpPut]
        [Route("UpdateBrand")]
        public void UpdateBrand([FromBody] Brands updatedBrand)
        {
            db.Brands.Update(updatedBrand);
            db.SaveChanges();
        }

        [HttpDelete]
        [Route("DeleteBrand")]
        public void DeleteBrand(Guid idBrand)
        {
            db.Brands.Remove(db.Brands.Find(idBrand));
            db.SaveChanges();
        }
    }
}
