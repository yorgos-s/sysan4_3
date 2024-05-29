using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Data;
using System.Transactions;
using System;
using System.IO;
using webapi.Services;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SnlController : ControllerBase
    {
        private readonly string _connectionString;
        private readonly IPortfolioService _portfolioService;

        public SnlController(string connectionString, IPortfolioService portfolioService)
        {
            _connectionString = connectionString;
            _portfolioService = portfolioService;
        }


        // Endpoint to return the list of strings
        [HttpGet("getteststring")]
        public ActionResult<string> GetTestString()
        {
            Console.WriteLine(_portfolioService.GetPortfolioNames());
            return Ok(_portfolioService.GetPortfolioNames());
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

        //send only POST request  (to send the error report)
        // Define a controller action to handle HTTP POST requests at the "sendportfolio" route.
        [HttpPost("sendportfolio")]
        public IActionResult SendPortfolio([FromBody] PortfolioModel input)
        {
            // Extract portfolio name and lookback timeframe from the input model.
            string? portfolio = input.Portfolio;
            int lookBack = input.TimeFrame;

            // Construct the file path to the CSV file containing the portfolio companies.
            string csvFolderPath = $@"H:\Programming\_PROJECTS\Blooberg\__PORTFOLIOS_SQL_READ\{portfolio}";

            // Read the CSV file and split its contents into an array of company names.
            string[] companiesInsidePortfolio = ReadFileAndSplitIntoWords(csvFolderPath);

            // Join the company names into a single comma-separated string.
            string companiesInsidePortfolioStr = string.Join(',', companiesInsidePortfolio);

            // Initialize a list to hold rows of data fetched from the database.
            List<Dictionary<string, object>> allRows = new List<Dictionary<string, object>>();

            // Establish a connection to the SQL database using the connection string.
            using (SqlConnection sqlConnection = new SqlConnection(_connectionString))
            {
                sqlConnection.Open(); // Open the SQL connection.

                try
                {
                    // Prepare a SQL command to execute the stored procedure.
                    using (SqlCommand command = new SqlCommand("ExtractUpdatePeriodScores_Web", sqlConnection))
                    {
                        command.CommandType = CommandType.StoredProcedure; // Specify the command type as stored procedure.
                        // Add the portfolio companies as a parameter to the command.
                        command.Parameters.Add(new SqlParameter("@portfolio", SqlDbType.VarChar)
                        {
                            Value = companiesInsidePortfolioStr
                        });
                        // Add the lookback timeframe as a parameter to the command.
                        command.Parameters.Add(new SqlParameter("@lookback", SqlDbType.Int)
                        {
                            Value = lookBack
                        });

                        // Execute the command and use a reader to fetch the results.
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            // Loop through each ROW in the result set --> (0)AALLN (1)AAPUN
                            while (reader.Read())
                            {
                                //Ticker  BBERG_ID                BICS_SECTOR            BICS_GRP
                             //(0) AALLN   EQ0083398300001000      Basic Materials        Mining
                             //(1) AAPUN   EQ0036823400001000      Consumer, Cyclical     Retail

                                // Create a dictionary to hold the data of the current row.
                                //in the end each new dictionary it will be essentially a new row
                                //  string        string, int, bool, object
                                //"BICS_SECTOR": "Consumer, Cyclical",
                                Dictionary<string, object> row = new Dictionary<string, object>();
                                // Populate the dictionary with column names and their values.
                                //i = nr of column!
                                for (int i = 0; i < reader.FieldCount; i++)
                                {
                                    row[reader.GetName(i)] = reader[i];
                                }
                                // Add the dictionary to the list of all rows.
                                allRows.Add(row);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    // If an exception occurs, return a BadRequest with the error message.
                    return BadRequest($"Error: {ex.Message}");
                }
            }

            // If the operation is successful, return an Ok result with the data.
            return Ok(new { data = allRows });
        }

    }

 }

