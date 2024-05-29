import React, { useState, useEffect } from 'react';

export default function TableSelectRowSingle({
    dataTable, headers, onRowSelect, extraProperty }) {
    const [selectedIdx, setSelectedIdx] = useState();
    // Initialize with empty strings --> to avoid unexpected behaviour
    const [rowData, setRowData] = useState(Array(dataTable.length).fill('')); 
    
    useEffect(() => {
        if (typeof selectedIdx === 'number') {
            const newData = [...rowData];
            newData[selectedIdx] = extraProperty;
            setRowData(newData);
        }
    }, [selectedIdx, extraProperty]);

    const handleClick = (idx) => {
        //onRowSelect is the trojan horse to inform the external world
        //which row has been selected
        //dataTable=[portfolio4,portfolio5,portfolio6]
        //dataTable[idx]-->eg dataTable[1]=portfolio5
        onRowSelect(dataTable[idx]);
        setSelectedIdx(idx);
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
                    {dataTable.map((d, idx) =>
                        <tr key={d}
                            onClick={() => { handleClick(idx) }}
                            style={idx === selectedIdx ?
                                { backgroundColor: 'green' } : {}}
                        >
                            <td>{d}</td>
                            <td>{rowData[idx]}</td>
                        </tr>
                    )}
                </tbody>
            </table>
    );
}

