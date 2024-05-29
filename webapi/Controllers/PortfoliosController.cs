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
        private readonly IPortfoliosProcessingService _portfolioProcessingService;


        // Constructor to inject the spesific Services
        public PortfoliosController(IEmailService emailService, IPortfolioService portfolioService, IPortfoliosProcessingService portfolioProcessingService)
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
        public IActionResult SendPortfolio([FromBody] PortfoliosModel input)
        {
            string baseFilePath = @"H:\_BKP\"; // Adjust the base path as needed.

            try
            {
                foreach (var portfolio in input.SelectedPortfolios)
                {
                    // Create a new PortfolioModel for each selected portfolio
                    var singlePortfolioInput = new PortfoliosModel
                    {
                        SelectedPortfolios = new[] { portfolio },
                        TimeFrame = input.TimeFrame
                    };

                    // Request data from the portfolioProcessingService based on the single portfolio input
                    var allRows = _portfolioProcessingService.SendPortfolio(singlePortfolioInput);

                    // Get the CSV content from the CsvService
                    string csvContent = CsvService.GetCsvContent(allRows);

                    // Generate the file name with the prefix "errorReportA_"
                    string fileName = $"errorReportA_{portfolio}";
                    string filePath = Path.Combine(baseFilePath, fileName);

                    // Ensure the directory exists
                    var directory = Path.GetDirectoryName(filePath);
                    if (!Directory.Exists(directory))
                    {
                        Directory.CreateDirectory(directory);
                    }

                    // Write the CSV content to the specified file path
                    System.IO.File.WriteAllText(filePath, csvContent);
                }

                // Return a success response
                return Ok(new { message = "CSV files created successfully" });
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occurred during processing
                return BadRequest($"Error: {ex.Message}");
            }
        }



        //dont forget email must be a string
        public class EmailData
        {
            public string? PortfolioTable { get; set; }
        }



        //hey API, POST the portfolios number positions from the selected rows in the menu
        public class portfoliosNumbers
        {
            public int[]? portfoliosNumbersArray { get; set; }
        }


        // (1) find the error report for each portfolio name
        // (2) create csv's (each csv contains the error report for each portfolio name)
        // and (3) SEND EMAIL and attach the csv's
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

            // Create a new MimeMessage
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Geo Stef", "geo_stef@hotmail.com"));
            message.To.Add(new MailboxAddress("", "giorgosstefatos@gmail.com"));
            message.Subject = "Selected Portfolios";

            // Create a new BodyBuilder
            var bodyBuilder = new BodyBuilder();
            bodyBuilder.TextBody = "Please find the selected portfolios attached.";

            // Attach each portfolio's data as a separate CSV file
            foreach (var portfolio in selectedPortfolioNames)
            {
                // Create a PortfolioModel with the portfolio name and default TimeFrame value
                var portfoliosModel = new PortfoliosModel
                {
                    SelectedPortfolios = new[] { portfolio },
                    TimeFrame = 2
                };

                // Get the data from the PortfolioProcessingService for the portfolio
                var portfolioData = _portfolioProcessingService.SendPortfolio(portfoliosModel);

                // Get the CSV content for the portfolio data
                string csvContent = CsvService.GetCsvContent(portfolioData);

                // Create a temporary file path for the CSV attachment
                string tempFilePath = Path.Combine(Path.GetTempPath(), $"{portfolio}.csv");

                // Write the CSV content to the temporary file
                System.IO.File.WriteAllText(tempFilePath, csvContent);

                // Attach the CSV file to the email
                bodyBuilder.Attachments.Add(tempFilePath);
            }

            // Set the email body
            message.Body = bodyBuilder.ToMessageBody();

            // Send the email using the IEmailService
            _emailService.SendEmail(message);

            // Delete the temporary CSV files
            foreach (var attachment in bodyBuilder.Attachments)
            {
                System.IO.File.Delete(attachment.ContentDisposition.FileName);
            }

            return Ok(new { message = "Email sent successfully with CSV attachments" });
        }

    }
}


