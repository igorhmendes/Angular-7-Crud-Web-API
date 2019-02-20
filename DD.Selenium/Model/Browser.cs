using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Selenium.Model
{
    public class Browser
    {
        public IWebDriver driver { get; set; }
        public WebDriverWait webDriverWait { get; set; }
        public bool logged { get; set; }

        public Browser(IWebDriver driver, WebDriverWait webDriverWait)
        {
            this.driver = driver;
            this.webDriverWait = webDriverWait;
            this.logged = false;
        }

    }
}
