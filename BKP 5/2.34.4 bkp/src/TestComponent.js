import { react,useState,useEffect } from 'react'


export default function TestComponent() { 

    //INIT FETCH DATA   
    //useEffect(() => {
    //    let intervalId;
    //    let attempts = 0;

    //    const fetchData = () => {
    //        attempts += 1;
    //        if (attempts > 10) {
    //            clearInterval(intervalId);  // Stop the interval after 10 attempts
    //            return;
    //        }

    //        fetch('/weatherforecast/getportfolio5')
    //            .then(response => {
    //                if (!response.ok) {
    //                    throw new Error('Network response was not ok: ' + response.statusText);
    //                }
    //                clearInterval(intervalId);  // Stop the interval if the response is ok
    //                return response.json();
    //            })
    //            .then(data => {
    //                console.log('portfolio5_____', data);
    //            })
    //            .catch(error => {
    //                console.error('There has been a problem with your fetch operation:', error);
    //            });
    //    };

    //    intervalId = setInterval(fetchData, 1000);  // Call fetchData every 1 second

    //    return () => clearInterval(intervalId);  // Clear the interval when the component unmounts

    //}, []);


    return (
        <>
        </>
    )
}