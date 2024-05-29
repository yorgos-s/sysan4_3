import { useState } from 'react';

const useSendRetrieve = (endpoint) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const sendToAPI = async (dynamicData) => {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dynamicData)
            });

            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }

            const jsonResponse = await response.json();
            setData(jsonResponse.data);

        } catch (err) {
            setError(err);
            console.error("Failed to send data to API", err);
        }
    };

    return [data, error, sendToAPI];
};

export default useSendRetrieve;