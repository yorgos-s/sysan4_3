import React, { useEffect,useRef } from 'react'
import DataRow from './DataRow'
import DataHeader from './TableHeader'
import DataAnnual from './DataAnnual'
import RowEmpty from './RowEmpty'

//DATA TABLE
const TableMaster = 
({DB,headers, colors,datesNoRep,intlAnnual,dateClicked}) => {

    const nrColumns=datesNoRep.length;
    const tableRef=useRef()
    const firstRowTable=document.querySelector('.sideHeaders')
    // const firstRowTableWidth=firstRowTable.getBoundingClientRect().width;
    const frtw=400;

    useEffect(() => {        
        
        const tableWidth=tableRef.current.scrollWidth;

        const columnWidth=(tableWidth-frtw)/nrColumns;
        let columnId=2022-dateClicked;
        let columnPosition=(columnWidth*columnId)-frtw;

        tableRef.current.scrollLeft=columnPosition;
      },[dateClicked]);

  return (
    <table className="table-data" ref={tableRef}>

         {/* dates  */}  
        <thead>
            <DataHeader 
                fakeDb={DB[0]} 
                // dates={dates} 
                datesNoRep={datesNoRep}
                name='FISCAL PERIOD / ACCELERATION'
            />

        {/* FISCAL PERIOD / ACCELERATION  */}    
        </thead>
        <thead>
            <DataAnnual 
                fakeDb={DB[0]} 
                // dates={dates} 
                datesNoRep={datesNoRep}
                intlAnnual={intlAnnual}
                name='INTL ANUAL'
            />    
        </thead>
        <tbody>
            {
                DB.map((db,i)=>
                {if(i<4)
                    return <DataRow
                    fakeDb={DB[i]}
                    color={colors[i]}
                    name={headers[i]}
                    />
                }        
            )}
        </tbody> 
        
        <RowEmpty />
        <RowEmpty />

         {/* FISCAL PERIOD / TRUST        */}
        <DataHeader fakeDb={DB[4]}  
                datesNoRep={datesNoRep}
                name='FISCAL PERIOD / TRUST'
        />
        <tbody>
            {
                DB.map((db,i)=>
                {if(i>3 && i<8)
                    return <DataRow
                    fakeDb={DB[i]}
                    color={colors[i]}
                    name={headers[i]}
                    />
                }        
            )}
        </tbody>  
                 
    </table>

    
  )
}

export default TableMaster