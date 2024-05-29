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
    const [portfoliosInit, setPortfoliosInit] = useState([]);

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


    // select multiple rows and assign the scheduler of the last selected row
    const handleRowSelect2 = (rowIndex) => {

        //assign selected scheduler    (update only selected)
        if (rowIndex >= 0 && rowIndex < portfoliosInit.length) {
            let updatedPortfolios = [...portfoliosInit];
            updatedPortfolios[rowIndex] = [updatedPortfolios[rowIndex][0], selectedScheduler];
            setPortfoliosInit(updatedPortfolios);
        }

        //
        setSelectedRows(prevSelectedRows => {
            // Check if the rowIndex is already selected
            if (prevSelectedRows.includes(rowIndex)) {
                // If yes, remove it from the selection
                return prevSelectedRows.filter(index => index !== rowIndex);
            } else {
                // If no, add it to the selection
                return [...prevSelectedRows, rowIndex];
            }
        });
    }

    ////download CSV
    //const handleRowSelect = (selectedPortfolio) => {
    //    sendDataToAPI({ Portfolio: selectedPortfolio, TimeFrame: "3" });
    //}



    //send selected portfolios https://localhost:7260/portfolios'
    const handleSendData4 = () => {
        console.log(selectedRows)
        sendData4('portfolios/PortfolioStringsArray', { portfoliosNumbersArray: selectedRows });
        //sendData5('portfolios/sendportfolio', { Portfolio: "portfolio2.csv", TimeFrame: "3" });
        //console.log("response data 555555?", responseData5)
        //sendData4('portfolios/PortfolioStringsArray', { PortfolioTable: "SEND ME OVER" });
    };

    //(2) POST ANSWER allRows from API   (sendDataToAPI --> onClick)               
    const [allRows, error, sendDataToAPI] = useSendRetrieve2(
        //(1) POST data to API
        '/portfolios/sendportfolio', { Portfolio: "portfolio4.csv", TimeFrame: 2 }
    );

    useEffect(() => {
        console.log("it works useEffect", allRows)
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





