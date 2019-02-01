using DD.Common.Security.Model;
using System.Collections.Generic;

namespace DD.Common
{
    public interface IRoleBAC
    {
        IEnumerable<Role> Roles { get; }
        Role this[string name] { get; }
    }
}
