import { useState, useEffect } from 'react';
import TableSelectRows2 from './TableSelectRows2'
import useFetchInitData from './useFetchInitData';
import useSendData from './useSendData';
import getLast from './functions/getLast';

export default function ErrorReport2() {

    //INITIALIZE
    const { data: portfolioNamesArray, isLoading: loading, error: errorInit } = useFetchInitData('/portfolios/getteststring');
    
    // Update allPortfolios when portfolioNamesArray changes
    useEffect(() => {
        const portfoliosAndNumbers = portfolioNamesArray.map(p => [p, 0]);
        setAllPortfolios(portfoliosAndNumbers);
    }, [portfolioNamesArray]);


    // STATES
    //[["portfolio4.csv", 0]["portfolio4.csv", 2],...]
    const [allPortfolios, setAllPortfolios] = useState([]);

    //TimeFrame
    const [TimeFrame, setTimeFrame] = useState([["day", 0], ["week", 0], ["month", 0]])
    const daysToNumbers = { "day": 0, "week": 1, "month": 2 }


    //FUNCTIONS
    //convert data API answer to a structure that the table can accept
    //=> array of arrays  and the last column all zero
    function convertObjValuesToArray(arrayOfObjects) {
        return arrayOfObjects.map(obj => [...Object.values(obj),0]);
    }

    function convertObjKeysToArray(arrayOfObjects) {
        return arrayOfObjects.map(obj => Object.keys(obj))[0];
            
    }



    // CUSTOM HOOK
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


    return (
        <div>
            <TableSelectRows2
                data={allPortfolios}
                columnHeaders={["portfolios"]}
                setDataTable={setAllPortfolios}
                selectionType={1}
            />

            <TableSelectRows2
                data={TimeFrame}
                columnHeaders={["Time Frame"]}
                setDataTable={setTimeFrame}
                selectionType={1}
            />

            <TableSelectRows2
                data={allRows2 ? convertObjValuesToArray(allRows2) : []}
                columnHeaders={allRows2 ? convertObjKeysToArray(allRows2) : []}
                selectionType={0}
            />

            <button onClick={handleSubmit}>SUBMIT</button>

        </div>
    );
}