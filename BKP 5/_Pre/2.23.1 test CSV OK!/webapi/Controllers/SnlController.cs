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
    public class SnlController : ControllerBase
    {
        private readonly string _connectionString;
        private readonly IPortfolioService _portfolioService;
        private readonly IPortfolioProcessingService _portfolioProcessingService;


        public SnlController(string connectionString, IPortfolioService portfolioService, IPortfolioProcessingService portfolioProcessingService)
        {
            _connectionString = connectionString;
            _portfolioService = portfolioService;
            _portfolioProcessingService = portfolioProcessingService;
        }

        //Send the initial portfolio names
        [HttpGet("getteststring")]
        public ActionResult<string> GetTestString()
        {
            Console.WriteLine(_portfolioService.GetPortfolioNames());
            return Ok(_portfolioService.GetPortfolioNames());
        }

        // Endpoint to return the list of strings
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
    }
}
