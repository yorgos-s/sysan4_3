using Microsoft.AspNetCore.Mvc;
using webapi.Services;
using webapi.Models;

[ApiController]
[Route("[controller]")]
public class SnlController : ControllerBase
{
    private readonly IPortfolioProcessingService _portfolioProcessingService;

    public SnlController(IPortfolioProcessingService portfolioProcessingService)
    {
        _portfolioProcessingService = portfolioProcessingService;
    }

    [HttpPost("sendportfolio")]
    public IActionResult SendPortfolio([FromBody] PortfolioModel input)
    {
        return _portfolioProcessingService.SendPortfolio(input);
    }
}
