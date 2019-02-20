using DD.Selenium.Model;
using DD.Selenium.Pages;
using DD.Selenium.Common;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace DD.Selenium.Common
{
    public class TestBase
    {
        protected const string DEFAULT_BROSWER_KEY = "ConfigConnections:DefaultBrowser";
        protected const string URL_ADDRESS_KEY = "ConfigConnections:BaseUrl";
        private const string USER_KEY = "ConfigConnections:User";
        private const string PASS_KEY = "ConfigConnections:Pass";

        protected Browser browser { get; set; }

        public static IConfigurationRoot configuration { get; set; }

        public TestBase()
        {
            Enum.TryParse(configuration[DEFAULT_BROSWER_KEY], out BrowserEnum browserEnum);
            browser = BrowserBuilder.InitBrowser(browserEnum);

            // There isnt't user logged on Application
            if (!browser.logged)
            {
                BrowserBuilder.Maximize(browser);
                BrowserBuilder.LoadApplication(browser, configuration[URL_ADDRESS_KEY]);
                LoginPage login = new LoginPage(browser.driver, browser.webDriverWait);
                browser.logged = login.ExecuteLogin(configuration[USER_KEY], configuration[PASS_KEY]);
            }
        }

    }
}
