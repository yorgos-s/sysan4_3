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

        // it returns List<Dictionary<string, object>> (NO IActionResult!)
        public List<Dictionary<string, object>> SendPortfolio(PortfolioModel input)
        {
            List<Dictionary<string, object>> allRows = new List<Dictionary<string, object>>();
            try
            {
                string? portfolio = input.Portfolio;
                int lookBack = input.TimeFrame;
                string csvFolderPath = $@"H:\Programming\_PROJECTS\Blooberg\__PORTFOLIOS_SQL_READ\{portfolio}";
                string[] companiesInsidePortfolio = ReadFileAndSplitIntoWords(csvFolderPath);
                string companiesInsidePortfolioStr = string.Join(',', companiesInsidePortfolio);

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
                                var row = new Dictionary<string, object>();
                                for (int i = 0; i < reader.FieldCount; i++)
                                {
                                    row.Add(reader.GetName(i), reader.GetValue(i));
                                }
                                allRows.Add(row);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Depending on your error handling strategy, you might want to:
                // - Log the exception
                // - Throw a custom exception
                // - Return a special error object or an empty list
                // For this example, let's rethrow to preserve the method signature.
                throw new ApplicationException($"An error occurred in SendPortfolio: {ex.Message}", ex);
            }

            return allRows;
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
