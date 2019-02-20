using DD.Selenium.Model;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.IE;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Selenium.Common
{
    public class BrowserBuilder
    {
        private static readonly IDictionary<BrowserEnum, Browser> drivers = new Dictionary<BrowserEnum, Browser>();

        public static Browser InitBrowser(BrowserEnum browserType)
        {
            Browser browser = GetBrowser(browserType);
            if (browser != null)
            {
                return browser;
            }

            switch (browserType)
            {
                case BrowserEnum.Firefox:
                    browser = CreateBrowser(new FirefoxDriver(@"./"));
                    drivers.Add(BrowserEnum.Firefox, browser);
                    break;

                case BrowserEnum.IE:
                    browser = CreateBrowser(new InternetExplorerDriver(@"./"));
                    drivers.Add(BrowserEnum.IE, browser);
                    break;

                case BrowserEnum.Chrome:
                    browser = CreateBrowser(new ChromeDriver(@"./")); 
                    drivers.Add(BrowserEnum.Chrome, browser);
                    break;
            }

            return browser;
        }
        
        public static void LoadApplication(Browser broswer, string url)
        {
            if (broswer == null || broswer.driver == null)
            {
                return;
            }

            broswer.driver.Navigate().GoToUrl(url);
        }

        public static void Maximize(Browser broswer)
        {
            if (broswer == null || broswer.driver == null)
            {
                return;
            }

            broswer.driver.Manage().Window.Maximize();
        }

        public static void CloseAllDrivers()
        {
            foreach (var key in drivers.Keys)
            {
                if (drivers[key].driver != null)
                {
                    drivers[key].driver.Close();
                    drivers[key].driver.Quit();
                }
            }
        }

        /* ------------------------------------------------------------------------
           --------------------------- Private Methods ----------------------------
        ---------------------------------------------------------------------------*/
        private static Browser GetBrowser(BrowserEnum broswerType)
        {
            Browser broswer = null;
            drivers.TryGetValue(broswerType, out broswer);

            return broswer;
        }

        private static Browser CreateBrowser(IWebDriver driver)
        {
            WebDriverWait webDriverWait = new WebDriverWait(driver, TimeSpan.FromSeconds(5));
            Browser broswer = new Browser(driver, webDriverWait);

            return broswer;
        }

    }
}
