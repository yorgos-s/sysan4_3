import React from 'react'


// import butt

const Sidebar = () => {
  return (
    <div className='sideBar'>
      
      <div className='side-buttons'>
          <button className="h-btn">Reports</button>
          <button><i className="fa fa-home"/>Company</button>
          <button><i className="fa-solid fa-coins"/>Industry</button>
          <p></p>
          <button className="h-btn">Advance Reports</button>
          <button><i className="fa-solid fa-calendar-days"/>Accounting Details</button>
          <button><i className="fa-solid fa-truck-fast"/>Private Company</button>
          <button><i className="fa-solid fa-circle-info"/>New Company</button>
          <button><i className="fa-solid fa-circle-user"/>Update Company</button>
          <button><i className="fa-solid fa-comments"/>Get History</button>
          <button><i className="fa-solid fa-lemon"/>Add History</button>
          <p></p>
          <button className="h-btn">Admin</button>
          <button><i className="fa-solid fa-circle-user"/>Manage Users</button>
          <button><i className="fa-solid fa-person"/>Company Missing Data</button>
          <button><i className="fa-brands fa-codepen"/>Company Missing Vals</button>
          <button><i className="fa-solid fa-layer-group"/>Fa Fields of a Firm</button>
          <button><i className="fa-solid fa-shop"/>Extract all scores</button>
          <button><i className="fa-brands fa-medium"/>Extract Variables</button>
          <p></p>
          <button><i className="fa-solid fa-circle-info"/>Help</button>
        </div>
    </div>
  )
}

export default Sidebar