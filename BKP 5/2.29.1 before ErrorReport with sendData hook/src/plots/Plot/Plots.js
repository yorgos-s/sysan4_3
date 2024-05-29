import React from 'react'
import Plot from './Plot'

const Plots = ({colors,toggles2,vsb,Rows,DB,datesNoRep}) => {

  //this function augmentates the Math.max function
  //https://stackoverflow.com/questions/1669190/find-the-min-max-element-of-an-array-in-javascript

  let xSVG=2480;
  let ySVG=500;

  let nrYears = datesNoRep.length;

  /* lines in y axis */
  const yLines=[0,1,2,3,4,5,6,7,8,9]

  return (
    <>
    <svg className='svgPath'
        viewBox={`0 0 ${xSVG} ${ySVG}`}
        preserveAspectRatio="none">
        {
          DB.map((d,i)=> <Plot
            key={Math.random()} 
            dbRow={DB[i]} 
            toggles2={toggles2} 
            vsb={vsb} dash="" 
            color={colors[i]} 
            id={i} 
            Rows={Rows} />
          )
        }
       


      {/* LINES   */}

      {/*lines in the x axis*/}
      {datesNoRep.map((year,x)=>
        <line key={Math.random()} x1={x*(xSVG/nrYears)} y1={ySVG} 
        x2={x*(xSVG/nrYears)} y2={ySVG-10} 
        style={{stroke:"white",strokeWidth:"2"}} /> 
      )}

      {/*lines in the y axis*/}
      {yLines.map((y)=>
        <line key={Math.random()} x1="0" y1={y*50} 
        x2="5" y2={y*50} 
        style={{stroke:"white",strokeWidth:"4"}} /> 
      )}

      {/*lines in the y axis*/}
      {yLines.map((y)=>
        <line key={Math.random()} x1="0" y1={y*50} 
        x2={xSVG} y2={y*50} strokeDasharray="5,20"
        style={{stroke:"rgba(255,255,255,0.23)",strokeWidth:"4"}} /> 
      )}
        
    </svg>
    </>
  )
}

export default Plots
