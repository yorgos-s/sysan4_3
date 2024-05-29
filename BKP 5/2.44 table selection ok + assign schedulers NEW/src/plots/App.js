import React from "react";
import {useState,useEffect} from 'react'
import Sidebar from "./Sidebar";
import TableMain from "./Table/TableMain";
import Grid  from "./Grid/Grid";
import Plots from './Plot/Plots'
import ExtBar from "./Table/ExtBar";


function App(){
  const rows=8;

const colors= [ [255,0,0],[255, 204, 193],[0,255,255],[153, 51, 255],
[255,0,0],[255, 204, 193],[0,255,255],[153, 51, 255],
[0,255,255],[153, 51, 255],
]


let dec2=(nr)=>Math.round(nr*100)/100

let add = new Int8Array(11);
//CREATE 10 rows  random database 


//10 rangées
function Database(){
  let DBN=[]
  for (let r=0; r<rows; r++) {
    DBN[r] = [];  
  // 20 ans avec 4 rapports pour chaque année
    for(var q = 0; q < 30*4; q++) {
      let p = Math.random()>0.8?1:0;
      
      Math.random()>0.8?
      add[r]=((Math.random()*400)-200):add[r]=add[r];
      let s=((Math.random()*400)-200)*p
      let v1=Math.round((Math.random()*2*100)+400+s)/100
      let v2=Math.round(add[r])/100
      // let v2=Math.round(add[r]+500)/100

      let obj={Q:q,value:dec2(v2+v1),date:2021-Math.floor(q/4)}
      DBN[r][q] = obj;
    }
  }
  return DBN
}
const [DB,setDB]=useState(Database)



    

/////////////////////////////////////////////
//ANNUAL DATA FOR TABLE + GRID
//create an array only with the dates
const dates=[];
DB[0].forEach((d)=>dates.push(d.date))
//remove repetion in dates table
let datesNoRep=[...new Set(dates)];


//INTL ANNUAL
//add min property
Array.prototype.min = function() {
    return Math.min.apply(null, this);
};

//Create intlAnnual data --> min for each quarter
let intl=[]
DB[0].forEach(obj=>intl.push(obj.value));

let intlAnnual=[];
for(let i=0; i<datesNoRep.length;i++){
    let indx=i*4
    intlAnnual.push(intl.slice(indx,indx+4).min())
}
/////////////////////////////////////////////



const headers=[
  'INTL_BUSINESS_MACHINE_CORP',
  'TECHNOLOGY (997)',
  'COMPANY SCORE',
  'NUMBER OF NA',
  'INTL_BUSINESS_MACHINE_CORP',
  'TECHNOLOGY (997)',
  'COMPANY SCORE',
  'NUMBER OF NA',
]

let Rows = []
for(let r=0; r<rows; r++){
  Rows.push({
    id:r,
    DB:DB[r],
    clr:colors[r], 
    // headers:headers[r]
  })
}

const [toggles2, setToggles2]=useState(
  [0,1,0,0,0,0,0,0,0,0,0]
)


const [vsb,setVsb]=useState(()=>
  ['visible', 'hidden','hidden','hidden','hidden',
 'hidden','hidden','hidden','hidden','hidden',
 'hidden','hidden']
)

function togglePlot(e,row){ 
   
const vsbn=[...vsb];
const toggles2n=[...toggles2]
const indx = row.id;

  vsbn[indx]='visible';
  setVsb(vsbn);

  toggles2n[indx]=!toggles2n[indx]
  setToggles2(toggles2n)

}

let [dateClicked,setDateClicked]=useState(2022)
let scrollToDate =(d)=>{
  setDateClicked(d)
}

    let widthScreen = window.screen.width;
    console.log(widthScreen)


  return(
    <div className="App">

      <div className="mainBody"> 



      
              <div className="dataBody" style={{ width: widthScreen/1.2 }}>
                  <div className="dataBodyInsideWrapper" >
           {/*<Table fakeDb={fakeDb}/> */}
          
          <div className="masterTable">  
            <TableMain 
              colors={colors}
              DB={DB}
              headers={headers}
              name1='INTL_BUSINESS_MACHINE_CORP'
              intlAnnual={intlAnnual}
              datesNoRep={datesNoRep}
              dateClicked={dateClicked}
            />
          </div>

          <br></br><br></br>

        <div className="diagramWrapper">
          <Plots 

            toggles2={toggles2}
            vsb={vsb}
            Rows={Rows}  
            DB={DB} 
            datesNoRep={datesNoRep}
            colors={colors}
          />
        </div>

        <Grid
          scrollToDate={scrollToDate}
          toggles2={toggles2}
          OnTogglePlot={togglePlot}
          Rows={Rows}
          DB={DB}
          colors={colors}
          intlAnnual={intlAnnual}
          datesNoRep={datesNoRep}
        />



        </div>   {/* End dataBodyWrapperInside */}
      
        </div>  
      

      </div> 
    </div>
  );
}

export default App;