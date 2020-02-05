﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Mvc;

namespace ASPOSystem.Controllers
{
    [Route("api/[controller]")]
    public class BrandsController : Controller
    {
        [HttpGet("[action]")]
        public List<Brands> GetBrand()
        {
            List<Brands> brands;
            using (RSSContext db = new RSSContext())
            {
                brands = db.Brands.Where(p=> p.IdBrand.ToString() != "00000000-0000-0000-0000-000000000000").ToList();
            }

            return brands;
        }
    }
}
