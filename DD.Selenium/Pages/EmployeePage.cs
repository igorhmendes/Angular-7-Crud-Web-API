using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Selenium.Pages
{
    class EmployeePage
    {
        private IWebDriver driver;
        private WebDriverWait webDriverWait;

        public EmployeePage(IWebDriver driver, WebDriverWait webDriverWait)
        {
            this.driver = driver;
            this.webDriverWait = webDriverWait;
        }

        private IWebElement TxtName => driver.FindElement(By.Name("Name"));
        private IWebElement TxtEmail => driver.FindElement(By.Name("email"));
        private IWebElement TxtContact => driver.FindElement(By.Name("contactNo"));
        private IWebElement TxtAddress => driver.FindElement(By.Name("address"));
        private IWebElement BtnSubmit => driver.FindElement(By.XPath("/html/body/my-app/div/div/app-employee/div/div/div/div/div/form/button"));
        
        public void TypeName(string value)
        {
            TxtName.SendKeys(value);
        }
        public void TypeEmail(string value)
        {
            TxtEmail.SendKeys(value);
        }
        public void TypeContact(string value)
        {
            TxtContact.SendKeys(value);
        }
        public void TypeAddress(string value)
        {
            TxtAddress.SendKeys(value);
        }

        public void ClickSubmit()
        {
            BtnSubmit.Click();
        }

        public bool InsertEmployee(string name, String email, String contact, String address)
        {
            TypeName(name);
            TypeEmail(email);
            TypeContact(contact);
            TypeAddress(address);
            ClickSubmit();

            return true;
        }

    }
}
