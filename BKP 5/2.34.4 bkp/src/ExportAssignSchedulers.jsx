//////////////VALUE ///////////////////////
import React, { useState, useEffect } from 'react';
import useFetchInitData from './useFetchInitData';
import TableSelectRows from './TableSelectRows'
import TableSchedulers from './TableSchedulers';
import useSendData from './useSendData'; 

export default function ExportAssignSchedulers() {
    ////// scheduler/snldata    =   https://localhost:7260/scheduler/snldata'


    //INITIALIZE DATA
    const { data: portfolioNamesArray, isLoading: loading, error: errorInit } = useFetchInitData('/portfolios/getteststring');
    const { data: testString4, isLoading: loading4, error: errorInit4 } = useFetchInitData('scheduler/snldata');


    // Use useEffect to update portfoliosInit once portfolioNamesArray is loaded
    useEffect(() => {
        if (portfolioNamesArray && portfolioNamesArray.length > 0) {
            const initValues = portfolioNamesArray.map(name => [name, "none"]);
            setPortfoliosInit(initValues);
        }
    }, [portfolioNamesArray]); 

    //this is the "database" of schedulers --> not the state
    const schedulers = {
        "none": [],
        "scheduler1": ["giorgosstefatos@gmail.com,email@test1.com", "day"],
        "scheduler2": ["giorgosstefatos@gmail.com,email@test2.com", "month"],
        "scheduler3": ["giorgosstefatos@gmail.com,email@test3.com", "week"]
    }



    // STATES
    //useState([0,2])   -->   first and third will be selected
    const [selectedRowsNr, setSelectedRowsNr] = useState([]);
    //useState([[portfolio4.csv,"none"],[portfolio5.csv,"scheduler2"]])
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedScheduler, setSelectedScheduler] = useState("none");
    //all the names of the portfolios
    const [portfoliosInit, setPortfoliosInit] = useState([]);

    // Use useEffect to update portfoliosInit once portfolioNamesArray is loaded
    //useEffect(() => {
    //    if (selectedRows.length > 0 && selectedRows[0].length > 0) {
    //        console.log("______-selected rows", selectedRows[0][0]);
    //    }        
    //}, [selectedRows]); 


    //SEND DATA / custom hooks
    //  sendData is a FUNCTION --> data to POST to the server    /  responseData: response data from the server
    const { sendData: sendData4, isLoading: isLoading4, error: error4, responseData: responseData4 } = useSendData();
    const { sendData: sendDataSQL2, isLoading: isLoadingSQL2, error: errorSQL2, responseData: allRows } = useSendData();

    //(for email)send the int numbers of the selected portfolios 
    const handleSendData4 = () => {
        sendData4('portfolios/PortfolioStringsArray', { portfoliosNumbersArray: [0, 2] });
    };

    const handleSendDataSQL2 = () => {
    //    sendDataSQL2('/portfolios/sendportfolio', { Portfolio: "portfolio4.csv", TimeFrame: 2 });
    
        if (selectedRows.length > 0 && selectedRows[0].length > 0) 
            sendDataSQL2('/portfolios/sendportfolio', { Portfolio: selectedRows[0][0], TimeFrame: 2 });
         else 
            console.log('No portfolio selected ');
        
    };



    // MULTIPLE SELECTION TABLE
    const handleRowSelect2 = (rowIndex, rowData) => {

        // Update portfoliosInit --> set selectedScheduler
        if (rowIndex >= 0 && rowIndex < portfoliosInit.length) {
            let updatedPortfolios = [...portfoliosInit];
            updatedPortfolios[rowIndex] = [updatedPortfolios[rowIndex][0], selectedScheduler];
            setPortfoliosInit(updatedPortfolios);
            console.log(portfoliosInit);
        }

        // Update selectedRows (add/remove row) --> [[portfolio4.csv,"none"],[portfolio5.csv,"scheduler2"]]
        // * array even if only one item
        const rowDataString = JSON.stringify(rowData);
        setSelectedRows(prevSelectedRows => {
            const index = prevSelectedRows.findIndex(row => JSON.stringify(row) === rowDataString);
            if (index !== -1) {
                // If the rowData is already selected, remove it
                return prevSelectedRows.filter((_, i) => i !== index);
            } else {
                // If the rowData is not selected, add the new rowData
                return [...prevSelectedRows, rowData];
            }
        });

        // Update selectedRowsNr with the selected row numbers (indexes)
        setSelectedRowsNr(prevSelectedRowsNr => {
            const index = prevSelectedRowsNr.indexOf(rowIndex);
            if (index !== -1) {
                // If the rowIndex is already selected, remove it
                return prevSelectedRowsNr.filter(num => num !== rowIndex);
            } else {
                // If the rowIndex is not selected, add it to the array
                return [...prevSelectedRowsNr, rowIndex];
            }
        });
    };



   
    return (
        <>
            <div className="wrapper-portfolios-export">
                <h3>Select Portfolio</h3>

            <TableSelectRows
                rows={portfoliosInit}
                columns={["portfolios", "schedulers"]}
                onRowSelect={handleRowSelect2}
                selectedRows={selectedRows}
            />

            <div>
                <TableSchedulers schedulers={schedulers}
                    selectedScheduler={selectedScheduler}
                    setSelectedScheduler={setSelectedScheduler}
                />
            </div>
            </div>
            {/*<FetchSchedulers /> */}
            <button onClick={handleSendData4}>Send EMAIL</button>
            <button onClick={handleSendDataSQL2}>write SQL</button>
            {/*<button onClick={sendDataToAPI}>DATA SQL</button> */}
        </>

    );
}





