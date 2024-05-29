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
        //arguments: 
        private readonly IPortfolioProcessingService _portfolioProcessingService;


        // Constructor to inject the spesific Services
        public PortfoliosController(IEmailService emailService, IPortfolioService portfolioService, IPortfolioProcessingService portfolioProcessingService)
        {
            _emailService = emailService;
            _portfolioService = portfolioService;
            _portfolioProcessingService = portfolioProcessingService;

            //CsvService.CreateCsvFromList(data, filePath);
        }


        //Send the initial portfolio names
        [HttpGet("getteststring")]
        public ActionResult<string> GetTestString()
        {
            return Ok(_portfolioService.GetPortfolioNames());
        }

        //test CSV service
        [HttpGet]
        public IActionResult CreateCsv()
        {
            
            return Ok("CSV file created successfully");
        }




        //use CSV service and write the data of the incoming portfolio
        [HttpPost("sendportfolio")]
        public IActionResult SendPortfolio([FromBody] PortfolioModel input)
        {
            string filePath = "H:/_BKP/myData8.csv"; // Adjust the path as needed.

            try
            {
                // Request data from the portfolioProcessingService based on the portfolio input
                var allRows = _portfolioProcessingService.SendPortfolio(input);

                // Create a CSV file using the allRows data
                CsvService.CreateCsv(allRows, filePath);

                // Return the allRows data as the response
                return Ok(new { data = allRows });
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occurred during processing
                return BadRequest($"Error: {ex.Message}");
            }
        }


        //email must be a string
        public class EmailData
        {
            public string? PortfolioTable { get; set; }
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

            var selectedPortfolioNames = new List<string>();
            foreach (int i in portfoliosNumbersArray)
            {
                if (i >= 0 && i < portfolioNamesList.Count)
                {
                    selectedPortfolioNames.Add(portfolioNamesList[i]);
                }
            }

            string emailBody = string.Join(", ", selectedPortfolioNames);
            _emailService.SendEmail("giorgosstefatos@gmail.com", "Selected Portfolios", emailBody);

            return Ok(new { message = "Email sent successfully" });
        }

    }
}


