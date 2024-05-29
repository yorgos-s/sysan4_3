export default function TableSelectRows2({ data, columnHeaders, setDataTable, selection, onRowSelect }) {

    const handleRowSelect = (row, idx) => {
        if (selection === 0) {
            return; // Do nothing if selection is 0
        }

        const dataTableTemp = [...data];
        const r = dataTableTemp[idx];

        if (selection === 1) {
            // If selection is 1, allow only one row to be selected
            dataTableTemp.forEach((row, i) => {
                row[row.length - 1] = i === idx;
            });
        } else {
            // If selection is 2, toggle the selected row
            r[r.length - 1] = !r[r.length - 1];
        }

        setDataTable(dataTableTemp);

        if (onRowSelect) {
            const selectedRows = dataTableTemp.filter((row) => row[row.length - 1]);
            onRowSelect(selectedRows);
        }
    };  

    return (
        <table>
            <thead>
                {columnHeaders.map((c, idx) => (
                    <th key={idx}>{c}</th>
                ))}
            </thead>
            <tbody>
                {data.map((row, idx) => (
                    <tr
                        key={idx}
                        style={{ backgroundColor: row[row.length - 1] ? 'red' : '' }}
                        onClick={() => handleRowSelect(row, idx)}
                    >
                        {row.filter((_, idx) => idx !== row.length - 1).map((c, idx) => (
                            <td key={idx}>{c}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}