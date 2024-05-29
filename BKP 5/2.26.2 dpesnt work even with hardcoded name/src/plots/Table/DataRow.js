import React from 'react'

const DataTable = ({fakeDb,name,color}) => {
  
  return (
        <tr className='table-module'
          style={{
            borderLeft:`6px solid rgb(${color[0]},${color[1]},${color[2]})`
        //  `6px solid rgb(${color[0],color[1],color[2]})`
        }}
        >
          <th className='sideHeaders'>
          {name}
          </th>

          {fakeDb.map(i=>
          <td key={Math.random()}>{i.value}</td> 
          )}
        </tr>
  )
}

export default DataTable


// ${rgb(color[0],color[1],color[2])}