import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './Menu';
import ErrorReport from './ErrorReport';
import Component1 from './Component1';
import ExportAssignSchedulers from './ExportAssignSchedulers';
import PlotsComponent from './plots';
import LoginPage from './LoginPage';

export default function Content() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    //useEffect(() => {
    //    fetch('/snl/getportfolio5')
    //        .then(response => response.json())
    //        .then(data => {
    //            console.log('portfolio5_________________', data);
    //        });
    //}, []); // Added an empty dependency array to run only once on mount

    return (
        <Router>

            <div className="app-container">
                {isLoggedIn ? <div className="menu"><Menu /></div> : <></>}

                <div className="content">
                    <Routes>
                        {/* Default route to LoginPage */}
                        {isLoggedIn ? <></> : <Route path="/" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}    />}

                        <Route className="menu-links" path="plots" element={<PlotsComponent />} />
                        <Route className="menu-links" path="error-report" element={<ErrorReport />} />
                        <Route className="menu-links" path="export-portfolio" element={<ExportAssignSchedulers />} />
                        <Route className="menu-links" path="item4" element={<Component1 />} />
                        <Route className="menu-links" path="item5" element={<Component1 />} />
                        <Route className="menu-links" path="item6" element={<Component1 />} />
                        <Route className="menu-links" path="item7" element={<Component1 />} />
                        <Route className="menu-links" path="item8" element={<Component1 />} />
                        <Route className="menu-links" path="item9" element={<Component1 />} />
                        <Route className="menu-links" path="item10" element={<Component1 />} />

                        {/* Catch-all route */}
                        <Route className="menu-links" path="*" element={<ExportAssignSchedulers />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}
