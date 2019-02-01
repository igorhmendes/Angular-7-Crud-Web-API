using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DD.Common.Security.Model
{
    public class UserRole
    {
        public UserRole() { }

        public UserRole(int roleId)
        {
            this.RoleId = roleId;
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public User User { get; set; }
        public Role Role { get; set; }
    }
}
