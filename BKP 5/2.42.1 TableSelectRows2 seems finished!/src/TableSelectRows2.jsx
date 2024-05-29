
// data last column  provides which rows are selected
// --> each row's last column  cell    0=unselected     1=selected     2=last selected
// * "data" = state -->  selectedPortfolios:  [["portfolio1.csv","scheduler1","2"],["portfolio2.csv" .....]]
// ** the state's number of rows DOESN'T change   -->  eg. selectedPortfolios
// *** selectedRows change-- > onRowSelect(selectedRows);

// two ways to inform the outer world (where state lives) about the selected rows:
// (1) state's last column  (you can use useEffect)
// (2) onRowSelect={handlePortfoliosRowSelect} -->  const handlePortfolioRowsSelect = ( --> selectedRows <-- ) => {

// the property "selected":
// 0 = you can't select rows   1-select only one row   2-select multiple rows


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
            setDataTable(dataTableTemp);

            if (onRowSelect) {
                onRowSelect(row);
            }
        }

        // if selection=2 --> incoming data's last column will take these values:
        // 2 for the last selected row and 1 for any other selected row
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
            setDataTable(dataTableTemp);

            if (onRowSelect) {
                const selectedRows = dataTableTemp.filter((row) => row[row.length - 1] !== 0);
                onRowSelect(selectedRows);
            }
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