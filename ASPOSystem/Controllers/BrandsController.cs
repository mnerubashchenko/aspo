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
    public class BrandsController : Controller
    {
        [HttpGet]
        [Route("GetBrand")]
        public List<Brands> GetBrand()
        {
            List<Brands> brands;
            using (RSSContext db = new RSSContext())
            {
                brands = db.Brands.Where(p=> p.IdBrand.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
            }

            return brands;
        }

        [HttpPost]
        [Route("CreateBrand")]
        public void CreateBrand([FromBody] Brands newBrand)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Brands.Add(newBrand);
                db.SaveChanges();
            }
        }

        [HttpPut]
        [Route("UpdateBrand")]
        public void UpdateBrand([FromBody] Brands updatedBrand)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Brands.Update(updatedBrand);
                db.SaveChanges();
            }
        }

        [HttpDelete]
        [Route("DeleteBrand")]
        public void DeleteBrand(Guid idBrand)
        {
            using (RSSContext db = new RSSContext())
            {
                Brands deletedBrand = db.Brands.Find(idBrand);
                db.Brands.Remove(deletedBrand);
                db.SaveChanges();
            }
        }
    }
}
