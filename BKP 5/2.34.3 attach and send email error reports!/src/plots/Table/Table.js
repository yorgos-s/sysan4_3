import React from 'react'

const Table = ({fakeDb}) => {
  return (
    <div>
        
        <table className="table-data">
            <thead>
                <tr>
                    {fakeDb.map((i,indx)=>
                    {          
                    <th key={Math.random()}>
                        {Object.keys(i)[0] + i.Q}
                        {/* {console.log(indx)} */}
                    </th> 
                    }  
                    )}
                </tr>
            
            </thead>
            <tbody>
                <tr>
                    {fakeDb.map(i=>
                    <td key={Math.random()}>{i.value}</td> 
                    )}
                </tr>
                <tr>
                    <td>1</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Table