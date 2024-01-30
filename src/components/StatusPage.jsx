
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/status.css'; // Import your CSS file for styling
import baseUrl from '../config';

const StatusPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/details/${id}`);
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [id]);

  const handleStatusToggle = async () => {
    try {
      const newStatus = details.status === 'active' ? 'inactive' : 'active';
      await axios.post(`${baseUrl}/api/toggle-status/${id}`, { status: newStatus });
      setDetails((prevDetails) => ({ ...prevDetails, status: newStatus }));
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const handleDelete = async () => {
    // Show a confirmation dialog
    const userConfirmed = window.confirm('Are you sure you want to delete this device entry?');

    if (userConfirmed) {
      try {
        await axios.delete(`${baseUrl}/api/delete/${id}`);
        navigate("/")
        // setDeleteStatus('Device entry deleted successfully');
      } catch (error) {
        console.error('Error deleting entry:', error);
        // setDeleteStatus('Error deleting entry');
      }
    } else {
      // setDeleteStatus('Deletion canceled');
    }
  };

  const handleUpdate = () =>{
    navigate(`/update/${id}`)
  }

  const BackToHome = () =>{
    navigate("/")
  }
  return (
    <div style={{padding: "10px"}}>
      <h2 className='white'>Registration Details</h2>
       
      {details ? (
        
        <div className="details-table">
          <div className='btn-left'>
            <div style={{ padding: "0 10px" }}>
              <button style={{ background: "rgb(72, 72, 74)" }} onClick={BackToHome}>
                Logout
              </button>
            </div>
            <button style={{ background: `${details.status === "active" ? "rgb(255, 159, 10)" : "rgb(48, 209, 58)"}` }} onClick={handleStatusToggle}>
              {details.status === 'active' ? 'In-activate' : 'Activate'}
            </button>
            <div style={{ padding: "0 10px" }}>
              <button style={{ background: "rgb(100, 210 , 255)" }} onClick={handleUpdate}>
                Update
              </button>
            </div>
            <div style={{ padding: "0 10px" }}>
              <button style={{ background: "rgb(255, 69, 58)" }} onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
          <div className='table-section'>
            <table >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Employee ID</th>
                  <th>Laptop Model</th>
                  <th>Mac Address</th>
                  <th>Status</th>
                  {/* Add more headers as needed */}
                </tr>
              </thead >
              <tbody style={{ background: "white" }}>
                <tr>
                  <td>{details.name}</td>
                  <td>{details.employeeId}</td>
                  <td>{details.laptopModel}</td>
                  <td>{details.macAddress}</td>
                  <td style={{ color: `${details.status === "active" ? "rgb(48, 209, 58)" : "rgb(255, 159, 10)"}` }}>{details.status}</td>
                  {/* Add more details as needed */}
                </tr>
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
