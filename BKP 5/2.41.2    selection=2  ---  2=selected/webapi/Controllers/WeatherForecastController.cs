using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Data;
using System.Transactions;
using System;
using System.IO;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly string _connectionString;

        public WeatherForecastController(string connectionString)
        {
            _connectionString = connectionString;
        }

        // Endpoint to return the list of strings
        [HttpGet("getteststring")]
        public ActionResult<string> GetTestString()
        {
            return Ok(GetAllPortfolioFileNames());

        }

        [HttpGet("test")]
        public ActionResult<IEnumerable<string>> Test()
        {
            return Ok(new List<string> { "G1", "C2", "V3" });
        }






        //Initially send portfolio names to UI
        IEnumerable<string> GetAllPortfolioFileNames()
        {
            const string CsvFolderPath = @"H:\Programming\_PROJECTS\Blooberg\__PORTFOLIOS_SQL_READ";
            // Get all .csv files from the directory
            var csvFiles = Directory.GetFiles(CsvFolderPath, "*.csv");

            List<string> fileNames = new List<string>();

            foreach (var file in csvFiles)
            {
                fileNames.Add(Path.GetFileName(file));
            }

            return fileNames;
        }





        // Model to receive portfolio data
        public class PortfolioModel
        {
            public string? Portfolio { get; set; }
            public int TimeFrame { get; set; }
        }



        public string[] ReadFileAndSplitIntoWords(string filePath)
        {

            if (!System.IO.File.Exists(filePath))
            {

                throw new FileNotFoundException($"The file at {filePath} was not found.");
            }

            // Read the entire content of the file
            string content = System.IO.File.ReadAllText(filePath);

            string[] words = content.Split(new char[] { ' ', '\n', '\r', '\t' }, StringSplitOptions.RemoveEmptyEntries);

            return words;
        }

        //Receive selected portfolio - send error report
        [HttpPost("sendportfolio")]
        public IActionResult SendPortfolio([FromBody] PortfolioModel input)
        {
            string? portfolio = input.Portfolio;
            int lookBack = input.TimeFrame;
            string csvFolderPath = $@"H:\Programming\_PROJECTS\Blooberg\__PORTFOLIOS_SQL_READ\{portfolio}";
            string[] companiesInsidePortfolio = ReadFileAndSplitIntoWords(csvFolderPath);
            string companiesInsidePortfolioStr = string.Join(',', companiesInsidePortfolio);

            List<Dictionary<string, object>> allRows = new List<Dictionary<string, object>>();

            using (SqlConnection sqlConnection = new SqlConnection(_connectionString))
            {
                sqlConnection.Open();

                try
                {
                    using (SqlCommand command = new SqlCommand("ExtractUpdatePeriodScores_Web", sqlConnection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@portfolio", SqlDbType.VarChar)
                        {
                            Value = companiesInsidePortfolioStr
                        });
                        command.Parameters.Add(new SqlParameter("@lookback", SqlDbType.Int)
                        {
                            Value = lookBack
                        });

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Dictionary<string, object> row = new Dictionary<string, object>();
                                for (int i = 0; i < reader.FieldCount; i++)
                                {
                                    row[reader.GetName(i)] = reader[i];
                                }
                                allRows.Add(row);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest($"Error: {ex.Message}");
                }
            }

            return Ok(new { data = allRows });
        }

        //send only portfolio5 just for test
        [HttpGet("getportfolio5")]
        public IActionResult GetPortfolio5()
        {
            string csvFolderPath = @"H:\Programming\_PROJECTS\Blooberg\__PORTFOLIOS_SQL_READ\portfolio5.csv";
            string[] companiesInsidePortfolio = ReadFileAndSplitIntoWords(csvFolderPath);
            string companiesInsidePortfolioStr = string.Join(',', companiesInsidePortfolio);

            List<Dictionary<string, object>> allRows = new List<Dictionary<string, object>>();

            using (SqlConnection sqlConnection = new SqlConnection(_connectionString))
            {
                sqlConnection.Open();

                try
                {
                    using (SqlCommand command = new SqlCommand("ExtractUpdatePeriodScores_Web", sqlConnection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@portfolio", SqlDbType.VarChar)
                        {
                            Value = companiesInsidePortfolioStr
                        });
                        command.Parameters.Add(new SqlParameter("@lookback", SqlDbType.Int)
                        {
                            Value = 30  // Assuming a 30-day lookback period as an example.
                        });

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Dictionary<string, object> row = new Dictionary<string, object>();
                                for (int i = 0; i < reader.FieldCount; i++)
                                {
                                    row[reader.GetName(i)] = reader[i];
                                }
                                allRows.Add(row);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    return BadRequest($"Error: {ex.Message}");
                }
            }

            return Ok(new { data = allRows });
        }



    }
}

