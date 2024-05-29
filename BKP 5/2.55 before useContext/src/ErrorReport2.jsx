import { useState, useEffect } from 'react';
import TableSelectRows2 from './TableSelectRows2'

import useFetchInitData from './useFetchInitData';
import useSendData from './useSendData';
import getLast from './functions/getLast';
import Tabs from './Tabs';

export default function ErrorReport2() {

    //INITIALIZE
    const { data: portfolioNamesArray, isLoading: loading, error: errorInit } = useFetchInitData('/portfolios/getteststring');
    
    // Update allPortfolios when portfolioNamesArray changes
    useEffect(() => {
        const portfoliosAndNumbers = portfolioNamesArray.map(p => [p, 0]);
        setAllPortfolios(portfoliosAndNumbers);
    }, [portfolioNamesArray]);

    const tabNames = { "tab1": [0, 3], "tab2": [3, 6], "tab3": [6, 14] }
    //const tabNames =  ["tab1", "tab2", "tab3"]


    // STATES
    //[["portfolio4.csv", 0]["portfolio4.csv", 2],...]
    const [allPortfolios, setAllPortfolios] = useState([]);

    //TimeFrame
    const [TimeFrame, setTimeFrame] = useState([["day", 0], ["week", 0], ["month", 0]])
    const daysToNumbers = { "day": 0, "week": 1, "month": 2 }

    //TimeFrame
    const [split, setSplit] = useState([["tab1", 2], ["tab2", 0], ["tab3", 0]])
    const splitPositons = { "tab1": [0, 3], "tab2": [3, 6], "tab3": [6, 14] }

    //selectedTabIdx
    const [tabSelectedSplit, setTabSelectedSplit] = useState("tab1")

    //FUNCTIONS
    //convert data API answer to a structure that the table can accept
    //=> array of arrays  and the last column all zero
    function convertObjValuesToArray(arrayOfObjects) {
        return arrayOfObjects.map(obj => [...Object.values(obj),0]);
    }

    function convertObjKeysToArray(arrayOfObjects) {
        return arrayOfObjects.map(obj => Object.keys(obj))[0];
            
    }



    // BUTTONS + CALL CUSTOM HOOK API
    // Send values to API --> return the error report
    const { sendData: sendDataSQL2, isLoading: isLoadingSQL2, error: errorSQL2, responseData: allRows2 } = useSendData();

    //data will be send to API by submit --> 
    const handleSubmit = () => {
        //find the strings: selectedPortfolio & selectedTimeFrame
        let selectedPortfolio = allPortfolios.filter(p => getLast(p) === 2).map(p => p[0])[0]
        let selectedTimeFrame = TimeFrame.filter(p => getLast(p) === 2).map(p => p[0])[0];

        //send them to API (in order to get the response allRows2)
        sendDataSQL2('/errorreportsnl/sendportfolio',
            { SelectedPortfolios: [selectedPortfolio], TimeFrame: daysToNumbers[selectedTimeFrame] });
    }


    // SELECTED VALUES
    const splitBounds = () => {
        const selectedTab = split.filter(t => getLast(t) === 2)
        //console.log("tab", splitPositons[selectedTab[0][0]])
        return splitPositons[selectedTab[0][0]]
    }

    const handleTabSelectSplit = (tabName) => {
        setTabSelectedSplit(tabName);
        console.log("tabbbb", tabSelectedSplit)
    }

    useEffect(() => {
        console.log("Updated tabSelectedSplit:", tabSelectedSplit);
    }, [tabSelectedSplit]);

    return (
        <div>
            {/*Portfolios*/}
            <TableSelectRows2
                tableData={allPortfolios}
                setTableData={setAllPortfolios}
                columnHeaders={["portfolios"]}
                selectionType={1}
            />

            {/*Time Frame*/}
            <TableSelectRows2
                tableData={TimeFrame}
                setTableData={setTimeFrame}
                columnHeaders={["Time Frame"]}
                selectionType={1}
            />

            {/*API results*/}
            <TableSelectRows2
                tableData={allRows2 ? convertObjValuesToArray(allRows2) : []}
                columnHeaders={allRows2 ? convertObjKeysToArray(allRows2) : []}
                splitRows={splitPositons[tabSelectedSplit
                ]}
                selectionType={0}
            />

            {/*tabs*/}

            <TableSelectRows2
                tableData={split}
                setTableData={setSplit}
                columnHeaders={["split"]}
                selectionType={1}

            />

            <Tabs
                tabNames={tabNames}
                onTabSelectSplit={handleTabSelectSplit}
                tabSelectedSplit={tabSelectedSplit}
            />



            <button onClick={handleSubmit}>SUBMIT</button>

        </div>
    );
}