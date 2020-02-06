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
        public void CreateBrand([FromBody] Brands brand)
        {
            using (RSSContext db = new RSSContext())
            {
                db.Brands.Add(brand);
                db.SaveChanges();
            }
        }
    }
}
