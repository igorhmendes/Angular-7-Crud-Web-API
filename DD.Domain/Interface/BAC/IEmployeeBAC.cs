using DD.Domain.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Domain.Interface.BAC
{
    public interface IEmployeeBAC
    {
        bool InsertEmployee(Employee emp);
    }
}
