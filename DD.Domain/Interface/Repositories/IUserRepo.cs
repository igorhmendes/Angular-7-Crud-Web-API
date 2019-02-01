using DD.Common.Security.Model;
using System.Collections.Generic;

namespace DD.Domain.Interface.Repositories
{
    public interface IUserRepo
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(int id);
    }    
}