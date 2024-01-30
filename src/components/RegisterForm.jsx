import React, { useState } from 'react';
import axios from 'axios';
import '../styles/styles.css'; // Import the CSS file
import Popup from './Popup';
import { useNavigate} from 'react-router-dom';
import baseUrl from '../config';

const RegisterForm = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    laptopModel: '',
    macAddress: '',
    password: '',
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
      setPopup({ type: 'error', message: 'All fields must be filled out' });
      return;
    }

    try {
      const res = await axios.post(`${baseUrl}/api/register`, formData);
      setPopup({ type: 'success', message: res.data });
      setFormData({
        name: '',
        employeeId: '',
        laptopModel: '',
        macAddress: '',
      });
      if (res.data === 'Already Registerd With This employee id') {
        // User found, navigate to the status page
        setPopup({ type: 'error', message: 'Already Registered Please Login' });
      } else {
        setPopup({ type: 'success', message: res.data });
        navigate(`/status/${formData.employeeId}`);
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
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="employeeId">Employee ID:</label>
        <input type="text" id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleChange} />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label htmlFor="laptopModel">Laptop Model:</label>
        <input type="text" id="laptopModel" name="laptopModel" value={formData.laptopModel} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="macAddress">Mac Address:</label>
        <input type="text" id="macAddress" name="macAddress" value={formData.macAddress} onChange={handleChange} />
      </div>
    </div>
    <div className="form-group">
        <label htmlFor="macAddress">Password:</label>
        <input type="password" id="macAddress" name="password" value={formData.password} onChange={handleChange} />
      </div>

    <button type="submit">Register your device</button>
    <div className="already-registered" style={{padding: "10px"}}>
          <span >Already Registered? <span style={{color : "blue", cursor: "pointer"}} onClick={handleLoginClick}>
            Click
          </span></span>
          
        </div>
  </form>

  {popup && <Popup type={popup.type} message={popup.message} onClose={closePopup} />}
</div>

  );
};

export default RegisterForm;
