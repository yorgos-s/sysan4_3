import react, { useState } from 'react'

export default function TableSchedulers({ schedulers, selectedScheduler, setSelectedScheduler }) {
    return (
        <>
            <table className="table-data">
            {
                Object.keys(schedulers).map((scheduler,idx) =>
                    <tr key={idx} 
                        onClick={() => setSelectedScheduler(scheduler)}
                        style={scheduler === selectedScheduler ? { backgroundColor: 'green' } : {}}
                    >
                        {/*first item in the row (scheduler name)*/}
                        <th>{scheduler}</th>
                        {/*scheduler's associated info (email, periodicity) */}
                        {schedulers[scheduler].map((d,idx) => <td key={idx}>{d}</td>)}
                    </tr>
                )       
             }
           
            </table>
        </>
    )
}