namespace webapi.Services
{
    public interface IPortfolioService
    {
        IEnumerable<string> GetPortfolioNames();
    }

    public class PortfolioService : IPortfolioService
    {
        private readonly List<string> _portfolioNames;

        public PortfolioService()
        {
            _portfolioNames = LoadPortfolioNames();
        }

        private List<string> LoadPortfolioNames()
        {
            // Your logic to load portfolio names
            const string CsvFolderPath = @"C:\_portfolios";
            var csvFiles = Directory.GetFiles(CsvFolderPath, "*.csv");
            return csvFiles.Select(Path.GetFileName).ToList();
        }

        public IEnumerable<string> GetPortfolioNames() => _portfolioNames;
    }

}
