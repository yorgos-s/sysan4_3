import React from 'react'

const GridHeader = ({scrollToDate,datesNoRep}) => {

  return (
<tr key={Math.random()}

>
    {
    datesNoRep.map(d=>{
      return <th colSpan={'4'}
      onClick={()=>scrollToDate(d)}
      // style={{}}
      key={Math.random()}
      style={{
      backgroundColor:'#',
      cursor: 'pointer',
      color:'white',
      borderRight:'1px solid #DDD',
      borderLeft:'1px solid #DDD',
      textAlign:'center',
      fontSize:'0.7em',
      padding:'0',margin:'0',
    }}
      >{d}</th>
    })}     
</tr>
  )
}

export default GridHeader