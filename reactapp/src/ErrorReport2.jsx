import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TableSelectRows2 from './TableSelectRows2';
import getLast from './functions/getLast';
import Tabs from './Tabs';

export default function ErrorReport2({
    allPortfolios, setAllPortfolios, timeFrame, tabSelectedSplit, setTimeFrame, setTabSelectedSplit, sendDataSQL2, allRows2 }) {

    ////////////////////////////////   STATES   ////////////////////////

    const [errReportDiff, setErrReportDiff ] = useState()

    /////////////////////////////////
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const tabNames = { "tab1": [0, 3], "tab2": [3, 6], "tab3": [6, 14] };
    const daysToNumbers = { "day": 0, "week": 1, "month": 2 };
    const splitPositions = { "tab1": [0, 3], "tab2": [3, 6], "tab3": [6, 14] };

    ////restore values on start
    //useEffect(() => {

    //    const selectedPortfolio = allPortfolios.find(r => getLast(r) === 2)
    //    const selectedTimeFrame = timeFrame.find(r => getLast(r) === 2)
    //    //console.log("restart", selectedPortfolio[0])


    //    //call API on start to view the results of the selected values
    //    //if (selectedPortfolio && selectedTimeFrame)
    //    //console.log("hey")


    //}, []);



    function convertObjValuesToArray(arrayOfObjects) {
        return arrayOfObjects.map(obj => [...Object.values(obj), 0]);
    }

    function convertObjKeysToArray(arrayOfObjects) {
        return arrayOfObjects.map(obj => Object.keys(obj))[0];
    }

    

    // send selected data to backend  
    const handleSubmit = () => {
        let selectedPortfolio = allPortfolios.filter(p => getLast(p) === 2).map(p => p[0])[0];
        let selectedTimeFrame = timeFrame.filter(p => getLast(p) === 2).map(p => p[0])[0];


        sendDataSQL2('/errorreportsnl/sendportfolio', {
            SelectedPortfolios: [selectedPortfolio],
            TimeFrame: daysToNumbers[selectedTimeFrame]
        });
        callAPI(selectedPortfolio, selectedTimeFrame)
    };


    const callAPI = async (selectedPortfolio, selectedTimeFrame) => {
        console.log("API CALLED!!!");
        try {
            const response = await
            sendDataSQL2('/errorreportsnl/sendportfolio', {
                SelectedPortfolios: [selectedPortfolio],
                TimeFrame: daysToNumbers[selectedTimeFrame]
            });
            console.log("API Response:", response);
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    const handleTabSelectSplit = (tabName) => {
        setTabSelectedSplit(tabName);
        console.log("tabbbb", tabSelectedSplit);
    };

    useEffect(() => {
        console.log("Updated tabSelectedSplit:", tabSelectedSplit);
    }, [tabSelectedSplit]);


    //NEW SQL
    const fetchErrorReport = async () => {
        try {
            const response = await fetch('/errorreportsnl/getreport3'); 
            const data = await response.json();
            console.log("Error Report Data NEW:", data);
            setErrReportDiff(data)
        } catch (error) {
            console.error("Failed to fetch error report:", error);
        }
    };

    useEffect(() => {
        console.log("data OUTSIDE", errReportDiff)
    }, [errReportDiff])

    return (
        <div>
            <pre>{JSON.stringify(errReportDiff, null, 2)}</pre>

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

            {/*<Tabs*/}
            {/*    tabNames={tabNames}*/}
            {/*    onTabSelectSplit={handleTabSelectSplit}*/}
            {/*    tabSelectedSplit={tabSelectedSplit}*/}
            {/*/>*/}

            {/*<TableSelectRows2*/}
            {/*    tableData={errReportDiff ? errReportDiff[1] : []}*/}
            {/*    columnHeaders={errReportDiff ? errReportDiff[0] : []} */}
            {/*    selectionType={0}*/}
            {/*/>*/}

            {/*<button onClick={handleSubmit}>SUBMIT</button>*/}
            <button onClick={fetchErrorReport}>Get Error Report</button>


            <table>
                <thead>
                    {errReportDiff?errReportDiff[0].map((h,idx) => {
                        return <th key={idx}>{h !=="Highlight"?h:[]}</th>
                    }) : []}
                </thead>
                <tbody>
                    {/*{errReportDiff ? errReportDiff.map((d, idx) => <td key={idx}>{ d}</td>):[]}*/}
                    {errReportDiff ? errReportDiff.filter((row, idx) => idx > 0).map((row, idx) => {
                       return  <tr key={idx}>
                           {row.map((d, idx) =>
                           {   
                               return <td key={idx}
                                   style={{ backgroundColor: idx === 10 ? 'red' : (idx === 11 ? 'green' : 'none') }}>
                                        {d}
                                   </td>;
                              /* return <td key={idx} backgroundColor={idx===9||idx===10?'green':[] }>{d}</td>*/
                               //return idx < row.length - 1 ? <td key={idx}>{d}</td> : []

                               }
                           )}
                        </tr>
                    }
                    ):[]}
                </tbody>

            </table>

        </div>
    );
} 