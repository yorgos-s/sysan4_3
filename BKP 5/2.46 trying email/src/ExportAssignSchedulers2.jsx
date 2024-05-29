import react, { useState, useEffect } from 'react';
import TableSelectRows2 from './TableSelectRows2'
import useFetchInitData from './useFetchInitData';
import useSendData from './useSendData';

export default function ExportAssignSchedulers2() {

    //INITIALIZE DATA
    const { data: portfolioNamesArray, isLoading: loading, error: errorInit } = useFetchInitData('/portfolios/getteststring');
    const { data: testString4, isLoading: loading4, error: errorInit4 } = useFetchInitData('scheduler/snldata');


    //this is the "database" of schedulers --> not the state
    const schedulers = {
        "none": ["",""],
        "scheduler1": ["giorgosstefatos@gmail.com,email@test1.com", "day"],
        "scheduler2": ["giorgosstefatos@gmail.com,email@test2.com", "month"],
        "scheduler3": ["giorgosstefatos@gmail.com,email@test3.com", "week"]
    }


    const dataSchedulers = Object.entries(schedulers)
        .map(([key, value]) => [key, ...value, 0]);


    // STATES

    // (1) lst column hold the info: 0-not selected,1-selected,2-last selected
    // (2)assigned scheduler
    const [portfoliosAndSchedulers, setPortfoliosAndSchedulers] = useState([]);

    useEffect(() => {
        if (portfolioNamesArray && portfolioNamesArray.length > 0) {
            setPortfoliosAndSchedulers(portfolioNamesArray.map(name => [name, "none", "none", 0]))
        }
    }, [portfolioNamesArray]);


    //TimeFrame
    const [TimeFrame, setTimeFrame] = useState([["none",0],["day", 0], ["week", 0], ["month", 0]])

    //which scheduler is currently selected (menu 2)
    const [allSchedulers, setAllSchedulers] = useState(dataSchedulers);




    //HANDLERS
    //let lastSelectedScheduler = "none"

    const handleSchedulerRowSelect = (selectedRow) => {
        // Handle the selected scheduler rows here
        //lastSelectedScheduler = selectedRow;
        //console.log('Selected scheduler rows:', lastSelectedScheduler[0]);
    };

    ///assign the selected scheduler + time-frame
    const handlePortfolioRowsSelect = (selectedRows,idx) => {
        //find the scheduler 
        let selectedScheduler = "none";
        allSchedulers.forEach(r => {
            if (r[3] === 2)
                selectedScheduler = r[0]
        })

        //find the timeFrame 
        let selectedTimeFrame = "none";
        TimeFrame
            .forEach(t => {
            if (t[1] === 2)
                selectedTimeFrame = t[0]
        })

        //find the last selected row & assign the scheduler
        const updatedPortfoliosAndSchedulers = portfoliosAndSchedulers.map((row) => {
            if ( row[3] === 2) {
                return [row[0], selectedScheduler, selectedTimeFrame, row[3]];
            }
            return row;
        });

        setPortfoliosAndSchedulers(updatedPortfoliosAndSchedulers);
    };

    let timeFrame;
    const handleSchedulerTimeSelect = (selectedRow) => {
        timeFrame = selectedRow;
        console.log("Time Frame", timeFrame)      
    }



    //// HOOKS sendData
    ////  sendData is a FUNCTION --> data to POST to the server    /  responseData: response data from the server
    const { sendData: sendData4, isLoading: isLoading4, error: error4, responseData: responseData4 } = useSendData();
    const { sendData: sendDataSQL2, isLoading: isLoadingSQL2, error: errorSQL2, responseData: allRows } = useSendData();

    //(for email) send the int numbers of the selected portfolios 
    const handleSendEmail = () => {
        const selectedPortfoliosNr=[];
        portfoliosAndSchedulers.forEach((p,idx) => {
            if (p[3]) {
                selectedPortfoliosNr.push(idx)
            }
        })
        console.log(selectedPortfoliosNr)

        sendData4('portfolios/PortfolioStringsArray', { portfoliosNumbersArray: selectedPortfoliosNr }); //selectedRowsNr
    };
    //write the csv's to the hard drive
    const handleSendDataCSV = () => {
        //if (selectedRows.length > 0) {
        //    const selectedPortfolios = selectedRows.map(row => row[0]);
        //    sendDataSQL2('/portfolios/sendportfolio',
        //        { SelectedPortfolios: selectedPortfolios, TimeFrame: 2 });
        //    //["portfolio4.csv", "portfolio5.csv"]
        //} else {
        //    console.log('No portfolio selected');
        //}
    };

    return ( 
        <div>
          <div>
          <TableSelectRows2
                data={portfoliosAndSchedulers}
                columnHeaders={["portfolios", "schedulers"]}
                setDataTable={setPortfoliosAndSchedulers}
                onRowSelect={handlePortfolioRowsSelect}
                selectionType={2}
            />
           </div>

           <div>
            <TableSelectRows2
                data={allSchedulers}
                columnHeaders={["schedulers", "email", "date"]}
                setDataTable={setAllSchedulers}
                onRowSelect={handleSchedulerRowSelect}
                selectionType={1}
            />
            </div>

            <div>
            <TableSelectRows2
                data={TimeFrame}
                columnHeaders={["Time Frame"]}
                setDataTable={setTimeFrame}
                onRowSelect={handleSchedulerTimeSelect}
                selectionType={1}
            />
            </div>

            <button onClick={handleSendEmail}>Send EMAIL</button>
            <button onClick={handleSendDataCSV}>write CSV</button>
        
        </div>
    )
}