import React, { useState } from 'react';
import axios from 'axios';
import '../styles/styles.css'; // Import the CSS file
import Popup from './Popup';
import { useNavigate, useParams} from 'react-router-dom';
import baseUrl from '../config';

const RegisterForm = () => {
  const { id } = useParams();

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    deviceName: '',
    employeeId: id,
    deviceModel: '',
    operatingSystem: '',
    macAddress: '',
  });
  const [popup, setPopup] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if any input field is empty
    if (Object.values(formData).some((value) => !value.trim())) {
      console.log(formData);
      setPopup({ type: 'error', message: 'All fields must be filled out' });
      return;
    }

    try {
      const res = await axios.post(`${baseUrl}/api/device-register`, formData);
      setPopup({ type: 'success', message: res.data });
      setFormData({
        deviceName: '',
        employeeId: id,
        deviceModel: '',
        operatingSystem: '',
        macAddress: '',
      });
      if (res.data === 'Already Registerd With This employee id') {
        // User found, navigate to the status page
        setPopup({ type: 'error', message: 'Already Registered The Device' });
      } else {
        setPopup({ type: 'success', message: res.data });
        navigate(`/status/${id}`);
      }
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
    <div className='center'>
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

    <button type="submit">Register your device</button>
  </form>

  {popup && <Popup type={popup.type} message={popup.message} onClose={closePopup} />}
</div>

  );
};

export default RegisterForm;
