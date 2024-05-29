import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const DownloadCSV = ({ data }) => {


    const handleDownload = () => {
        if (data && data.length > 0) {
            // Extract header (column names) from the first object
            const headers = Object.keys(data[0]);

            // Create CSV content
            const csvContent = [
                headers.join(','),
                ...data.map(row => headers.map(header => row[header]).join(','))
            ].join('\n');

            const zip = new JSZip();
            zip.file("allRowsData.csv", csvContent);

            // Generate the zip file and trigger a download
            zip.generateAsync({ type: "blob" })
                .then(function (content) {
                    saveAs(content, "allRows.zip");
                });
        }
    }


    return (
        <button onClick={handleDownload}>
            Download CSV
        </button>
    );
};

export default DownloadCSV;
