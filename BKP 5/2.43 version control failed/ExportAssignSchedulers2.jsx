import react, { useState, useEffect } from 'react';
import TableSelectRows2 from './TableSelectRows2'
import useFetchInitData from './useFetchInitData';
import useSendData from './useSendData';

//extra changes 7
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
    const [selectedPortfolios, setSelectedPortfolios] = useState([]);
    useEffect(() => {
        if (portfolioNamesArray && portfolioNamesArray.length > 0) {
            setSelectedPortfolios(portfolioNamesArray.map(name => [name, "none", 0]))
        }
    }, [portfolioNamesArray]);


    //which scheduler is currently selected (from schedulers table)
    const [arraysSchedulers, setArraysSchedulers] = useState(dataSchedulers);

    let selectedSchedulerName = "none";
    useEffect(() => {
        selectedSchedulerName = arraysSchedulers
        console.log("the selected scheduler name", selectedSchedulerName)
    }, [arraysSchedulers])


    //HANDLERS
    const handlePortfolioRowsSelect = (selectedRows) => {
        // Handle the selected portfolio rows here
        console.log('Selected portfolio rows:', selectedRows);
        console.log('STATE portfolios:', selectedPortfolios);

    };

    const handleSchedulerRowSelect = (selectedRow) => {
        // Handle the selected scheduler rows here
        console.log('Selected scheduler rows:', selectedRow);
        console.log('STATE scheduler :', arraysSchedulers);
    };

    return ( 
        <div>
          <div>
              <TableSelectRows2
                data={selectedPortfolios}
                    columnHeaders={["portfolios", "schedulers"]}
                    setDataTable={setSelectedPortfolios}
                    onRowSelect={handlePortfolioRowsSelect}
                    selection={2}
                />
           </div>

           <div>
                <TableSelectRows2
                        data={arraysSchedulers}
                    columnHeaders={["schedulers", "email", "date"]}
                        setDataTable={setArraysSchedulers}
                    onRowSelect={handleSchedulerRowSelect}
                    selection={1}
                />
            </div>
        
        </div>
    )
}