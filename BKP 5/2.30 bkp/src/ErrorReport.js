import React, { useEffect, useState } from 'react';
import TableSplitted from './TableSplitted';
import DropDown from './DropDown';
import useSendRetrieve2 from './useSendRetrieve2';
import useFetchInitData from './useFetchInitData';
import useSendData from './useSendData';

export default function ErrorReport() {


    //INITIALIZE
    const OptionsValues2 = { 1: "day", 2: "week", 3: "month" }

    //fetch all portfolio names from the Controller
    const { data: testString, isLoading: loading2, error: error2 } = useFetchInitData('/snl/getteststring');


    //STATES
    const [selectedPortfolio, setSelectedPortfolio] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    //const [portfolios,setPortfolios]=useState()

    const portfoliosInit = []
    Object.values(testString).forEach(p => portfoliosInit.push(p))

    const portfoliosInitObj = {};
    portfoliosInit.forEach(p => { 
    let propertyName = p;
        portfoliosInitObj[propertyName] = p.split('.')[0];
    })


    //CUSTOM HOOKS
    //send values to API --> return the error report
    const { sendData: sendDataSQL2, isLoading: isLoadingSQL2, error: errorSQL2, responseData: allRows2 } = useSendData();
    const handleSendData4 = () => {
        sendDataSQL2('/snl/sendportfolio', { Portfolio: "portfolio4.csv", TimeFrame: 2 })
    };


    return (
        <>    
            <div className="wrapper-error-report" >
            <h3>Select Portfolio</h3>
            <DropDown class="dropdown-content"
                selectedValue={selectedPortfolio}
                onChange={(e) => setSelectedPortfolio(e.target.value)}
                    dropDownOptionsValues={portfoliosInitObj}

             />

            <DropDown class="dropdown-content"
                selectedValue={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
                dropDownOptionsValues={OptionsValues2}
            />
            
                <button onClick={handleSendData4}>SUBMIT</button>
                {/*<TableSplitted allRows={allRows} />*/}
                {allRows2 && <TableSplitted allRows={allRows2 || []} />}
                {error2 && <p>Error occurred: {error2.message}</p>}
            </div>
        </>
    );
}
