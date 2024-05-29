import React from 'react'

const GridAnnual = ({intlAnnual}) => {

  function scale(OldValue){
    let OldMax=Math.max(...intlAnnual);
    let OldMin=Math.min(...intlAnnual);

    let OldRange = OldMax - OldMin; 
    let NewValue = (OldValue-OldMin)/OldRange;
    return NewValue;
  }

  // console.log(scale(5))

  return (
<tr key={Math.random()}>
    {
    intlAnnual.map(d=>{
      return <td colSpan={'4'}
      key={Math.random()}
      style={{
      backgroundColor:'white',
      opacity:scale(d),
      width:'0.1em', height:'0.5em',
      padding:'0',margin:'0',
    }}
      ></td>
    })}     
</tr>
  )
}

export default GridAnnual