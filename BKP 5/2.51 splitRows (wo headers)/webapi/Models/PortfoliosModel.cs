namespace webapi.Models
{
    //public class PortfolioModel
    //{
    //    public string? Portfolio { get; set; }
    //    public int TimeFrame { get; set; }
    //}

    public class PortfoliosModel
    {
        public string[] SelectedPortfolios { get; set; }
        public int TimeFrame { get; set; }
    }

}
