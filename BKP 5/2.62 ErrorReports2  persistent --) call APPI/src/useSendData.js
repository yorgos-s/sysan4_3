import { useState } from 'react';

const useSendData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [responseData, setResponseData] = useState(null);

    const sendData = async (url, data) => {
        setIsLoading(true);
        setError(null);
        setResponseData(null);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('( *** [React] Network response was not ok');
            }

            const jsonData = await response.json();
            console.log('Success!!!:', jsonData);
            setIsLoading(false);
            setResponseData(jsonData);
            return jsonData;
        } catch (error) {
            console.error('Error:', error);
            setError(error);
            setIsLoading(false);
            return null;
        }
    };

    return { sendData, isLoading, error, responseData };
};

export default useSendData;
