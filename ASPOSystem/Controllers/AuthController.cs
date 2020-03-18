using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ASPOSystem.DBModels;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace ASPOSystem.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private RSSContext db = new RSSContext();
        [HttpPost, Route("login")]
        public IActionResult Login([FromBody]LoginModel user)
        {
            if (user == null)
            {
                return BadRequest("Invalid client request");
            }

            if (db.Users.Any(r=> r.LoginUser.ToString() == user.UserName && r.PasswordUser.ToString() == string.Concat(GetSalt_Hash(user.UserName,user.Password).Item1, GetSalt_Hash(user.UserName, user.Password).Item2)))
            {

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var role = db.Roles.FirstOrDefault(r => r.IdRole == db.Users.FirstOrDefault(t => t.LoginUser == user.UserName).RoleUser).NameRole.ToString();
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Role, role.ToString())
                };

                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:5001",
                    audience: "http://localhost:5001",
                    claims: claims,
                    expires: DateTime.Now.AddHours(12),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new { Token = tokenString });
            }
            else
            {
                return Unauthorized();
            }
        }
        private Tuple<string,string> GetSalt_Hash(string login, string psswd) {
            if (!db.Users.Any(r => r.LoginUser == login))
                return Tuple.Create("", "");
            else
            {
                Users u = db.Users.FirstOrDefault(r => r.LoginUser == login);
                string salt = u.PasswordUser.ToString().Substring(0, 24);
                string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: psswd,
                salt: Convert.FromBase64String(salt),
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
                return Tuple.Create(salt, hashed);
            }

        }
    }
}
