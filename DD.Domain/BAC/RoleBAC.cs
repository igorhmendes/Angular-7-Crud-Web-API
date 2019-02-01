using DD.Common;
using DD.Common.Security.Model;
using DD.Domain.Interface.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace DD.Domain.BAC
{
    public class RoleBAC : IRoleBAC
    {
        private Dictionary<string, Role> _roles;

        public IEnumerable<Role> Roles {
            get {
                return _roles.Select(r => new Role
                {
                    Id = r.Value.Id,
                    Name = r.Value.Name,
                    RolePermissions = r.Value.RolePermissions
                });
            }
        }

        public RoleBAC(IRoleRepo roleRepo)
        {
            IEnumerable<Role> roles = roleRepo.GetAll().ToList();
            _roles = new Dictionary<string, Role>();
            foreach (var r in roles)
            {
                this._roles.Add(r.Name, r);
            }
        }

        public Role this[string name]
        {
            get { return _roles[name]; }
        }
    }
}
