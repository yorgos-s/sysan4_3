import { useState, useEffect } from 'react';

const useFetchInitData = (initialUrl, initialData = []) => {
    const [data, setData] = useState(initialData);
    const [url, setUrl] = useState(initialUrl);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const MAX_RETRIES = 20;
    const RETRY_DELAY = 1000;

    const fetchDataWithRetry = async (retryCount = 0) => {
        setIsLoading(true);
        try {
            const response = await fetch(url, {
                //because is GET request is optional
                method: 'GET', // Explicitly specifying the method as GET
                headers: {
                    // Optionally, you can specify headers here if needed
                    'Content-Type': 'application/json', //sends object
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error George! Status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
            //console.log("result_______", result)
            setIsLoading(false);
        } catch (error) {
            if (retryCount < MAX_RETRIES) {
                setTimeout(() => fetchDataWithRetry(retryCount + 1), RETRY_DELAY);
            } else {
                setError(error);
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchDataWithRetry();
    }, [url]);

    return { data, isLoading, error };
};

export default useFetchInitData;
