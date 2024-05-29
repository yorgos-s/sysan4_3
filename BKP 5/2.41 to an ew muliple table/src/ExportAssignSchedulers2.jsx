import react, { useState, useEffect } from 'react';
import TableSelectRows2 from './TableSelectRows2'
import useFetchInitData from './useFetchInitData';
import useSendData from './useSendData';

export default function ExportAssignSchedulers2() {

    //INITIALIZE DATA
    const { data: portfolioNamesArray, isLoading: loading, error: errorInit } = useFetchInitData('/portfolios/getteststring');
    const { data: testString4, isLoading: loading4, error: errorInit4 } = useFetchInitData('scheduler/snldata');

    //useEffect(() => {
    //    console.log("portfoliossssssssssssssssss", portfolioNamesArray)
    //}, [portfolioNamesArray])

    //useEffect(() => {
    //    console.log("schedulersssssssssssssssss",testString4)
    //}, [testString4])

    // transform portfolio names  --->  [portfolio1,"none"],[portfolio2,"none"],...etc



    //this is the "database" of schedulers --> not the state
    const schedulers = {
        "none": ["",""],
        "scheduler1": ["giorgosstefatos@gmail.com,email@test1.com", "day"],
        "scheduler2": ["giorgosstefatos@gmail.com,email@test2.com", "month"],
        "scheduler3": ["giorgosstefatos@gmail.com,email@test3.com", "week"]
    }

    const dataSchedulers = Object.entries(schedulers)
        .map(([key, value]) => [key, ...value]);
    //console.log("Shedulets table", dataSchedulers)

    //const schedulersData = schedulers.map(s=>[])


    // STATES
    //con
    const [dataTable, setDataTable] = useState([]);
    useEffect(() => {
        if (portfolioNamesArray && portfolioNamesArray.length > 0) {
            //dataTable = portfolioNamesArray.map(name => [name, "none", false]);
            setDataTable(portfolioNamesArray.map(name => [name, "none", false]))
            console.log("dataTable", dataTable)
        }
    }, [portfolioNamesArray]);

    //useState([0,2])   -->   first and third will be selected
    const [selectedRowsNr, setSelectedRowsNr] = useState([]);

    // which [portfolioN.csv,"none"] pairs are selected (menu 1)
    const [selectedRows, setSelectedRows] = useState([]);


    //which scheduler is currently selected (menu 2)
    const [selectedScheduler, setSelectedScheduler] = useState("scheduler1");

    console.log("selectedScheduler", selectedScheduler)


    //FUNCTIONS

    const handleRowSelect = (row,idx) => {
        const dataTableTemp = [...dataTable];
        //invert the r= last element of the clicked row: false <--> true
        const r = dataTableTemp[idx];
        r[r.length - 1] = !r[r.length - 1];
        setDataTable(dataTableTemp);
    }


    return ( 
        <>
            <TableSelectRows2
                data={dataTable}
                columnHeaders={["portfolios","schedulers"] }
                onRowSelect={handleRowSelect}
            />  
            <br></br>
             <TableSelectRows2
                data={dataSchedulers}
                columnHeaders={["schedulers","email", "time"] }
                onRowSelect={handleRowSelect}
             />
        </>
    )
}