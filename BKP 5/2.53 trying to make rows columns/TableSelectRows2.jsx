import getLast from './functions/getLast';

export default function TableSelectRows2({ tableData, setTableData, columnHeaders, selectionType, onRowSelect, splitRows }) {
    const handleRowSelect = (row, idx) => {
        // ... (handleRowSelect function remains the same)
    };

    return (
        <table style={{ display: 'block' }}>
            <thead>
                <tr>
                    {columnHeaders
                        .slice(...(splitRows || [0, columnHeaders.length]))
                        .map((column, idx) => (
                            <th key={idx} style={{ display: 'block', float: 'left' }}>
                                {column}
                            </th>
                        ))}
                </tr>
            </thead>
            <tbody>
                {tableData.map((row, idx) => (
                    <tr
                        key={idx}
                        style={{
                            backgroundColor: getLast(row) ? 'red' : '',
                            display: 'block',
                            float: 'left',
                            cursor: 'pointer',
                        }}
                        onClick={() => handleRowSelect(row, idx)}
                    >
                        {row
                            .filter((_, idx) => idx !== row.length - 1)
                            .slice(...(splitRows || [0, row.length]))
                            .map((cell, idx) => (
                                <td key={idx} style={{ display: 'block' }}>
                                    {cell}
                                </td>
                            ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}