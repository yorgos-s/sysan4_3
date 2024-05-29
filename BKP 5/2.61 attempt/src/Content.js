import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './Menu';
import ErrorReport from './ErrorReport';
import ErrorReport2 from './ErrorReport2';

import Component1 from './Component1';
import ExportAssignSchedulers from './ExportAssignSchedulers';
import ExportAssignSchedulers2 from './ExportAssignSchedulers2';

import PlotsComponent from './plots';
import LoginPage from './LoginPage';
import useFetchInitData from './useFetchInitData';


export default function Content() {

    //this is the "database" of schedulers --> not the state
    const schedulers = {
        "none": ["", ""],
        "scheduler1": ["giorgosstefatos@gmail.com,email@test1.com", "day"],
        "scheduler2": ["giorgosstefatos@gmail.com,email@test2.com", "month"],
        "scheduler3": ["giorgosstefatos@gmail.com,email@test3.com", "week"]
    }
    const dataSchedulers = Object.entries(schedulers).map(([key, value]) => [key, ...value, 0]);

    //STATES
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    ///EXPORT ASSIGN SCHEDULERS2
    const [portfoliosAndSchedulers, setPortfoliosAndSchedulers] = useState([]);
    const [timeFrame, setTimeFrame] = useState([["none", 0], ["day", 0], ["week", 0], ["month", 0]]);
    const [allSchedulers, setAllSchedulers] = useState(dataSchedulers);


    //ERROR REPORT 2
    //INITIALIZE
    const { data: portfolioNamesArray, isLoading: loading, error: errorInit } = useFetchInitData('/portfolios/getteststring');

    //STATES
    //[["portfolio4.csv", 0]["portfolio4.csv", 2],...]
    const [allPortfolios, setAllPortfolios] = useState([]);
    //Update allPortfolios when portfolioNamesArray changes
    useEffect(() => {
        if (portfolioNamesArray) {
            const portfoliosAndNumbers = portfolioNamesArray.map(p => [p, 0]);
            setAllPortfolios(portfoliosAndNumbers);
        }
    }, [portfolioNamesArray]);
    

    //TimeFrame
    const [timeFrame2, setTimeFrame2] = useState([["day", 0], ["week", 0], ["month", 0]])

    //split
    const [split, setSplit] = useState([["tab1", 2], ["tab2", 0], ["tab3", 0]])

    //selectedTabIdx
    const [tabSelectedSplit, setTabSelectedSplit] = useState("tab1")



    return (
        // here you define the paths  --> but in menu you decide which elements you will use
        <Router>

            <div className="app-container">
                {isLoggedIn ? <div className="menu"><Menu /></div> : <></>}

                <div className="content">
                    <Routes>
                        {/* Default route to LoginPage */}
                        {isLoggedIn ? <></> : <Route path="/" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />}



                        <Route className="menu-links" path="error-report2" element={
                             <ErrorReport2
                                extra={10} extras={[10, 5, 2]}
                                allPortfolios={allPortfolios}
                                setAllPortfolios={setAllPortfolios}
                                timeFrame={timeFrame2}
                                split={split}
                                tabSelectedSplit={tabSelectedSplit}
                                setTimeFrame={setTimeFrame2}
                                setSplit={setSplit}
                                setTabSelectedSplit={setTabSelectedSplit}


                            />
                        } />


                        <Route className="menu-links" path="plots" element={<PlotsComponent />} />
                        <Route className="menu-links" path="error-report" element={
                            <ErrorReport 
                                
                            />
                        } />
                            
                        <Route className="menu-links" path="export-portfolio" element={<ExportAssignSchedulers />} />
                        <Route className="menu-links" path="export-portfolio2" element={
                            <ExportAssignSchedulers2
                                portfoliosAndSchedulers={portfoliosAndSchedulers}
                                setPortfoliosAndSchedulers={setPortfoliosAndSchedulers}
                                TimeFrame={timeFrame}
                                setTimeFrame={setTimeFrame}
                                allSchedulers={allSchedulers}
                                setAllSchedulers={setAllSchedulers}
                            />
                        } />   

                        <Route className="menu-links" path="item6" element={<Component1 />} />
                        <Route className="menu-links" path="item7" element={<Component1 />} />
                        <Route className="menu-links" path="item8" element={<Component1 />} />
                        <Route className="menu-links" path="item9" element={<Component1 />} />
                        <Route className="menu-links" path="item10" element={<Component1 />} />

                        {/* Catch-all route */}
                        <Route className="menu-links" path="*" element={<Component1 />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}