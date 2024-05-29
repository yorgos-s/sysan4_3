import React, { useState } from 'react';

export default function TableSplitted({ allRows }) {
    const [columnRange, setColumnRange] = useState([0, 2]);  // Default to showing columns 1 and 2

    const ranges = ["0,2", "2,6", "6,8"];
    const categories = ["category1", "category2", "category3"];

    const handleSelectChange = (event) => {
        const selectedRange = event.target.value.split(',').map(Number);
        setColumnRange(selectedRange);
    };

    const startColumn = columnRange[0];
    const endColumn = columnRange[1];

    return (
        <div>
            <select onChange={handleSelectChange}>
                {ranges.map((range, index) => (
                    <option key={index} value={range}>{categories[index]}</option>
                ))}
            </select>

            <table border="1" className="table-data">
                <thead>
                    <tr>
                        {allRows.length > 0 && Object.keys(allRows[0]).slice(startColumn, endColumn).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {allRows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {Object.values(row).slice(startColumn, endColumn).map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}