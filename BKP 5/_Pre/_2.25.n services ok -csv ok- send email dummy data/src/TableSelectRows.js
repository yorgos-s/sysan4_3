import React from 'react';

export default function TableSelectRows({ rows, columns, onRowSelect, selectedRows }) {
    const handleRowSelect = (rowData) => {
        onRowSelect(rowData);
    }

    return (
        <>

            <table>
                <thead>
                    <tr>{columns.map((c, index) => <th key={index}>{c}</th>)}</tr>
                </thead>
                <tbody>
                    {rows.map((dataRow, rowIndex) => (
                        <tr key={rowIndex} onClick={() => handleRowSelect(rowIndex)}
                            style={selectedRows.includes(rowIndex) ?
                                { backgroundColor: "red" } : {}}>
                            {dataRow.map((dataCell, cellIndex) => (
                                <td key={cellIndex}>{dataCell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
