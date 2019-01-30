using DD.Domain.Interface.BAC;
using DD.Domain.Interface.Repositories;
using DD.Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Domain.BAC
{
    public class EmployeeBAC : IEmployeeBAC
    {
        public readonly IEmployeeRepo _employeeRepo;

        public EmployeeBAC(IEmployeeRepo employeeRepo)
        {
            this._employeeRepo = employeeRepo;
        }

        public bool InsertEmployee(Employee emp)
        {
            return this._employeeRepo.InsertEmployee(emp);
        }
    }
}
