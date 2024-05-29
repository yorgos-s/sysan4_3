import React from 'react'
import {useEffect,useLayoutEffect, useRef, useState} from 'react';
import Plots from '../Plot/Plots';

const Diagram = ({fakeDb, datesNoRep,DB}) => {

  //this function augmentates the Math.max function
  //https://stackoverflow.com/questions/1669190/find-the-min-max-element-of-an-array-in-javascript

    let xSVG=2480;
    let ySVG=500;

//  fakeDb.forEach(c=>{
//   fakeDbValues.push(c.value)
//  })
//  let maxFakeDb = Math.max.apply(null, fakeDbValues);
    let nrYears = datesNoRep.length;

    /* lines in y axis */
    const yLines=[0,1,2,3,4,5,6,7,8,9]

    // XXXXXX USELESS  XXXXXX because I used viewbox width,height
    /* Find width/height */
    const ref = useRef(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
      setWidth(ref.current.offsetWidth);
      setHeight(ref.current.offsetHeight);
    }, []);
    /* XXXX END Find width/height */

    
    let subDivision=5000/(DB[0].length+1);
    var tension = 1;
    let flx= 0.5;

    
  //create n=DB.length arrays and fill each one with 
  //the corresponding DB[i] values
  let  points=[];
  let indx = new Int8Array(DB.length);

  for(let i=0; i<DB.length; i++){
      points[i]=[];
      DB[i].forEach(c=>{
        points[i].push(indx[i]*subDivision)
        points[i].push(1000-(c.value*100))
        indx[i]++
    })
  }



    let pathL=[];
    useEffect(() => {

      for(let i=0;i<DB.length-6; i++){
      // pathL[i]=[];
      pathL[i] = document.querySelector(".path"+i);
      pathL[i].setAttribute("d", solve(points[i], tension, flx));
      }
      
    })


    function solve(data, k) {
    
      if (k == null) k = 1;
      
      var size = data.length;
      var last = size - 4;    
    
      var pathM = "M" + [data[0]*flx, data[1]*flx];
    
      for (var i = 0; i < size - 2; i +=2) {
    
        var x0 = i ? data[i - 2] : data[0];
        var y0 = i ? data[i - 1] : data[1];
    
        var x1 = data[i + 0];
        var y1 = data[i + 1];
    
        var x2 = data[i + 2];
        var y2 = data[i + 3];
    
        var x3 = i !== last ? data[i + 4] : x2;
        var y3 = i !== last ? data[i + 5] : y2;
        
        var cp1x = x1 + (x2 - x0) / 6 * k;
        var cp1y = y1 + (y2 - y0) / 6 * k;
    
        var cp2x = x2 - (x3 - x1) / 6 * k;
        var cp2y = y2 - (y3 - y1) / 6 * k;
       
        pathM += "C" + [cp1x*flx, cp1y*flx, cp2x*flx, 
        cp2y*flx, x2*flx, y2*flx];
      } 
    
      return pathM;
    }
    
  return (
    <>
    <div ref={ref}>

      {/* <p style={{color:"white"}}>{2350/nrYears}</p> */}
      <svg className='svgPath'
        viewBox={`0 0 ${xSVG} ${ySVG}`}
        preserveAspectRatio="none">

          {/* <polyline className="polyline" /> */}
          {/* <div className="t1"> */}
          <path className="path0" />
          <path className="path1" />
          <path className="path2" />
          <path className="path3" />
          <path className="path4" strokeDasharray="20,10" />
          <path className="path5" strokeDasharray="20,10" />
          <path className="path6" strokeDasharray="20,10" />
          <path className="path7" strokeDasharray="20,10" />
          
          {/* </div> */}
           
          
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

      <Plots DB={DB} />
    </div>
    </>
  )
}

export default Diagram


//STRAIGHT LINE!
//import React from 'react'
//import { useEffect } from 'react';

//const Plot = ({ toggles2, vsb, Rows, dbRow, color, dash, id, active }) => {
//    //  console.log(color[0]) 
//    let subDivision = 5000 / (dbRow.length + 1);
//    let tension = 1;
//    let flx = 0.5;

//    let indx = 0;
//    let points = [];

//    dbRow.forEach(d => {
//        points.push(indx * subDivision)
//        points.push(1000 - (d.value * 100))
//        indx++
//    })

//    useEffect(() => {
//        let pathL = document.querySelector(".path" + `${id}`);
//        pathL.setAttribute("d", solve(points, tension, flx));
//        //   console.log(pathL) 
//    })
//    // console.log(solve(points, tension, flx))

//    function solve(data, k) {

//        if (k == null) k = 1;

//        var size = data.length;
//        var last = size - 4;

//        var pathM = "M" + [data[0] * flx, data[1] * flx];

//        for (var i = 0; i < size - 2; i += 2) {

//            var x0 = i ? data[i - 2] : data[0];
//            var y0 = i ? data[i - 1] : data[1];

//            var x1 = data[i + 0];
//            var y1 = data[i + 1];

//            var x2 = data[i + 2];
//            var y2 = data[i + 3];

//            var x3 = i !== last ? data[i + 4] : x2;
//            var y3 = i !== last ? data[i + 5] : y2;

//            var cp1x = x1 + (x2 - x0) / 6 * k;
//            var cp1y = y1 + (y2 - y0) / 6 * k;

//            var cp2x = x2 - (x3 - x1) / 6 * k;
//            var cp2y = y2 - (y3 - y1) / 6 * k;

//            pathM += "C" + [cp1x * flx, cp1y * flx, cp2x * flx,
//            cp2y * flx, x2 * flx, y2 * flx];
//        }
//        return pathM;
//    }



//    return (
//        <path className={"path" + `${id}`}
//            stroke={`rgb(${color[0]},${color[1]},${color[2]})`}
//            // stroke={`red`}
//            strokeWidth='6'
//            strokeDasharray={id < 4 ? "" : "10 10"}
//            visibility={toggles2[id] ? 'default' : 'hidden'}
//        />
//    )
//}

export default Plot