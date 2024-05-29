import React from 'react'

const TestSvg = () => {
  return ( 
    <div style={{height:"40rem", width:"40rem", backgroundColor:"brown"}}>
        <svg  viewBox="0 0 300 300"
        style={{backgroundColor:"green", width:"30vw", height:"auto"}}>
            <path d="M150 0 L75 200 L225 200 Z" /> 
            <rect rect x="0" y="0" width="100" height="100" />
        </svg>  
    </div>

 
  )
}

export default TestSvg