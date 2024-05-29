import React, { useEffect, useState } from 'react';
import TableSplitted from './TableSplitted';
import DropDown from './DropDown';
import useSendRetrieve2 from './useSendRetrieve2';
import useFetchInitData from './useFetchInitData';
import useSendData from './useSendData';

export default function ErrorReport() {

    const [selectedPortfolio, setSelectedPortfolio] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    //const [portfolios,setPortfolios]=useState()

    //fetch portfolios from the Controller
    const { data: testString, isLoading: loading2, error: error2 } = useFetchInitData('/snl/getteststring');


    const portfoliosInit = []
    Object.values(testString).forEach(p => portfoliosInit.push(p))

    const portfoliosInitObj = {};
    portfoliosInit.forEach(p => { 
    let propertyName = p;
        portfoliosInitObj[propertyName] = p.split('.')[0];
    })


    //(2) POST ANSWER allRows from API   (sendDataToAPI --> onClick)
           //(1) POST data to API
     //'/snl/sendportfolio',{ Portfolio: selectedPortfolio, TimeFrame: selectedValue });
    const [allRows, error, sendDataToAPI] = useSendRetrieve2(
        '/snl/sendportfolio', { Portfolio: "portfolio4.csv", TimeFrame: 2 }
    );
    //const [allRows, error, sendDataToAPI] = useSendRetrieve2(
    //    //(1) POST data to API
    //    //'/snl/sendportfolio',{ Portfolio: selectedPortfolio, TimeFrame: selectedValue });
    //    '/snl/sendportfolio', { Portfolio: "portfolio4.csv", TimeFrame: 2 }
    //);

    //const { sendData: sendData4, isLoading: isLoading4, error: error4, responseData: responseData4 } = useSendData();
    //const handleSendData4 = () => {
    //    sendData4('/snl/sendportfolio', { Portfolio: "portfolio4.csv", TimeFrame: 2 });
    //};

    useEffect(() => {
        console.log("it works useEffect", allRows)
    }, [allRows])

    const OptionsValues2 = { 1: "day", 2: "week", 3: "month" }

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
            
            <button onClick={sendDataToAPI}>SUBMIT</button>
                <TableSplitted allRows={allRows} />


                {error && <p>Error occurred: {error.message}</p>}
            </div>
        </>
    );
}
