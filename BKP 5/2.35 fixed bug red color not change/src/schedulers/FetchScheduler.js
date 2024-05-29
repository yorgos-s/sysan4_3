import React, { useState, useEffect } from "react";

export default function FetchSchedulers() {
    const [schedulers, setSchedulers] = useState({});

    useEffect(() => {
        const fetchSchedulers = () => {
            console.log("delayFEETCH");

            //fetch('/scheduler')  //this is not working
            //fetch('/weatherforecast/getteststring')   // IT WORKS!
            fetch('/scheduler/test')   
                .then(response => {
                    //console.log("BLOW UP FETCH!.................", response.json())
                    const resultJSON = response.json(); 
                    console.log("JSON.................", resultJSON, "PROMISE........", response)
                })
        };

        setTimeout(fetchSchedulers, 5000);
    }, []);

    return (
        <div>
        </div>
    );
}
