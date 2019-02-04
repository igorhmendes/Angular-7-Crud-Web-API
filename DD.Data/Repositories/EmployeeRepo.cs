using DD.Domain.Interface.Repositories;
using DD.Domain.Model;
using System.Collections.Generic;
using System.Linq;

namespace DD.Data.Repositories
{
    public class EmployeeRepo : IEmployeeRepo
    {
        private readonly DiscoveryDataDBContext _context;

        public EmployeeRepo(DiscoveryDataDBContext context)
        {
            this._context = context;
        }


        public bool InsertEmployee(Employee emp)
        {
            this._context.Employees.Add(emp);
            _context.SaveChanges();
            return true;
        }

        public void DeleteEmployee(Employee emp)
        {
            this._context.Employees.Remove(emp);
            _context.SaveChanges();
            
        }

        public List<Employee> FetchAllEmployees()
        {
            return _context.Employees.ToList();
            
        }

        public Employee FetchEmployeeById(int id)
        {
            Employee employee = new Employee();
            employee = _context.Employees.Find(id);
            return employee;

        }

        public bool UpdateEmployee(Employee emp)
        {
            throw new System.NotImplementedException();
        }
    }
}
