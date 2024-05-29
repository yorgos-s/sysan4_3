import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TableSelectRows2 from './TableSelectRows2';
import useFetchInitData from './useFetchInitData';
import useSendData from './useSendData';
import getLast from './functions/getLast';
import Tabs from './Tabs';

export default function ErrorReport2({ allPortfolios, setAllPortfolios, timeFrame, tabSelectedSplit, setTimeFrame, setTabSelectedSplit }) {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const tabNames = { "tab1": [0, 3], "tab2": [3, 6], "tab3": [6, 14] };
    const daysToNumbers = { "day": 0, "week": 1, "month": 2 };
    const splitPositions = { "tab1": [0, 3], "tab2": [3, 6], "tab3": [6, 14] };

    //restore values on start
    useEffect(() => {
        const selectedPortfolioURL = searchParams.get('portfolio');
        const selectedTimeFrameURL = searchParams.get('timeFrame');

        if (selectedPortfolioURL)
            setAllPortfolios(prevState => prevState.map(p => [p[0], p[0] === selectedPortfolioURL ? 2 : 0]));

        if (selectedTimeFrameURL)
            setTimeFrame(prevState => prevState.map(t => [t[0], t[0] === selectedTimeFrameURL ? 2 : 0]));

        //call API on start to view the results of the selected values
        if (selectedPortfolioURL)
            callAPI(selectedPortfolioURL, selectedTimeFrameURL)
        //////

    }, []);

    function convertObjValuesToArray(arrayOfObjects) {
        return arrayOfObjects.map(obj => [...Object.values(obj), 0]);
    }

    function convertObjKeysToArray(arrayOfObjects) {
        return arrayOfObjects.map(obj => Object.keys(obj))[0];
    }

    const { sendData: sendDataSQL2, isLoading: isLoadingSQL2, error: errorSQL2, responseData: allRows2 } = useSendData();

    // send selected data to backend  
    const handleSubmit = () => {
        let selectedPortfolio = allPortfolios.filter(p => getLast(p) === 2).map(p => p[0])[0];
        let selectedTimeFrame = timeFrame.filter(p => getLast(p) === 2).map(p => p[0])[0];

        // store  selected values inside the URL
        navigate(`/error-report2?portfolio=${selectedPortfolio}&timeFrame=${selectedTimeFrame}`);

        //sendDataSQL2('/errorreportsnl/sendportfolio', {
        //    SelectedPortfolios: [selectedPortfolio],
        //    TimeFrame: daysToNumbers[selectedTimeFrame]
        //});
        callAPI(selectedPortfolio, selectedTimeFrame)
    };

    const callAPI = (selectedPortfolio, selectedTimeFrame) => {
        console.log("API CALLED!!!")
        sendDataSQL2('/errorreportsnl/sendportfolio', {
            SelectedPortfolios: [selectedPortfolio],
            TimeFrame: daysToNumbers[selectedTimeFrame]
        });
    }

    const handleTabSelectSplit = (tabName) => {
        setTabSelectedSplit(tabName);
        console.log("tabbbb", tabSelectedSplit);
    };

    useEffect(() => {
        console.log("Updated tabSelectedSplit:", tabSelectedSplit);
    }, [tabSelectedSplit]);

    return (
        <div>
            <TableSelectRows2
                tableData={allPortfolios}
                setTableData={setAllPortfolios}
                columnHeaders={["portfolios"]}
                selectionType={1}
            />

            <TableSelectRows2
                tableData={timeFrame}
                setTableData={setTimeFrame}
                columnHeaders={["Time Frame"]}
                selectionType={1}
            />

            <TableSelectRows2
                tableData={allRows2 ? convertObjValuesToArray(allRows2) : []}
                columnHeaders={allRows2 ? convertObjKeysToArray(allRows2) : []}
                splitRows={splitPositions[tabSelectedSplit]}
                selectionType={0}
            />

            <Tabs
                tabNames={tabNames}
                onTabSelectSplit={handleTabSelectSplit}
                tabSelectedSplit={tabSelectedSplit}
            />

            <button onClick={handleSubmit}>SUBMIT</button>
        </div>
    )
}