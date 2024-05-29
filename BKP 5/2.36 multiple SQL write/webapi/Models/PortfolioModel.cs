namespace webapi.Models
{
    //public class PortfolioModel
    //{
    //    public string? Portfolio { get; set; }
    //    public int TimeFrame { get; set; }
    //}

    public class PortfolioModel
    {
        public string[] SelectedPortfolios { get; set; }
        public int TimeFrame { get; set; }
    }

}
