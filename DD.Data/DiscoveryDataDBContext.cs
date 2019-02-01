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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().ToTable("Employees");
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Role>().ToTable("Roles");            
            modelBuilder.Entity<UserRole>().ToTable("UserRoles");
            modelBuilder.Entity<Permission>().ToTable("Permissions");
            modelBuilder.Entity<RolePermission>().ToTable("RolePermissions")
                .HasKey(rp => new { rp.PermissionId, rp.RoleId });
        }
    }
}
