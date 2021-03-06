﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using DD.Selenium.Common;
using DD.Selenium.Pages;
using Microsoft.Extensions.Configuration;
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

        [TestMethod]
        [DataRow("admin@test.com", "123456")]
        public void ExecuteLoginTest(string user, string pass)
        {
            bool result = true;

            if (!broswer.logged)
            {
                BroswerBuilder.LoadApplication(broswer, Configuration[URL_ADDRESS_KEY]);
                result = loginPage.ExecuteLogin(user, pass);
            }

            Assert.IsTrue(result);
        }

    }
}
