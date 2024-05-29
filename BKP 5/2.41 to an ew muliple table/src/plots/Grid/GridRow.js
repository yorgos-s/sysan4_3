import React from 'react'
import GridToggle from './GridToggle';

const GridRow = ({onHover,toggles2,OnTogglePlot,Rows,row,rowDB,color,clr,i}) => {
  
  let values=[];
  rowDB.forEach(d=>values.push(d.value))

  function scale(OldValue){
    let OldMax=Math.max(...values);
    let OldMin=Math.min(...values);

    let OldRange = OldMax - OldMin; 
    let NewValue = (OldValue-OldMin)/OldRange;
    return NewValue;
  }

  // console.log(row)

  return (
    <tr 
    onClick={(e)=>OnTogglePlot(e,row)}
    style={{
    width:"100%",position:"relative",
    // cursor:"pointer"
    }}>
    
    {//iterate each value for this row
    rowDB.map((d,indx)=>{
      return <td 
      key={Math.random()}
      
      // onMouseEnter={() => console.log(indx+d.value)}
      onMouseEnter={() => onHover(i,d.value,color,indx)}
      onMouseLeave={() => console.log(' ')}
      style={{
      //   backgroundColor:
      //   `rgba(${color[0]},${color[1]},${color[2]},
      // ${scale(d.value)})`,
      backgroundColor:
      `${toggles2[i]?
        `rgba(${clr[0]},${clr[1]},${clr[2]},${scale(d.value)})`:
        `rgba(255,255,255,${scale(d.value)})`}`,
      width:'0.1em', height:'0.5em',
      padding:'0',margin:'0',
    }}>

      <GridToggle
      toggles2={toggles2}
      OnTogglePlot={OnTogglePlot}
      row={row}
      Rows={Rows} 
      indx={indx} 
      color={color} 
      clr={clr} i={i}
      />

      </td>
    })}     
</tr>
  )
}

export default GridRow


