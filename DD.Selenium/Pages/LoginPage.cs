using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Selenium.Pages
{
    class LoginPage
    {
        private IWebDriver driver;
        private WebDriverWait webDriverWait;

        public LoginPage(IWebDriver driver, WebDriverWait webDriverWait)
        {
            this.driver = driver;
            this.webDriverWait = webDriverWait;
        }

        //[FindsBy(How = How.Id, Using = "userName")]
        private IWebElement TxtUser => driver.FindElement(By.Name("email"));

        //[FindsBy(How = How.Name, Using = "pass")]
        private IWebElement TxtPassword => driver.FindElement(By.Name("pass"));

        //[FindsBy(How = How.ClassName, Using = "login100-form-btn")]
        private IWebElement BtnSign => driver.FindElement(By.ClassName("login100-form-btn"));

        public void TypeUser(string value)
        {
            TxtUser.SendKeys(value);
        }

        public void TypePassword(string value)
        {
            TxtPassword.SendKeys(value);
        }

        public void ClickLogin()
        {
            BtnSign.Click();
        }

        public bool ExecuteLogin(string login, string password)
        {
            TypeUser(login);
            TypePassword(password);
            ClickLogin();

            return webDriverWait.Until(d => d.FindElement(By.XPath("/html/body/my-app/div/div/app-home/p"))).Displayed;
        }

    }
}
