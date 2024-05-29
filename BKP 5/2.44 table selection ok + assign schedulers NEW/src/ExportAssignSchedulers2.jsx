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
            setPortfoliosAndSchedulers(portfolioNamesArray.map(name => [name, "none", 0]))
        }
    }, [portfolioNamesArray]);

    const [selectedTimeFrame, setSelectedTimeFrame] = useState([["day", 0], ["week", 0], ["month", 0]])


    //which scheduler is currently selected (menu 2)
    const [selectedScheduler, setSelectedScheduler] = useState(dataSchedulers);




    //HANDLERS
    //let lastSelectedScheduler = "none"

    const handleSchedulerRowSelect = (selectedRow) => {
        // Handle the selected scheduler rows here
        //lastSelectedScheduler = selectedRow;
        //console.log('Selected scheduler rows:', lastSelectedScheduler[0]);
    };


    const handlePortfolioRowsSelect = (selectedRows,idx) => {
        //find the scheduler 
        let scheduler="none";
        selectedScheduler.forEach(r => {
            if (r[3] === 2)
                scheduler=r[0]
        })

        //find the last selected row & assign the scheduler
        const updatedPortfoliosAndSchedulers = portfoliosAndSchedulers.map((row) => {
            if ( row[2] === 2) {
                return [row[0], scheduler, row[2]];
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
                data={selectedScheduler}
                columnHeaders={["schedulers", "email", "date"]}
                setDataTable={setSelectedScheduler}
                onRowSelect={handleSchedulerRowSelect}
                selectionType={1}
            />
            </div>

            <div>
            <TableSelectRows2
                data={selectedTimeFrame}
                columnHeaders={["Time Frame"]}
                setDataTable={setSelectedTimeFrame}
                onRowSelect={handleSchedulerTimeSelect}
                selectionType={1}
            />
            </div>
        
        </div>
    )
}