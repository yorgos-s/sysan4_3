using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using webapi.Models;

namespace webapi.Services
{
    public class PortfolioProcessingService : IPortfolioProcessingService
    {
        private readonly string _connectionString;

        public PortfolioProcessingService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IActionResult SendPortfolio(PortfolioModel input)
        {
            // Logic extracted from the controller's SendPortfolio method
            try
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

                    using (SqlCommand command = new SqlCommand("ExtractUpdatePeriodScores_Web", sqlConnection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.Add(new SqlParameter("@portfolio", SqlDbType.VarChar) { Value = companiesInsidePortfolioStr });
                        command.Parameters.Add(new SqlParameter("@lookback", SqlDbType.Int) { Value = lookBack });

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

                return new OkObjectResult(new { data = allRows });
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult($"Error: {ex.Message}");
            }
        }

        private string[] ReadFileAndSplitIntoWords(string filePath)
        {
            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException($"The file at {filePath} was not found.");
            }

            string content = File.ReadAllText(filePath);
            return content.Split(new[] { ' ', '\n', '\r', '\t' }, StringSplitOptions.RemoveEmptyEntries);
        }
    }
}
