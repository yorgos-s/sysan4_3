export default function TableSelectRows2({ data, columnHeaders, setDataTable, selection, onRowSelect }) {

    const handleRowSelect = (row, idx) => {
        // Do nothing if selection is 0
        if (selection === 0) {
            return;
        }

        const dataTableTemp = [...data];
        const r = dataTableTemp[idx];

        if (selection === 1) {
            // If selection is 1, allow only one row to be selected
            dataTableTemp.forEach((row, i) => {
                row[row.length - 1] = i === idx ? 2 : 0;
            });
        }

        // if selection=2 --> incoming data's last column will take these values:
        //  2 for the last selected row    and     1 for any other selected row
        if (selection === 2) {
            // If selection is 2, toggle the selected row and update the values
            if (r[r.length - 1] === 0) {
                // If the row is currently unselected, set its value to 2
                r[r.length - 1] = 2;
                // Set the value of all other selected rows to 1
                dataTableTemp.forEach((row, i) => {
                    if (i !== idx && row[row.length - 1] !== 0) {
                        row[row.length - 1] = 1;
                    }
                });
            } else {
                // If the row is currently selected, set its value to 0
                r[r.length - 1] = 0;
            }
        }

        setDataTable(dataTableTemp);

        if (onRowSelect) {
            const selectedRows = dataTableTemp.filter((row) => row[row.length - 1] !== 0);
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