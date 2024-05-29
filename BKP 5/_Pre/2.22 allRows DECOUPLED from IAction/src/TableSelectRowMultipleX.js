import React, { useState } from 'react';

export default function TableSelectRowMultiple({ dataTable, onRowsSelect, extraProperties }) {
    const [selectedIndices, setSelectedIndices] = useState([]);

    // Toggles the selection state of a row
    const handleRowClick = (idx) => {
        const currentIndex = selectedIndices.indexOf(idx);
        let newSelectedIndices = [];

        if (currentIndex === -1) {
            // Row is not currently selected, add it to the selectedIndices array
            newSelectedIndices = [...selectedIndices, idx];
        } else {
            // Row is currently selected, remove it from the selectedIndices array
            newSelectedIndices = selectedIndices.filter((selectedIndex) => selectedIndex !== idx);
        }

        setSelectedIndices(newSelectedIndices);

        // Optionally, call onRowsSelect with the new array of selected rows' data
        if (onRowsSelect) {
            onRowsSelect(newSelectedIndices.map(index => dataTable[index]));
        }
    };

    return (
        <table className="table-data">
            <thead>
                <tr>
                    <th>Portfolios</th>
                    <th>Schedulers</th>
                </tr>
            </thead>
            <tbody>
                {dataTable.map((data, idx) => (
                    <tr key={idx}
                        onClick={() => handleRowClick(idx)}
                        style={selectedIndices.includes(idx) ? { backgroundColor: 'green' } : {}}
                    >
                        <td>{data}</td>
                        {/* Assuming extraProperties is an array with the same length as dataTable */}
                        <td>{extraProperties && extraProperties[idx]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
