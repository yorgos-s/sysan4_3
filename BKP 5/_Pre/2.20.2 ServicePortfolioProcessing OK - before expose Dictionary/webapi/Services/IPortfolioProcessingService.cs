using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using webapi.Models;

namespace webapi.Services
{
    public interface IPortfolioProcessingService
    {
        IActionResult SendPortfolio(PortfolioModel input);
    }
}
