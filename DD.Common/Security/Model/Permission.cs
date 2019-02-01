namespace DD.Common.Security.Model
{
    public class Permission
    {
        public int Id { get; set; }
        public Permissions Name { get; set; }
        public Permission(Permissions name) => Name = name;
    }
}
