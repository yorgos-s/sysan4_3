using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text;
using webapi.Services;
using webapi.Services.cs;
using webapi.Models;
using Microsoft.Data.SqlClient;

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



        //NEW SQL
        //[HttpGet("getreport3")]
        //public IActionResult GetErrorReport()
        //{
        //    // Step 1: Read the file and prepare the tickers string
        //    var filePath = @"H:\Programming\_PROJECTS\Blooberg\__PORTFOLIOS_SQL_READ\portfolio6.csv";
        //    var tickersList = new List<string>();

        //    using (var reader = new StreamReader(filePath))
        //    {
        //        while (!reader.EndOfStream)
        //        {
        //            var line = reader.ReadLine();
        //            tickersList.AddRange(line.Split(' ')); // Assuming space-separated values
        //        }
        //    }

        //    var tickers = string.Join(",", tickersList);

        //    // Step 2: Execute the stored procedure
        //    var connectionString = _connectionString; // Define your connection string here
        //    var result = new StringBuilder();
        //    using (var connection = new SqlConnection(connectionString))
        //    {
        //        // ErrorReport_ExtractORMR_diffs_Web
        //        var command = new SqlCommand("ErrorReport_ExtractORMR_diffs_Web", connection)
        //        {
        //            CommandType = System.Data.CommandType.StoredProcedure
        //        };
        //        command.Parameters.AddWithValue("@portfolio", tickers);

        //        connection.Open();
        //        //using (var reader = command.ExecuteReader())
        //        //{
        //        //    while (reader.Read())
        //        //    {
        //        //        result.AppendLine($"Ticker: {reader["Ticker"]}, Date: {reader["DATE"]}");
        //        //    }
        //        //}

        //        //using (
        //        //    var reader = command.ExecuteReader())
        //        //{
        //        //    // Fetch the names of the columns from the reader
        //        //    var columns = new List<string>();
        //        //    for (int i = 0; i < reader.FieldCount; i++)
        //        //    {
        //        //        columns.Add(reader.GetName(i));
        //        //    }

        //        //    // For each row
        //        //    while (reader.Read())
        //        //    {
        //        //        var row = new List<string>();
        //        //        // For each column
        //        //        for (int i = 0; i < reader.FieldCount; i++)
        //        //        {
        //        //            var columnValue = reader.IsDBNull(i) ? "NULL" : reader[i].ToString();
        //        //            // This assumes that your data does not contain commas. If it does, you will need to escape them.
        //        //            row.Add(columnValue);
        //        //        }
        //        //        // Join all the column values for the current row with a comma and append it to the result StringBuilder
        //        //        result.AppendLine(string.Join(",", row));
        //        //    }
        //        //}

        //        //using (var reader = command.ExecuteReader())
        //        //{
        //        //    // Fetch the names of the columns from the reader
        //        //    var columns = new List<string>();
        //        //    for (int i = 0; i < reader.FieldCount; i++)
        //        //    {
        //        //        columns.Add(reader.GetName(i));
        //        //    }

        //        //    // Add column headers to the result StringBuilder
        //        //    result.AppendLine(string.Join(",", columns));

        //        //    // For each row
        //        //    while (reader.Read())
        //        //    {
        //        //        var row = new List<string>();
        //        //        // For each column
        //        //        for (int i = 0; i < reader.FieldCount; i++)
        //        //        {
        //        //            var columnValue = reader.IsDBNull(i) ? "NULL" : reader[i].ToString();
        //        //            // This assumes that your data does not contain commas. If it does, you will need to escape them.
        //        //            row.Add(columnValue);
        //        //        }
        //        //        // Join all the column values for the current row with a comma and append it to the result StringBuilder
        //        //        result.AppendLine(string.Join(",", row));
        //        //    }
        //        //}

        //    }





        //    // Print results to the console (or you can return them)
        //    System.Diagnostics.Debug.WriteLine(result.ToString());

        //    return Ok(new { message = result.ToString() });

        //}



        [HttpGet("getreport3")]
        public IActionResult GetErrorReport()
        {
            // Step 1: Read the file and prepare the tickers string
            var filePath = @"H:\Programming\_PROJECTS\Blooberg\__PORTFOLIOS_SQL_READ\portfolio6.csv";
            var tickersList = new List<string>();

            using (var fileReader = new StreamReader(filePath))
            {
                while (!fileReader.EndOfStream)
                {
                    var line = fileReader.ReadLine();
                    tickersList.AddRange(line.Split(' ')); // Assuming space-separated values
                }
            }

            var tickers = string.Join(",", tickersList);

            // Step 2: Execute the stored procedure
            var connectionString = _connectionString; // Define your connection string here
            var result = new List<List<string>>(); // 2D array-like list of lists

            using (var connection = new SqlConnection(connectionString))
            {
                var command = new SqlCommand("ErrorReport_ExtractORMR_diffs_Web", connection)
                {
                    CommandType = System.Data.CommandType.StoredProcedure
                };
                command.Parameters.AddWithValue("@portfolio", tickers);

                connection.Open();
                using (var reader = command.ExecuteReader())
                {
                    // Fetch the names of the columns from the reader and add as the first row
                    var headers = new List<string>();
                    for (int i = 0; i < reader.FieldCount; i++)
                    {
                        headers.Add(reader.GetName(i));
                    }
                    result.Add(headers); // Add headers as the first row

                    // For each row
                    while (reader.Read())
                    {
                        var row = new List<string>();
                        // For each column
                        for (int i = 0; i < reader.FieldCount; i++)
                        {
                            var columnValue = reader.IsDBNull(i) ? "NULL" : reader[i].ToString();
                            row.Add(columnValue);
                        }
                        result.Add(row); // Add each row to the result
                    }
                }
            }

            // Optionally return the result as a JSON array
            return Ok(result);
        }


    }

}