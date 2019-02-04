using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DD.Domain.Interface.BAC;
using DD.Domain.Interface.Repositories;
using DD.Domain.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DD.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyPolicy")]
    public class HomeController : Controller
    {
        public readonly IEmployeeBAC employeeBAC;
        public readonly IEmployeeRepo employeeRepo;

        public HomeController(IEmployeeBAC _employeeBAC, IEmployeeRepo _employeeRepo)
        {
            this.employeeBAC = _employeeBAC;
            this.employeeRepo = _employeeRepo;
        }

        [HttpPost("SaveEmployee")]
        public bool SaveEmployee(Employee emp)
        {
            return employeeBAC.InsertEmployee(emp);
        }

        [HttpGet("GetAllEmployees")]
        public List<Employee> GetAllEmployees()
        {
            return employeeRepo.FetchAllEmployees();
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("GetEmployeeById/{id}")]
        public Employee GetEmployeeById(int id)
        {
            Employee emp = new Employee();
            emp =  employeeRepo.FetchEmployeeById(id);
            return emp;
        }

        [HttpDelete("DeleteEmployee/{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            Employee emp = this.GetEmployeeById(id);
            if (emp.Name == null)
                return NotFound();
            employeeRepo.DeleteEmployee(emp);
            return NoContent();

        }

        [HttpPut("{id}")]
        public IActionResult PutEmployee([FromRoute] int id, [FromBody] Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employee.Id)
            {
                return BadRequest();
            }

            employeeRepo.UpdateEmployee(employee);

            //_context.Entry(employee).State = EntityState.Modified;

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!EmployeeExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            return NoContent();
        }



    }
}