import react, { useState, useEffect } from 'react';
import TableSelectRows2 from './TableSelectRows2'
import useFetchInitData from './useFetchInitData';
import useSendData from './useSendData';
import getLast from './functions/getLast';
import TimeFrameConverter from './functions/TimeFrameConverter';

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

    // Add an extra column with value 0 to each row in allRows2
    //const allRows2WithExtraColumn = allRows2.map(row => [...row, 0]);

    //TimeFrame
    const [TimeFrame, setTimeFrame] = useState([["day", 0], ["week", 0], ["month", 0]])

    // Functions
    const handlePortfolios = (p) => {
        console.log(p)
    };

    const handleTimeSelect = () => {

    }


    // CUSTOM HOOKS
    // Send values to API --> return the error report
    const { sendData: sendDataSQL2, isLoading: isLoadingSQL2, error: errorSQL2, responseData: allRows2 } = useSendData();

    const handleSubmit = () => {
        let selectedPortfolio = allPortfolios.filter(p => getLast(p) === 2).map(p => p[0])[0]
        let selectedTimeFrame = TimeFrame.filter(p => getLast(p) === 2).map(p => p[0])[0];

        //console.log(selectedPortfolio, selectedTimeFrame)
        console.log(TimeFrameConverter(selectedTimeFrame))
/*[[0, 0], [0, 0], [0, 0]]*/
        sendDataSQL2('/errorreportsnl/sendportfolio',
            { SelectedPortfolios: [selectedPortfolio], TimeFrame: TimeFrameConverter(selectedTimeFrame) });
    }


    return (
        <div>
            <TableSelectRows2
                data={allPortfolios}
                columnHeaders={["portfolios"]}
                setDataTable={setAllPortfolios}
                onRowSelect={handlePortfolios}
                selectionType={1}
            />

            <TableSelectRows2
                data={TimeFrame}
                columnHeaders={["Time Frame"]}
                setDataTable={setTimeFrame}
                onRowSelect={handleTimeSelect}
                selectionType={1}
            />

            <TableSelectRows2
                data={TimeFrame}
                columnHeaders={["RESULTS"]}
                selectionType={0}
            />

            <button onClick={handleSubmit}>SUBMIT</button>

        </div>
    );
}