import { useState } from 'react';
import ShowComponent from '../../components/ShowComponent';
import CreateTimeslot from '../../components/CreateTimeslot';
import GetTimeslots from '../../components/GetTimeslots';
import GetUsers from '../../components/GetUsers';

function AdminHome() {

  const [showComponent, setComponent] = useState(null)
  
  return (
    <div style={{ width: '100%', minHeight: '500px', backgroundColor: 'beige' }}>
      <div className="d-flex">
        <div className="admin-left w-25 p-3">
          <h4>Hi Dean</h4>
          <ul>
            <li>
              <button 
                className="btn p-0"   
                onClick={() => setComponent(<ShowComponent />)}
              >
                View Bookings
              </button>
            </li>
            <li>
              <button 
                className="btn p-0"   
                onClick={() => setComponent(<CreateTimeslot />)}
              >
                Create Timeslot
              </button>
            </li>
            <li>
              <button 
                className="btn p-0"   
                onClick={() => setComponent(<GetTimeslots />)}
              >
                View Timeslot
              </button>
            </li>
            <li>
              <button 
                className="btn p-0"   
                onClick={() => setComponent(<GetUsers />)}
              >
                View Users
              </button>
            </li>
          </ul>
        </div>
        <div className="admin-right w-75 p-3">{showComponent}</div>
      </div>
    </div>
  );
}

export default AdminHome;
