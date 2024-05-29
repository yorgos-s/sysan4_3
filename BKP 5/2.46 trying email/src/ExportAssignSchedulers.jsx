    ////////////// VALUE //////////////////
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


    // transform portfolio names  --->  [portfolio1,"none"],[portfolio2,"none"],...etc
    useEffect(() => {
        if (portfolioNamesArray && portfolioNamesArray.length > 0) {
            const initValues = portfolioNamesArray.map(name => [name, "none"]);
            setAssignedSchedulers(initValues);
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

    // which [portfolioN.csv,"none"] pairs are selected (menu 1)
    const [selectedRows, setSelectedRows] = useState([]);

    // which scheduler has been assigned to each pair [portfolioN.csv,"none"] (menu 1)
    const [assignedSchedulers, setAssignedSchedulers] = useState([]);

    //which scheduler is currently selected (menu 2)
    const [selectedScheduler, setSelectedScheduler] = useState("none");





    // HOOKS sendData
    //  sendData is a FUNCTION --> data to POST to the server    /  responseData: response data from the server
    const { sendData: sendData4, isLoading: isLoading4, error: error4, responseData: responseData4 } = useSendData();
    const { sendData: sendDataSQL2, isLoading: isLoadingSQL2, error: errorSQL2, responseData: allRows } = useSendData();

    //(for email) send the int numbers of the selected portfolios 
    const handleSendData4 = () => {
        console.log("portfoliosNumbersArray", selectedRowsNr)
        sendData4('portfolios/PortfolioStringsArray', { portfoliosNumbersArray: selectedRowsNr }); //selectedRowsNr
    };
    //write the csv's to the hard drive
    const handleSendDataSQL2 = () => {
        if (selectedRows.length > 0) {
            const selectedPortfolios = selectedRows.map(row => row[0]);
            sendDataSQL2('/portfolios/sendportfolio',
                { SelectedPortfolios: selectedPortfolios, TimeFrame: 2 });
                //["portfolio4.csv", "portfolio5.csv"]
        } else {
            console.log('No portfolio selected');
        }
    };



    // MULTIPLE SELECTION TABLE
    const handleRowSelect2 = (rowIndex, rowData) => {

        // Update portfoliosInit --> set selectedScheduler
        if (rowIndex >= 0 && rowIndex < assignedSchedulers.length) {
            let updatedPortfolios = [...assignedSchedulers];
            updatedPortfolios[rowIndex] = [updatedPortfolios[rowIndex][0], selectedScheduler];
            setAssignedSchedulers(updatedPortfolios);
            console.log(assignedSchedulers);
        }


        // Update selectedRows (add/remove row) --> [[portfolio4.csv,"none"],[portfolio5.csv,"scheduler2"]]
        // * array even if only one item
        // also it handles a bug where --> when I select a scheduler --> and then I click a portfolio -->y doesnt turn red
        const rowDataString = JSON.stringify(rowData);
        setSelectedRows(prevSelectedRows => {
            const index = prevSelectedRows.findIndex(row => JSON.stringify(row) === rowDataString);
            if (index !== -1) {
                // If the rowData is already selected, remove it
                const updatedSelectedRows = prevSelectedRows.filter((_, i) => i !== index);
                return updatedSelectedRows;
            } else {
                // If the rowData is not selected, add the new rowData
                const updatedSelectedRows = [...prevSelectedRows, [rowData[0], selectedScheduler]];
                return updatedSelectedRows;
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
                    rows={assignedSchedulers}
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





