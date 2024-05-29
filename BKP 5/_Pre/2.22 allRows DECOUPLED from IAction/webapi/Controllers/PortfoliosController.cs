using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text;
using webapi.Services;  // Add this to use IEmailService
using webapi.Services.cs;
using webapi.Models; // Ensure this is included


namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PortfoliosController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly IPortfolioService _portfolioService;
        private string[]? SelectedPortfolios;
        private readonly IPortfolioProcessingService _portfolioProcessingService;



        // Constructor to inject the email service and Portfolio Service (find portfolio names)
        public PortfoliosController(IEmailService emailService, IPortfolioService portfolioService, IPortfolioProcessingService portfolioProcessingService)
        {
            _emailService = emailService;
            _portfolioService = portfolioService;
            _portfolioProcessingService = portfolioProcessingService;
        }

        //portfolioProcessingService --> return the data periods from the selected portfolio
        //[HttpPost("sendportfolio")]
        //public IActionResult SendPortfolio([FromBody] PortfolioModel input)
        //{
        //    return _portfolioProcessingService.SendPortfolio(input);
        //}
        [HttpPost("sendportfolio")]
        public IActionResult SendPortfolio([FromBody] PortfolioModel input)
        {
            try
            {
                var allRows = _portfolioProcessingService.SendPortfolio(input);
                // Assuming successful execution, return the data.
                return Ok(new { data = allRows });
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occurred during processing
                return BadRequest($"Error: {ex.Message}");
            }
        }


        //API GET the names of the portfolios
        [HttpGet]
        public ActionResult<string> GetPortfolios()
        {
            return Ok(_portfolioService.GetPortfolioNames());
        }

        //email must be a string
        public class EmailData
        {
            public string? PortfolioTable { get; set; }
        }


        //hey API, POST the data of the selected portfolio  (to create the body of the email)
        [HttpPost("PostPortfolio")]
        public IActionResult PostPortfolio([FromBody] EmailData model)
        {
            // This line is just for debugging purposes, you can remove it if not needed
            System.Diagnostics.Debug.WriteLine(model.PortfolioTable);

            // Simplified email body to just the string "TEST"
            string? emailBody = model.PortfolioTable;

            // Send an email notification with the simplified content
            _emailService.SendEmail("giorgosstefatos@gmail.com", "New Data Received", emailBody);

            return Ok(new { message = "Data processed successfully" });
        }


        //hey API, POST the portfolios number positions from the selected rows in the menu
        public class portfoliosNumbers
        {
            public int[]? portfoliosNumbersArray { get; set; }
        }


        [HttpPost("PortfolioStringsArray")]
        public IActionResult PostPortfolios([FromBody] portfoliosNumbers model)
        {
            var portfolioNamesList = _portfolioService.GetPortfolioNames().ToList();
            var portfoliosNumbersArray = model.portfoliosNumbersArray;

            foreach (int i in portfoliosNumbersArray)
            {
                System.Diagnostics.Debug.WriteLine(portfolioNamesList[i]);
            }
            //System.Diagnostics.Debug.WriteLine(model.portfoliosNumbersArray);
            return Ok(new { someName = "SuccessMessage" });
        }

    }
}


