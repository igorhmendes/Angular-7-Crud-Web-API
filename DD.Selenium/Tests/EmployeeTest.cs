using DD.Selenium.Common;
using DD.Selenium.Pages;
using DD.Selenium.WrapperFactory;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Selenium.Tests
{
    [TestClass]
    public class EmployeeTest : TestBase
    {
        public EmployeeTest() : base()
        {
        }

        [TestMethod]
        public void InsertEmployeeTest()
        {
            BroswerBuilder.LoadApplication(driver, "http://localhost:4200/employee");

            EmployeePage employee = new EmployeePage(driver, webDriverWait);
            bool result = employee.InsertEmployee("Joao", "joao@test.com", "999999999", "Av Santa Beatriz, 320");

            Assert.IsTrue(result);
        }

    }
}
