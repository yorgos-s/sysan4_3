using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text;
using webapi.Services;  // Add this to use IEmailService
using webapi.Services.cs;
using webapi.Models; // Ensure this is included

using MimeKit;
using MailKit.Net.Smtp;
using System.IO;


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
            string filePath = "H:\\_BKP\\myData9.csv"; // Adjust the path as needed.

            try
            {
                // Request data from the portfolioProcessingService based on the portfolio input
                var allRows = _portfolioProcessingService.SendPortfolio(input);

                // Get the CSV content from the CsvService
                string csvContent = CsvService.GetCsvContent(allRows);

                // Ensure the directory exists
                var directory = Path.GetDirectoryName(filePath);
                if (!Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                }

                // Write the CSV content to the specified file path
                System.IO.File.WriteAllText(filePath, csvContent);

                // Return a success response
                return Ok(new { message = "CSV file created successfully" });
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



        //send email
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

            // Get the CSV content from the CsvService
            string csvContent = CsvService.GetCsvContent(selectedPortfolioNames);

            // Create a temporary file path for the CSV attachment
            string tempFilePath = Path.Combine(Path.GetTempPath(), "selectedPortfolios.csv");

            // Write the CSV content to the temporary file
            System.IO.File.WriteAllText(tempFilePath, csvContent);

            // Create a new MimeMessage
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Geo Stef", "geo_stef@hotmail.com"));
            message.To.Add(new MailboxAddress("", "giorgosstefatos@gmail.com"));
            message.Subject = "Selected Portfolios";

            // Create a new BodyBuilder
            var bodyBuilder = new BodyBuilder();
            bodyBuilder.TextBody = "Please find the selected portfolios attached.";

            // Attach the CSV file to the email
            bodyBuilder.Attachments.Add(tempFilePath);

            // Set the email body
            message.Body = bodyBuilder.ToMessageBody();

            // Send the email using the IEmailService
            _emailService.SendEmail(message);

            // Delete the temporary CSV file
            System.IO.File.Delete(tempFilePath);

            return Ok(new { message = "Email sent successfully with CSV attachment" });
        }



    }
}


