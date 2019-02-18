using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Selenium.Model
{
    public class Driver
    {
        public IWebDriver driver { get; set; }
        public WebDriverWait webDriverWait { get; set; }
    }
}
