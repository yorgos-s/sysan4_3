import React from 'react'

const TableHeader = 
({dates,datesNoRep,currentQuarter,name}) => {
  
  return (
    <tr 
    style={{backgroundColor:''}}>
    {<th className='sideHeaders'>
           {name}
     </th>}
        {datesNoRep.map(i=>
        <th key={Math.random()}
//if it's the first element(2022), then
//return the currentQuarter(eg 3) else 4
        colSpan="4"
        >{i}</th> 
        )}
    </tr>
  )
}

export default TableHeader