
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/status.css'; // Import your CSS file for styling
import baseUrl from '../config';

const StatusPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const navigate = useNavigate()

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/device-details/${id}`);
      setDetails(response.data);
      
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  useEffect(() => {  
    fetchDetails();
  }, [id]);

  const handleStatusToggle = async (objId) => {
    try {
      await axios.post(`${baseUrl}/api/toggle-status/${objId}`);
      fetchDetails();
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const handleDelete = async (objId) => {
    // Show a confirmation dialog
    const userConfirmed = window.confirm('Are you sure you want to delete this device entry?');

    if (userConfirmed) {
        try {
            await axios.delete(`${baseUrl}/api/device-delete/${objId}`);
            fetchDetails();
        } catch (error) {
            console.error('Error deleting entry:', error);
            // setDeleteStatus('Error deleting entry');
        }
    } else {
        // setDeleteStatus('Deletion canceled');
    }
  };

  const handleUpdate = (objId) =>{
    navigate(`/update/${id}/${objId}`)
  }

  const BackToHome = () =>{
    navigate("/")
  }

  const registerDevice = () =>{
    navigate(`/register/${id}`)
  }
  return (
    <div style={{padding: "10px"}}>
      <h2 className='white'>Device Details</h2>
      <button onClick={registerDevice}>Register Your Device</button>
       
      {details ? (
        
        <div className="details-table">
          {/* <div className='btn-left'>
            <div style={{ padding: "0 10px" }}>
              <button style={{ background: "rgb(72, 72, 74)" }} onClick={BackToHome}>
                Logout
              </button>
            </div>
          </div> */}
          <div className='table-section'>
            <table >
              <thead>
                <tr>
                  <th>Device Name</th>
                  <th>Device Model</th>
                  <th>Operating System</th>
                  <th>Mac Address</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead >
              <tbody style={{ background: "white" }}>
                  {details.map((element, index) => (
                      <tr key={index}>
                          <td>{element.deviceName}</td>
                          <td>{element.deviceModel}</td> 
                          <td>{element.operatingSystem}</td>
                          <td>{element.macAddress}</td>
                          <td style={{ color: `${element.status === "Y" ? "rgb(48, 209, 58)" : "rgb(255, 159, 10)"}` }}>
                              {element.status === 'Y' ? 'Active' : 'Inactive'}
                          </td>
                          <td  onClick={(e) => e.stopPropagation()}>
                          <button
                              style={{ background: `${element.status === "Y" ? "rgb(255, 159, 10)" : "rgb(48, 209, 58)"}` }}
                              onClick={(e) => { e.stopPropagation(); handleStatusToggle(element.objectId); }}
                          >
                              {element.status === 'Y' ? 'In-activate' : 'Activate'}
                          </button>

                            <button style={{ background: "rgb(100, 210 , 255)" }} 
                              onClick={(e) => { e.stopPropagation(); handleUpdate(element.objectId); }}
                            >
                              Update
                            </button>
                            <button
                                style={{ background: "rgb(255, 69, 58)" }}
                                onClick={(e) => { e.stopPropagation(); handleDelete(element.objectId); }}
                            >
                                Delete
                            </button>
                          </td>
                      </tr>
                  ))}
              </tbody>

              
            </table>
          </div>
          
        </div>
      ) : (
        <p>Loading details...</p>
      )}
    </div>
  );
};

export default StatusPage;
