import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const DownloadCSV = ({ selectedIds, data }) => {

    const handleDownload = () => {
        let selectedData = data.filter(portfolio => selectedIds.includes(portfolio.id));
        selectedData = selectedData.map(portfolio => ({
            ...portfolio,
            values: portfolio.values.map(arr => arr.slice(portfolio.downLimit - 1, portfolio.upLimit)) // subtract 1 from downLimit
        }))

        const zip = new JSZip();

        selectedData.forEach((item, index) => {
            const portfolioName = item.name; // corrected from item.portfolio
            const values = item.values; // corrected from item.scores

            const csvContent = values.map(row => row.join(',')).join('\n');
            const csvHeader = item.name;
            const csvText = csvHeader + "\n" + csvContent;

            // Add each CSV file to the zip with a unique name based on the portfolio name
            zip.file(`${portfolioName}.csv`, csvText);
        });

        // Generate the zip file and trigger a download
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                saveAs(content, "portfolios.zip");
            });
    }

    return (
        <button onClick={handleDownload}>
            {/* <button > */}
            Download CSVs
        </button>
    );
};

export default DownloadCSV;
