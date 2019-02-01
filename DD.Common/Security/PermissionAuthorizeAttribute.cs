using DD.Common.Security.Model;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Linq;

namespace DD.Common.Security
{
    // This attribute derives from the [Authorize] attribute, adding 
    // the ability for a user to specify an 'permissions' parameter. Since authorization
    // policies are looked up from the policy provider only by string, this
    // authorization attribute creates is policy name based on a constant prefix
    // and the user-supplied permissions parameter. A custom authorization policy provider
    // (`PermissionPolicyProvider`) can then produce an authorization policy with 
    // the necessary requirements based on this policy name.
    public class PermissionAuthorizeAttribute : AuthorizeAttribute
    {
        const string POLICY_PREFIX = "Permission";

        public PermissionAuthorizeAttribute(params Permissions[] permissions) {
            this.Permissions = permissions;
        }

        // Get or set the Permissions property by manipulating the underlying Policy property
        public Permissions[] Permissions
        {
            get
            {
                return Policy.Substring(POLICY_PREFIX.Length).Split(',')
                    .Select(p => (Permissions)Enum.Parse(typeof(Permissions), p))
                        .ToArray() ;                
            }
            set
            {
                Policy = $"{POLICY_PREFIX}{String.Join(',', value)}";
            }
        }
    }
}