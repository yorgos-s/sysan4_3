using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text;
using webapi.Services;
using webapi.Services.cs;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ErrorReportSnlController : ControllerBase
    {
        private readonly string _connectionString;
        private readonly IPortfolioService _portfolioService;
        private readonly IPortfoliosProcessingService _portfoliosProcessingService;

        public ErrorReportSnlController(string connectionString, IPortfolioService portfolioService, IPortfoliosProcessingService portfoliosProcessingService)
        {
            _connectionString = connectionString;
            _portfolioService = portfolioService;
            _portfoliosProcessingService = portfoliosProcessingService;
        }

        // Send the initial portfolio names
        [HttpGet("initportfolios")]
        public ActionResult<string> GetTestString()
        {
            return Ok(_portfolioService.GetPortfolioNames());
        }

        // Endpoint to return the list of strings
        [HttpPost("sendportfolio")]
        public IActionResult SendPortfolio([FromBody] PortfoliosModel input)
        {
            try
            {
                // Adjust the input to match the new PortfoliosModel structure
                var portfolioModel = new PortfoliosModel
                {
                    SelectedPortfolios = new[] { input.SelectedPortfolios[0] },
                    TimeFrame = input.TimeFrame
                };

                var allRows = _portfoliosProcessingService.SendPortfolio(portfolioModel);

                // Assuming successful execution, return the data.
                return Ok(allRows);
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occurred during processing
                return BadRequest($"Error: {ex.Message}");
            }
        }
    }
}