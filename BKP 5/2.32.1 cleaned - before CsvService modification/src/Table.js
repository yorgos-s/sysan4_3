import React from 'react';


export default function Table({ allRows }) {
    return (
        <table border="1" className="table-data">
            <thead>
                <tr>
                    {/* keys of the first row   */}
                    {allRows.length > 0 && Object.keys(allRows[0]).map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
                    </thead>
                    <tbody>
                        {allRows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {Object.values(row).map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                        ))}
                 </tr>
               ))}
            </tbody>
        </table>
    )
}