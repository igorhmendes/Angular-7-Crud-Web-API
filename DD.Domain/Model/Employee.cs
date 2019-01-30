using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DD.Domain.Model
{
    [Table("Employees")]
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        public String Name { get; set; }

        public String Email { get; set; }

        public long ContactNo { get; set; }

        public String Address { get; set; }
    }
}
