import React from 'react'

const GridToggle = ({toggles2,OnTogglePlot,row,Rows,indx,color,clr,i}) => {
    // console.log("rkkrofffff")
let toggleColor=`rgb(${clr[0]},${clr[1]},${clr[2]})`;
let noColor="rgba(0,0,0,0)";

// const r=row;


// const togglePlot=(e)=>{
//   e.target.setAttribute('data-toggle', row.toggle);
//   // 'data-toggle', {row.toggle});
//   e.target.style.backgroundColor=
//   `rgb(${clr[0]},${clr[1]},${clr[2]})`;
//   console.log(e.target.getAttribute("data-toggle") )
// }



//indx=first column   NOT  the row index
if(indx==0)
  return (
    <> 
    {/* {console.log(toggles2[2])} */}
      <button 

      //THIS line will activate the buttons as toggles
      // onClick={(e)=>OnTogglePlot(e,row)}

      // data-toggle='false'
      className='togglePlot'

      style={{display:"inline",
      
      left:"-1em",
      top:"-1px",
      borderStyle:"solid",
      backgroundColor:
      // `${toggles2[i]?
      //   `rgb(${clr[0]},${clr[1]},${clr[2]})`:'black'}`,
      `rgb(${clr[0]},${clr[1]},${clr[2]})`,
      // borderColor:'rgba(0,0,0,0)',
      position:"absolute",
      // color:"red",   
      height:"10px",
      width:"10px",
      cursor:"pointer",
      padding:"0",margin:'0'
      }}>
      </button> 
      {console.log()} 
    </> 
  )

}

export default GridToggle