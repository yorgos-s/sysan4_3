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
        .map(([key, value]) => [key, ...value, false]);
    //console.log("Shedulets table", dataSchedulers)

    //const schedulersData = schedulers.map(s=>[])


    // STATES

    const [selectedPortfolios, setSelectedPortfolios] = useState([]);
    useEffect(() => {
        if (portfolioNamesArray && portfolioNamesArray.length > 0) {
            //dataTable = portfolioNamesArray.map(name => [name, "none", false]);
            setSelectedPortfolios(portfolioNamesArray.map(name => [name, "none", false]))
            console.log("dataTable", selectedPortfolios)
        }
    }, [portfolioNamesArray]);


    //which scheduler is currently selected (menu 2)
    const [selectedScheduler, setSelectedScheduler] = useState(dataSchedulers);


    //FUNCTIONS
    const handlePortfolioRowSelect = (selectedRows) => {
        // Handle the selected portfolio rows here
        console.log('Selected portfolio rows:', selectedRows);
    };

    const handleSchedulerRowSelect = (selectedRows) => {
        // Handle the selected scheduler rows here
        console.log('Selected scheduler rows:', selectedRows);
    };


    return ( 
        <div>
          <div>
          <TableSelectRows2
            data={selectedPortfolios}
                columnHeaders={["portfolios", "schedulers"]}
                setDataTable={setSelectedPortfolios}
                onRowSelect={handlePortfolioRowSelect}
                selection={2}

            />
           </div>

           <div>
            <TableSelectRows2
                data={selectedScheduler}
                columnHeaders={["schedulers", "email", "date"]}
                setDataTable={setSelectedScheduler}
                onRowSelect={handleSchedulerRowSelect}
                selection={1}

            />
            </div>
        
        </div>
    )
}