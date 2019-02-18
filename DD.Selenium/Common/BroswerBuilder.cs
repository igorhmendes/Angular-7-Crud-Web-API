using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.IE;
using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Selenium.WrapperFactory
{
    public class BroswerBuilder
    {
        private static readonly IDictionary<BroswerEnum, IWebDriver> Drivers = new Dictionary<BroswerEnum, IWebDriver>();
        public static IWebDriver driver { get; private set; }

        public static bool logged { get; set; }

        public static IWebDriver InitBrowser(BroswerEnum broswer)
        {
            driver = GetBroswer(broswer);
            if (driver != null)
            {
                return driver;
            }

            switch (broswer)
            {
                case BroswerEnum.Firefox:
                    driver = new FirefoxDriver(@"./");
                    Drivers.Add(BroswerEnum.Firefox, driver);
                    break;

                case BroswerEnum.IE:
                    driver = new InternetExplorerDriver(@"./"); // @"C:\PathTo\IEDriverServer"
                    Drivers.Add(BroswerEnum.IE, driver);
                    break;

                case BroswerEnum.Chrome:
                    driver = new ChromeDriver(@"./"); // @"C:\PathTo\CHDriverServer"
                    Drivers.Add(BroswerEnum.Chrome, driver);
                    break;
            }

            return driver;
        }
        
        private static IWebDriver GetBroswer(BroswerEnum broswer)
        {
            IWebDriver result = null;
            Drivers.TryGetValue(broswer, out result);

            return result;
        }
        

        public static void LoadApplication(IWebDriver driver, string url)
        {
            driver.Navigate().GoToUrl(url);
        }

        public static void Maximize(IWebDriver driver)
        {
            driver.Manage().Window.Maximize();
        }

        public static void CloseAllDrivers()
        {
            foreach (var key in Drivers.Keys)
            {
                Drivers[key].Close();
                Drivers[key].Quit();
            }
        }

    }
}
