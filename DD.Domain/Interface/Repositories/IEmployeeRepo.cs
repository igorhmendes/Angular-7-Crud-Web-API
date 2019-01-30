using DD.Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Domain.Interface.Repositories
{
    public interface IEmployeeRepo
    {
        void DeleteEmployee(Employee emp);

        bool InsertEmployee(Employee emp);

        List<Employee> FetchAllEmployees();

        Employee FetchEmployeeById(int id);
    }
}
