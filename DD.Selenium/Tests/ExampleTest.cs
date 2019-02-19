using DD.Selenium.Common;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace DD.Selenium.Tests
{
    public class ExampleTest : TestBase
    {
        /*
        [AssemblyInitialize]
        public static void AssemblyInit(TestContext context)
        {
            // Executes once before the test run. (Optional)
            Console.WriteLine("AssemblyInitialize");
        }
        */

        [ClassInitialize]
        public static void ClassInit(TestContext context)
        {
            // Executes once for the test class. (Optional)
            Console.WriteLine("ClassInitialize");
        }

        [TestInitialize]
        public void Setup()
        {
            // Runs before each test. (Optional)
            Console.WriteLine("TestInitialize");
        }

        /*
        [AssemblyCleanup]
        public static void AssemblyCleanup()
        {
            // Executes once after the test run. (Optional)
            Console.WriteLine("AssemblyCleanup");
        }
        */

        [ClassCleanup]
        public static void ClassCleanup()
        {
            // Runs once after all tests in this class are executed. (Optional)
            // Not guaranteed that it executes instantly after all tests from the class.
            Console.WriteLine("ClassCleanup");
        }

        [TestCleanup]
        public void TearDown()
        {
            // Runs after each test. (Optional)
            Console.WriteLine("TestCleanup");
        }

        [TestMethod]
        public void TestMethodA()
        {
            // Your test code goes here.
            Console.WriteLine("TestMethodA");
        }

        [TestMethod]
        public void TestMethodC()
        {
            // Your test code goes here.
            Console.WriteLine("TestMethodC");
        }

        [TestMethod]
        public void TestMethodB()
        {
            // Your test code goes here.
            Console.WriteLine("TestMethodB");
        }


    }
}
