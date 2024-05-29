using System.Text;
//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Text;

namespace webapi.Services
{
    public static class CsvService
    {
        public static void CreateCsvFromList(List<string> data, string filePath)
        {
            StringBuilder csvContent = new StringBuilder();

            // Assuming each string in the list represents a row
            foreach (var row in data)
            {
                csvContent.AppendLine(row);
            }

            File.WriteAllText(filePath, csvContent.ToString());
        }

        public static void CreateCsvFromDictionary<TKey, TValue>(Dictionary<TKey, TValue> data, string filePath)
        {
            StringBuilder csvContent = new StringBuilder();

            // Adding header
            csvContent.AppendLine("Key,Value");

            foreach (var kvp in data)
            {
                csvContent.AppendLine($"{kvp.Key},{kvp.Value}");
            }

            File.WriteAllText(filePath, csvContent.ToString());
        }
    }
}
