import React, { useEffect, useState } from 'react';
import TableSplitted from './TableSplitted';
import DropDown from './DropDown';
import useFetchInitData from './useFetchInitData';
import useSendData from './useSendData';

export default function ErrorReport() {
    // INITIALIZE
    const OptionsValues2 = { 1: "day", 2: "week", 3: "month" }

    // Fetch all portfolio names from the Controller
    const { data: testString, isLoading: loading2, error: error2 } = useFetchInitData('/errorreportsnl/initportfolios');

    // STATES
    const [selectedPortfolio, setSelectedPortfolio] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    const portfoliosInit = [];
    Object.values(testString).forEach(p => portfoliosInit.push(p));

    const portfoliosInitObj = {};
    portfoliosInit.forEach(p => {
        let propertyName = p;
        portfoliosInitObj[propertyName] = p.split('.')[0];
    });

    // CUSTOM HOOKS
    // Send values to API --> return the error report
    const { sendData: sendDataSQL2, isLoading: isLoadingSQL2, error: errorSQL2, responseData: allRows2 } = useSendData();


    const handleSendData4 = () => {
        //   PortfoliosModel accepts array and not a simple string   -->    [selectedPortfolio]  
        sendDataSQL2('/errorreportsnl/sendportfolio', { SelectedPortfolios: [selectedPortfolio], TimeFrame: 2 });
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
                {allRows2 && <TableSplitted allRows={allRows2 || []} />}
                {error2 && <p>Error occurred: {error2.message}</p>}
            </div>
        </>
    );
}