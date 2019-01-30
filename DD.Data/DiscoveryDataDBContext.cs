using DD.Domain.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

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
    }
}
