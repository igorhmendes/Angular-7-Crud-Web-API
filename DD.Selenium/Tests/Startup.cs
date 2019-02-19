using DD.Selenium.Common;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace DD.Selenium.Tests
{
    [TestClass]
    public class Startup : TestBase
    {
        [AssemblyInitialize]
        public static void AssemblyInit(TestContext context)
        {
            var builder = new ConfigurationBuilder()
                        .SetBasePath(Directory.GetCurrentDirectory())
                        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
            //.AddJsonFile("appsettings.Development.json", optional:true, reloadOnChange: true)
            //.AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        [AssemblyCleanup]
        public static void AssemblyCleanup()
        {
            BroswerBuilder.CloseAllDrivers();
        }

    }
}
