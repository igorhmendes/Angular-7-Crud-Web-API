using System;
using System.Collections.Generic;
using System.Text;
using DD.Selenium.Common;
using DD.Selenium.Pages;
using DD.Selenium.WrapperFactory;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;

namespace DD.Selenium.Tests
{
    [TestClass]
    public class LoginTest : TestBase
    {
        private static LoginPage loginPage;

        public LoginTest() : base()
        {
        }

        [AssemblyCleanup]
        public static void AssemblyCleanup()
        {
            BroswerBuilder.CloseAllDrivers();
        }

        [TestMethod]
        public void ExecuteLoginTest()
        {
            bool result = true;

            if (!BroswerBuilder.logged)
            {
                BroswerBuilder.LoadApplication(driver, "http://localhost:4200/");
                result = loginPage.ExecuteLogin("admin@test.com", "123456");
            }

            Assert.IsTrue(result);
        }

    }
}
