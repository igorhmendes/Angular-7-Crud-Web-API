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

        protected Broswer broswer { get; set; }

        public static IConfigurationRoot Configuration { get; set; }

        public TestBase()
        {
            BroswerEnum broswerEnum;
            Enum.TryParse(Configuration[DEFAULT_BROSWER_KEY], out broswerEnum);
            broswer = BroswerBuilder.InitBrowser(broswerEnum);

            // There isnt't user logged on Application
            if (!broswer.logged)
            {
                BroswerBuilder.Maximize(broswer);
                BroswerBuilder.LoadApplication(broswer, Configuration[URL_ADDRESS_KEY]);
                LoginPage login = new LoginPage(broswer.driver, broswer.webDriverWait);
                broswer.logged = login.ExecuteLogin(Configuration[USER_KEY], Configuration[PASS_KEY]);
            }
        }

    }
}
