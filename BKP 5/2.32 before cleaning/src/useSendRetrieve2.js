import { useState } from 'react';

const useSendRetrieve2 = (endpoint, dataAPI) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    //console.log(dataAPI)

    const sendToAPI = async () => {  
        //POST
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'text/plain'  
                    //if I want to send/POST only a string
                    //w/ appliction/json we can send "anything""
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataAPI) 
            });

            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            //POST ANSWER (NOT GET!)
            const jsonResponse = await response.json();

            //".data" because we sent return Ok(new { data = allRows }); from the Controller
            setData(jsonResponse.data);

        } catch (err) {
            setError(err);
            console.error("Failed to send data to API", err);
        }
    };
    //POST ANSWER (NOT GET!)
    //data: returned data from API, --> can be object, array, string, int, boolean
    //sendToAPI: is a FUNCTION 
    return [data, error, sendToAPI];
};

export default useSendRetrieve2;
