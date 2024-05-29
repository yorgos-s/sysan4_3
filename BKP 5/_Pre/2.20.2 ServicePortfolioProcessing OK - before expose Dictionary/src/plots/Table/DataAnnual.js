import React from 'react'

const DataAnnual = 
({fakeDb,datesNoRep,dates,currentQuarter,intlAnnual}) => {
  return (
    <tr 
    // style={{backgroundColor:'rgb(100,0,250)'}}
    >
    {<th className='sideHeaders'>
    INTL_BUSINESS ANNUAL 
    </th>}
    {datesNoRep.map((i,indx)=>
    <th key={Math.random()}
    colSpan='4'>
        {intlAnnual[indx]}
    </th> 
    )}
</tr>
  )
}

export default DataAnnual