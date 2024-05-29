import React from 'react'
import { useState } from 'react'
import GridRow from './GridRow'
import GridHeader from './GridHeader'
import GridAnnual from './GridAnnual'
import GridRowEmpty from './GridRowEmpty'

const Grid = ({scrollToDate,OnTogglePlot,Rows,toggles2,colors1,clr,datesNoRep,intlAnnual}) => {

  const CRL={
    0:'INTL_BUSINESS_MACHINE_CORP (ACCELERATION)  ',
    1:'TECHNOLOGY (997) (ACCELERATION) ',
    2:'COMPANY SCORE (ACCELERATION)',
    3:'NUMBER OF NA (ACCELERATION)',
    4:'INTL_BUSINESS_MACHINE_CORP (TRUST)',
    5:'TECHNOLOGY (997) (TRUST)',
    6:'COMPANY TRUST (TRUST)',
    7:'Number OF NA (TRUST)'
  }

  const Q={
    0:'Q1',
    0.25:'Q2',
    0.5:'Q3',
    0.75:'Q4',
  }


  const [legendDown,setLegendDown]=useState()
  const [rowNumber,setRowNumber]=useState()
  const [cr,setCr]=useState()
  const [indxRow,setIndexRow]=useState()
  function onHover(i,v,c,indx){
    // console.log(i,v,c)
    setLegendDown(v)
    setRowNumber(i)
    setCr(c)
    indx=2022-(indx/4)-0.25
    setIndexRow(indx)
  }

  


  return (
  <>

<table className='Grid'
style={{width:'100.0%',cursor:"pointer"}}>
    <thead>
    <GridRowEmpty h="0.1"/>
    <GridHeader datesNoRep={datesNoRep} 
    scrollToDate={scrollToDate} />
    <GridRowEmpty h="0.1"/>
    <GridAnnual intlAnnual={intlAnnual} />
    </thead>
    <tbody>     
     {Rows.map((r,i)=>
     {
        return <>
        <GridRow 
        key={Math.random()}
        onHover={onHover}
        toggles2={toggles2}
        OnTogglePlot={OnTogglePlot}  
        rowDB={r.DB}
        row={r}
        // color={r.colors2} 
        clr={r.clr} 
        i={i}
        />
        {i==3?
        <GridRowEmpty key={Math.random()} h="0.2"/>:<></>}
      </>

     }
    )}
    
    </tbody>
</table>
{/* color:`rgb(${cr[0]},${cr[1]},${cr[2]})` */}
<p style={{color:'white',
fontSize:'0.8rem', float:'left', position:'relative',
bottom:'0.6rem'}}>
   {Math.floor(indxRow)}
   <span style={{visibility:'hidden'}}>_____</span>

   {Q[indxRow%1]}
   <span style={{visibility:'hidden'}}>_____</span>

   <span style={{display:'inlineBlock', border:'1px solid white',
  padding:'0 0.5em 0 0.5em'}}>
    {legendDown}</span>
   
   <span style={{visibility:'hidden'}}>_____</span>
   {(CRL[rowNumber])}   
</p>
</>
)}

export default Grid

