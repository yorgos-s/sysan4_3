////////////////VALUE ///////////////////////
import React, { useState, useEffect } from 'react';
import useFetchInitData from './useFetchInitData';
import TableSelectRows from './TableSelectRows'
import TableSchedulers from './TableSchedulers';
import useSendData from './useSendData'; // Path to the custom hook
import useSendRetrieve from './useSendRetrieve';
import useSendRetrieve2 from './useSendRetrieve2';

export default function ExportAssignSchedulers() {




    //useState([0,2])   -->   first and third will be selected
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedScheduler, setSelectedScheduler] = useState("none");
    //all the names of the portfolios
    const [portfoliosInit, setPortfoliosInit] = useState([]);
    //nrToPortfolios = [{0:"portfolio0", {1:"portfolio1"...etc}}]
    //let nrToPortfolios = [];
    //useEffect(() => {
    //    nrToPortfolios = portfoliosInit.map((p, i) => ({ [i]: p[0] }));
    //    console.log("GOWWWWWWNNNNWN", nrToPortfolios)
    //}, [portfoliosInit])


    //CUSTOM HOOKS  
    //TEST sendData --> data to POST to the server    /  responseData: response data from the server
    const { sendData: sendData4, isLoading: isLoading4, error: error4, responseData: responseData4 } = useSendData();
    const { sendData: sendData5, isLoading: isLoading5, error: error5, responseData: responseData5 } = useSendData();

    //this is the "database" of schedulers --> not the state
    const schedulers = {
        "none": [],
        "scheduler1": ["giorgosstefatos@gmail.com,email@test1.com", "day"],
        "scheduler2": ["giorgosstefatos@gmail.com,email@test2.com", "month"],
        "scheduler3": ["giorgosstefatos@gmail.com,email@test3.com", "week"]
    }

    //portfolioNamesArray =  ['portfolio4.csv', 'portfolio5.csv', 'portfolio6.csv']
    //const { data: portfolioNamesArray, isLoading: loading, error: errorInit } =
    //    useFetchInitData('/portfolios');

    const { data: portfolioNamesArray, isLoading: loading, error: errorInit } = useFetchInitData('/portfolios/getteststring');


    const { data: testString4, isLoading: loading4, error: errorInit4 } =
        useFetchInitData('scheduler/snldata');
    //useFetchInitData('https://localhost:7260/scheduler/snldata');

    

    // Use useEffect to update portfoliosInit once portfolioNamesArray is loaded
    useEffect(() => {
        if (portfolioNamesArray && portfolioNamesArray.length > 0) {
            const initValues = portfolioNamesArray.map(name => [name, "none"]);
            setPortfoliosInit(initValues);
        }
    }, [portfolioNamesArray]); 




    const handleRowSelect2 = (rowIndex, rowData) => {
        //multiple select rows -->  

        setSelectedRows(prevSelectedRows => {
            const rowDataString = JSON.stringify(rowData);
            const index = prevSelectedRows.findIndex(row => JSON.stringify(row) === rowDataString);

            if (index !== -1) {
                // If the rowData is already selected, remove it
                return prevSelectedRows.filter((_, i) => i !== index);
            } else {
                // If the rowData is not selected, add it to the selected rows
                return [...prevSelectedRows, rowData];
            }
        });

        // Update the second column of the last clicked row with the selectedScheduler value
        setPortfoliosInit(prevPortfoliosInit => {
            const updatedPortfolios = [...prevPortfoliosInit];
            updatedPortfolios[rowIndex] = [rowData[0], selectedScheduler];
            return updatedPortfolios;
        });
    };


    useEffect(() => {
        console.log("selected rows", selectedRows)
    },[selectedRows])


    //send selected portfolios https://localhost:7260/portfolios'
    const handleSendData4 = () => {
        
        sendData4('portfolios/PortfolioStringsArray', { portfoliosNumbersArray: selectedRows });
        //console.log("the portfolio is :", nrToPortfolios)
    };

    //(2) POST ANSWER allRows from API   (sendDataToAPI --> onClick)               
    const [allRows, error, sendDataToAPI] = useSendRetrieve2(
        //(1) POST data to API
        //'/snl/sendportfolio',{ Portfolio: selectedPortfolio, TimeFrame: selectedValue });
        '/portfolios/sendportfolio', { Portfolio: selectedRows[0][0], TimeFrame: 2 });

    useEffect(() => {
        //console.log("it works useEffect", allRows)
    }, [allRows])


   
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
            <button onClick={handleSendData4}>Send Data 4</button>
            <button onClick={sendDataToAPI}>DATA SQL</button>
        </>

    );
}





