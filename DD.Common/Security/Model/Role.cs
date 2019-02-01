using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DD.Common.Security.Model
{
    public class Role
    {
        public int Id { get; set; }
        public Role() { }

        public Role(string name)
        {
            this.Name = name;
        }

        public string Name { get; set; }
        public ICollection<RolePermission> RolePermissions { get; set; }
    }
}
