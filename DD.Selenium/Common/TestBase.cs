using DD.Selenium.Pages;
using DD.Selenium.WrapperFactory;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Selenium.Common
{
    public class TestBase
    {
        protected static IWebDriver driver { get; set; }
        protected static WebDriverWait webDriverWait { get; set; }

        public TestBase()
        {
            driver = BroswerBuilder.InitBrowser(BroswerEnum.Chrome);
            webDriverWait = new WebDriverWait(driver, TimeSpan.FromSeconds(5));

            // There is user logged on Application
            if (!BroswerBuilder.logged)
            {
                BroswerBuilder.LoadApplication(driver, "http://localhost:4200/");
                LoginPage login = new LoginPage(driver, webDriverWait);
                BroswerBuilder.logged = login.ExecuteLogin("admin@test.com", "123456");
            }
        }

    }
}
