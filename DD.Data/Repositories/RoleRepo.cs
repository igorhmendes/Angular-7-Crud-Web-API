using System.Collections.Generic;
using System.Linq;
using DD.Common.Security;
using DD.Common.Security.Model;
using DD.Domain.Interface.Repositories;
using Microsoft.EntityFrameworkCore;


namespace DD.Data.Repositories
{
    public class RoleRepo : IRoleRepo
    {
        private DiscoveryDataDBContext _context;

        public RoleRepo(DiscoveryDataDBContext context)
        {
            _context = context;    
        }

        public Role Create(Role role)
        {
            _context.Roles.Add(role);
            _context.SaveChanges();
            return role;
        }

        public IEnumerable<Role> CreateRange(IEnumerable<Role> roles)
        {
            _context.Roles.AddRange(roles);
            _context.SaveChanges();
            return roles;
        }

        public IEnumerable<Role> GetAll()
        {
            return _context.Roles.AsQueryable()
                .Include(r => r.RolePermissions)
                    .ThenInclude(rp => rp.Permission);
        }

        public Role GetByName(string name)
        {
            return this._context.Roles.AsQueryable().FirstOrDefault(r => r.Name == name);
        }
    }
    
}