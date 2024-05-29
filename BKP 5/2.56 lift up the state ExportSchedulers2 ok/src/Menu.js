// Menu.js
import React from 'react';
import { Link } from 'react-router-dom';


//here we select which route elements will use 
export default function Menu() {
    return (
        <nav>
            <ul>  
                {/*<li><Link to="login">LOGIN </Link></li>*/}
                <li><Link to="plots">Company </Link></li>
                <li><Link to="error-report">Error Report </Link></li>
                <li><Link to="export-portfolio">Export Portfolio</Link></li>
                <li><Link to="export-portfolio2">Export Portfolio2</Link></li>
                <li><Link to="error-report2">Error Report2 </Link></li>
                <li><Link to="item6">Manage Users </Link></li>
                <li><Link to="item7">Company Missing Vals </Link></li>
                <li><Link to="item8">Extract all Scores </Link></li>
            </ul>
        </nav>
    );
}

