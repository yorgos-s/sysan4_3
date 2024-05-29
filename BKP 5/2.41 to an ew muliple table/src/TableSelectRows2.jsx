import React from 'react';

// dataTable the last column : is the row selected true or false?
export default function TableSelectRows2({ data, columnHeaders, onRowSelect }) {
  const handleRowSelect = (row, idx) => {
    onRowSelect(row, idx);
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
            //last row's element, controls row's backgroundColor 
            style={{ backgroundColor: row[row.length-1]? 'red' : '' }}
            onClick={() => handleRowSelect(row, idx)}
          >
            {row.map((c, idx) => (
              <td key={idx}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}