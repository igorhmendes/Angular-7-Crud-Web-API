using DD.Common.Security.Model;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace DD.Common.Security
{
    public class PermissionRequirement : IAuthorizationRequirement
    {
        public IEnumerable<Permissions> Permissions { get; private set; }

        public PermissionRequirement(IEnumerable<Permissions> permissions) {
            Permissions = permissions;
        }
    }
}