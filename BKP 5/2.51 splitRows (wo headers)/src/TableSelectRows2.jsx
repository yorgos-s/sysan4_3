
// data's last column  provides which rows are selected --> we set these values here internally!
// --> each row's last column  cell    0=unselected     1=selected     2=last selected
// * "data" = state -->  selectedPortfolios:  [["portfolio1.csv","scheduler1","2"],["portfolio2.csv" .....]]
// ** the state's number of rows DOESN'T change   -->  eg. selectedPortfolios
// *** selectedRows change-- > onRowSelect(selectedRows);

// two ways to inform the outer world (where state lives) which rows are selected
// (1) state's last column  (===1 or 2)  (you can use useEffect)
// (2) onRowSelect={handlePortfoliosRowSelect} -->  const handlePortfolioRowsSelect = ( --> selectedRows <-- ) => {

// the property "selected":
// 0 = you can't select rows   1-select only one row   2-select multiple rows

// * also we return the index of the last column (2d argument)


//-------------------------------------
// tableData the data you see on the table  --> day (0), week (0), month (0)
// setTableData  to update the data you see on the table  -->  day (0),week (2), month (0)
// onRowSelect   to trigger an action (it returns row's data + idx)
// splitRows (array)  returns a spesific part of the table

import getLast from './functions/getLast'
export default function TableSelectRows2({ tableData, setTableData, columnHeaders,  selectionType, onRowSelect, splitRows }) {
    const handleRowSelect = (row, idx) => {
        // Do nothing if selection is 0
        if (selectionType === 0) {
            return;
        }

        const dataTableTemp = [...tableData];
        const r = dataTableTemp[idx];

        if (selectionType === 1) {
            // If selection is 1, allow only one row to be selected
            dataTableTemp.forEach((row, i) => {
                row[row.length - 1] = i === idx ? 2 : 0;
            });
            setTableData(dataTableTemp);

            if (onRowSelect) {
                onRowSelect(row,idx);
            }
        }

        // if selection=2 --> incoming data's last column will take these values:
        // 2 for the last selected row and 1 for any other selected row
        if (selectionType === 2) {
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
            setTableData(dataTableTemp);

            if (onRowSelect) {
                const selectedRows = dataTableTemp.filter((row) => getLast(row) !== 0);
                onRowSelect(selectedRows,idx);
            }
        }
    };

    return (
        <table>
            <thead>
                {columnHeaders.map((column, idx) => (
                    <th key={idx}>{column}</th>
                ))}
            </thead>
            <tbody>
                {tableData.map((row, idx) => (
                    <tr
                        key={idx}
                        // if the last column of this row > 0 --> red
                        style={{ backgroundColor: getLast(row)? 'red' : '' }}
                        onClick={() => handleRowSelect(row, idx)}
                    >
                        {row.filter((_, idx) => idx !== row.length - 1)
                            //if the property splitRows exists --> use the limits
                            .slice(...(splitRows || [0, row.length]))
                            .map((c, idx) => (
                            <td key={idx}>{c}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}