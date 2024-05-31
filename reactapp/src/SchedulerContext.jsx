import React, { createContext, useContext, useState } from 'react';

const SchedulerContext = createContext();

export const useScheduler = () => useContext(SchedulerContext);

export const SchedulerProvider = ({ children }) => {
    const [selectedScheduler, setSelectedScheduler] = useState("none");
    const [selectedTimeFrame, setSelectedTimeFrame] = useState("none");
    const [portfoliosAndSchedulers, setPortfoliosAndSchedulers] = useState([]);

    return (
        <SchedulerContext.Provider value={{
            selectedScheduler,
            setSelectedScheduler,
            selectedTimeFrame,
            setSelectedTimeFrame,
            portfoliosAndSchedulers,
            setPortfoliosAndSchedulers
        }}>
            {children}
        </SchedulerContext.Provider>
    );
};
