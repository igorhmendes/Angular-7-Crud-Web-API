﻿using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Common.Security.Model
{
    public class RolePermission
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public int PermissionId { get; set; }

        public RolePermission() { }
        public RolePermission(int roleId, int permissionId)
        {
            this.RoleId = roleId;
            this.PermissionId = permissionId;
        }

        public Role Role { get; set; }
        public Permission Permission { get; set; }
    }
}
