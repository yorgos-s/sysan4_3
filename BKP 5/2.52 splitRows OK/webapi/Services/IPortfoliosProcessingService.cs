using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using webapi.Models;

namespace webapi.Services
{
    public interface IPortfoliosProcessingService
    {
        List<Dictionary<string, object>> SendPortfolio(PortfoliosModel input);
    }
}
