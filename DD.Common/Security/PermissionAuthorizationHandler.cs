using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DD.Common.Security.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace DD.Common.Security
{
    // This class contains logic for determining whether PermissionRequirements in authorizaiton
    // policies are satisfied or not
    public class PermissionAuthorizationHandler : AuthorizationHandler<PermissionRequirement>
    {
        private readonly ILogger<PermissionAuthorizationHandler> _logger;
        private readonly IRoleBAC _rolesCollection;

        public PermissionAuthorizationHandler(ILogger<PermissionAuthorizationHandler> logger, IRoleBAC roles)
        {
            _logger = logger;
            _rolesCollection = roles;
        }

        // Check whether a given PermissionRequirement is satisfied or not for a particular context
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            // Log as a warning so that it's very clear in sample output which authorization policies 
            // (and requirements/handlers) are in use
            _logger.LogWarning("Evaluating authorization requirement for permissions == {permission}", 
                string.Join(',', requirement.Permissions));

            // Check the user's role
            IEnumerable<Claim> roleClaims = context.User.FindAll(c => c.Type == ClaimTypes.Role);
            
            if (roleClaims != null)
            {
                // Retrieves the user's roles from the roles collection using claims
                IEnumerable<string> userRoleNames = roleClaims.Select(claim => claim.Value);
                IEnumerable<Role> userRoles = this._rolesCollection.Roles.Where(r => userRoleNames.Contains(r.Name));
                IList<Permissions> userPermissions = new List<Permissions>();
                
                foreach (var r in userRoles)
                {
                    foreach (var rp in r.RolePermissions) userPermissions.Add(rp.Permission.Name);
                }                
                userPermissions = userPermissions.Distinct().ToList();

                // If the user meets the permission criterion, mark the authorization requirement succeeded
                if (requirement.Permissions.All(p => userPermissions.Contains(p)))
                {
                    _logger.LogInformation("All permissions requirement {permission} satisfied", string.Join(',', requirement.Permissions));
                    context.Succeed(requirement);
                }
                else
                {
                    _logger.LogInformation("Current user's Permission claim does not satisfy the permission authorization requirement {permission}",
                                                string.Join(',', requirement.Permissions));
                }
            }
            else
            {
                _logger.LogInformation("No role claim present");
            }

            return Task.CompletedTask;
        }
    }
}