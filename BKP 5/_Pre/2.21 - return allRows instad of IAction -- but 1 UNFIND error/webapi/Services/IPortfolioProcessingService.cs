using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using webapi.Models;

namespace webapi.Services
{
    public interface IPortfolioProcessingService
    {
        // In IPortfolioProcessingService
        List<Dictionary<string, object>> SendPortfolio(PortfolioModel input);
    }
}
