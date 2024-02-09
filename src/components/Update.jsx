import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/styles.css'; // Import the CSS file
import Popup from './Popup';
import { useNavigate, useParams} from 'react-router-dom';
import baseUrl from '../config';

const Update = () => {

    const { id, objId } = useParams();
    const [details, setDetails] = useState(null);
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        deviceName: '',
        employeeId: id,
        deviceModel: '',
        operatingSystem: '',
        macAddress: '',
      });
      const [popup, setPopup] = useState(null);
  
    useEffect(() => {
      const fetchDetails = async () => {
        try {
          const response = await axios.get(`${baseUrl}/api/device-detail/${objId}`);
          console.log(response.data)
          setDetails(response.data);
          setFormData(response.data)
        } catch (error) {
          console.error('Error fetching details:', error);
        }
      };
  
      fetchDetails();
    }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if any input field is empty
    if (Object.values(formData).some((value) => !value.trim())) {
      setPopup({ type: 'error', message: 'All fields must be filled out' });
      return;
    }

    try {
      const res = await axios.post(`${baseUrl}/api/device-update/${objId}`, formData); 
      navigate(`/status/${id}`);
    } catch (error) {
      console.error('Error registering device:', error);
      if (error.response && error.response.data) {
        setPopup({ type: 'error', message: error.response.data });
      } else {
        setPopup({ type: 'error', message: 'Registration not completed due to some technical issues' });
      }
    }
  };

  const handleLoginClick = () =>{
    navigate("/login")
  }

  const closePopup = () => {
    setPopup(null);
  };

  return (
<div>
    <h2 className='white' style={{padding: "0 10px"}}>Edit details</h2>
<div className='center'>
        {
            details && 
            <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-row">
            <div className="form-group">
                <label htmlFor="deviceName">Device Name:</label>
                <input type="text" id="deviceName" name="deviceName" value={formData.deviceName} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="deviceModel">Device Model:</label>
                <input type="text" id="deviceModel" name="deviceModel" value={formData.deviceModel} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="operatingSystem">Operating System:</label>
                <input type="text" id="operatingSystem" name="operatingSystem" value={formData.operatingSystem} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="macAddress">Mac Address:</label>
                <input type="text" id="macAddress" name="macAddress" value={formData.macAddress} onChange={handleChange} />
              </div>
            </div>
        
            <button type="submit">Update Device</button>
          </form>
        }
 

  {popup && <Popup type={popup.type} message={popup.message} onClose={closePopup} />}
</div>

</div>
    
  );
};

export default Update;
