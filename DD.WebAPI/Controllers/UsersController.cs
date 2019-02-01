using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using DD.WebAPI.Dtos;
using DD.Domain.Interface.Repositories;
using DD.Common;
using DD.Common.Security;
using DD.Common.Security.Model;

namespace WebApi.Controllers
{
    //[Authorize]
    [ApiController]    
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserRepo _userRepo;
        private IRoleBAC _roleBAC;
        private IRoleRepo _roleRepo;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UsersController(
            IUserRepo userService,
            IRoleBAC roleBAC,
            IMapper mapper,
            IRoleRepo roleRepo,
            IOptions<AppSettings> appSettings)
        {
            _userRepo = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _roleBAC = roleBAC;
            _roleRepo = roleRepo;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]UserDto userDto)
        {
            var user = _userRepo.Authenticate(userDto.Username, userDto.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var tokenHandler = new JwtSecurityTokenHandler() ;
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);

            IList<Claim> claimsList = new List<Claim> {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                };

            // Add list of roles as claims
            foreach (var role in user.UserRoles)
            {
                claimsList.Add(new Claim(ClaimTypes.Role, role.Role.Name));
            }            

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claimsList),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store client side
            return Ok(new {
                Id = user.Id,
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = tokenString
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody]UserDto userDto)
        {
            // map dto to entity
            var user = _mapper.Map<User>(userDto);

            try 
            {
                var role = this._roleRepo.GetByName(userDto.Role);
                user.UserRoles = new List<UserRole> {
                    new UserRole(role.Id)    
                };

                // save 
                _userRepo.Create(user, userDto.Password);
                return Ok();
            } 
            catch(Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }
              
        [HttpGet]
        //[PermissionAuthorize(Permissions.ViewUser, Permissions.DeleteUser)]
        public IActionResult GetAll()
        {
            var users =  _userRepo.GetAll();
            var userDtos = _mapper.Map<IList<UserDto>>(users);
            return Ok(userDtos);
        }

        //[PermissionAuthorize(Permissions.ViewUser)]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user =  _userRepo.GetById(id);
            var userDto = _mapper.Map<UserDto>(user);
            return Ok(userDto);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]UserDto userDto)
        {
            // map dto to entity and set id
            var user = _mapper.Map<User>(userDto);
            user.Id = id;

            try 
            {
                // save 
                _userRepo.Update(user, userDto.Password);
                return Ok();
            } 
            catch(Exception ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        //[PermissionAuthorize(Permissions.DeleteUser)]
        public IActionResult Delete(int id)
        {
            _userRepo.Delete(id);
            return Ok();
        }
    }
}
