using System.Text;
using System.Collections.Generic;
using System.IO;

namespace webapi.Services
{
    public static class CsvService
    {
        // This method already matches your requirement.
        public static void CreateCsvFromList(List<string> data, string filePath)
        {
            StringBuilder csvContent = new StringBuilder();

            // Assuming each string in the list represents a row
            foreach (var row in data)
            {
                csvContent.AppendLine(row);
            }

            // Ensure the directory exists
            var directory = Path.GetDirectoryName(filePath);
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }

            File.WriteAllText(filePath, csvContent.ToString());
        }

        // No changes needed here unless you want similar functionality for dictionaries.
        public static void CreateCsvFromDictionary<TKey, TValue>(Dictionary<TKey, TValue> data, string filePath)
        {
            StringBuilder csvContent = new StringBuilder();

            // Adding header
            csvContent.AppendLine("Key,Value");

            foreach (var kvp in data)
            {
                csvContent.AppendLine($"{kvp.Key},{kvp.Value}");
            }

            // Ensure the directory exists
            var directory = Path.GetDirectoryName(filePath);
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }

            File.WriteAllText(filePath, csvContent.ToString());
        }
    }
}
