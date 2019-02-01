using DD.Common.Security.Model;
using DD.Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace DD.Data
{
    public class DiscoveryDataDBContext : DbContext
    {
        public DiscoveryDataDBContext()
        {
        }

        public DiscoveryDataDBContext(DbContextOptions<DiscoveryDataDBContext> options) : base(options)
        {
        }

        public virtual DbSet<Employee> Employees { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }
    }
}
