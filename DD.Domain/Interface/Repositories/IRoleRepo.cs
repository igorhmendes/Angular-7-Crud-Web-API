using DD.Common.Security.Model;
using System.Collections.Generic;

namespace DD.Domain.Interface.Repositories
{
    public interface IRoleRepo
    {
        Role Create(Role role);
        IEnumerable<Role> CreateRange(IEnumerable<Role> roles);
        IEnumerable<Role> GetAll();
        Role GetByName(string name);
    }
}
