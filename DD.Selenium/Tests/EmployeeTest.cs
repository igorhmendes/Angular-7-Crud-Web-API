using DD.Selenium.Common;
using DD.Selenium.Pages;
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
        private const string URL_EMPLOYEE = "employee";

        public EmployeeTest() : base()
        {

        }

        [TestMethod]
        [DataRow("Joao", "joao@test.com", "999999999", "Av Santa Beatriz, 320")]
        public void InsertEmployeeTest(string name, string email, string contact, string address)
        {
            BroswerBuilder.LoadApplication(broswer, Configuration[URL_ADDRESS_KEY] + URL_EMPLOYEE);

            EmployeePage employee = new EmployeePage(broswer.driver, broswer.webDriverWait);
            bool result = employee.InsertEmployee(name, email, contact, address);

            Assert.IsTrue(result);
        }

    }
}
