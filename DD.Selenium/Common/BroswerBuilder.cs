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
    public class BroswerBuilder
    {
        private static readonly IDictionary<BroswerEnum, Broswer> Drivers = new Dictionary<BroswerEnum, Broswer>();

        public static Broswer InitBrowser(BroswerEnum broswerType)
        {
            Broswer broswer = GetBroswer(broswerType);
            if (broswer != null)
            {
                return broswer;
            }

            switch (broswerType)
            {
                case BroswerEnum.Firefox:
                    broswer = CreateBroswer(new FirefoxDriver(@"./"));
                    Drivers.Add(BroswerEnum.Firefox, broswer);
                    break;

                case BroswerEnum.IE:
                    broswer = CreateBroswer(new InternetExplorerDriver(@"./"));
                    Drivers.Add(BroswerEnum.IE, broswer);
                    break;

                case BroswerEnum.Chrome:
                    broswer = CreateBroswer(new ChromeDriver(@"./")); 
                    Drivers.Add(BroswerEnum.Chrome, broswer);
                    break;
            }

            return broswer;
        }
        
        public static void LoadApplication(Broswer broswer, string url)
        {
            if (broswer == null || broswer.driver == null)
            {
                return;
            }

            broswer.driver.Navigate().GoToUrl(url);
        }

        public static void Maximize(Broswer broswer)
        {
            if (broswer == null || broswer.driver == null)
            {
                return;
            }

            broswer.driver.Manage().Window.Maximize();
        }

        public static void CloseAllDrivers()
        {
            foreach (var key in Drivers.Keys)
            {
                if (Drivers[key].driver != null)
                {
                    Drivers[key].driver.Close();
                    Drivers[key].driver.Quit();
                }
            }
        }

        /* ------------------------------------------------------------------------
           --------------------------- Private Methods ----------------------------
        ---------------------------------------------------------------------------*/
        private static Broswer GetBroswer(BroswerEnum broswerType)
        {
            Broswer broswer = null;
            Drivers.TryGetValue(broswerType, out broswer);

            return broswer;
        }

        private static Broswer CreateBroswer(IWebDriver driver)
        {
            WebDriverWait webDriverWait = new WebDriverWait(driver, TimeSpan.FromSeconds(5));
            Broswer broswer = new Broswer(driver, webDriverWait);

            return broswer;
        }

    }
}
