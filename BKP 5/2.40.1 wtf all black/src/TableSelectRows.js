import React from 'react';

export default function TableSelectRows({ rows, columns, onRowSelect, selectedRows }) {
    return (
        <>
            <table>
                <thead>
                    <tr>{columns.map((c, index) => <th key={index}>{c}</th>)}</tr>
                </thead>
                <tbody>
                    {rows.map((dataRow, rowIndex) => (
                        <tr key={rowIndex} onClick={() => onRowSelect(rowIndex, dataRow)}

                        
                        //Since I want selectedRows to be an array of portfolio string names - and not their indexes
                        //we have to identify them NOT by index number but by data  hence the  JSON.stringify
                        //* I use JSON.stringify because I am trying to create a "data agnostic" identifier
                        //I could for intance to use the first property as identifier but this limits the data structure
                            style={selectedRows.some(row => JSON.stringify(row) === JSON.stringify(dataRow)) ?
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
