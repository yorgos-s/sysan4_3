using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Linq;

namespace webapi.Services
{
    public static class CsvService
    {
        public static void CreateCsv(dynamic data, string filePath)
        {
            StringBuilder csvContent = new StringBuilder();

            if (data is List<Dictionary<string, object>> dictionaries)
            {
                // Assuming the first dictionary has all the headers
                if (dictionaries.Count > 0)
                {
                    var headers = dictionaries.First().Keys;
                    csvContent.AppendLine(string.Join(",", headers));

                    foreach (var dictionary in dictionaries)
                    {
                        var row = headers.Select(header =>
                        {
                            dictionary.TryGetValue(header, out object value);
                            return value?.ToString() ?? string.Empty;
                        });

                        csvContent.AppendLine(string.Join(",", row));
                    }
                }
            }
            else if (data is List<string> list)
            {
                foreach (var row in list)
                {
                    csvContent.AppendLine(row);
                }
            }
            // Add more conditions here for different types if necessary

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
