import React, { useState } from 'react';
import axios from 'axios';
import '../styles/styles.css'; // Import the CSS file
import Popup from './Popup';
import { useNavigate} from 'react-router-dom';
import baseUrl from '../config';

const Login = ({setAuthenticated}) => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    employeeId: '',
    password: '',
  });
  const [popup, setPopup] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation: Check if any input field is empty
    if (Object.values(formData).some((value) => !value.trim())) {
      setPopup({ type: 'error', message: 'All fields must be filled out' });
      return;
    }

    try {
        const response = await axios.post(`${baseUrl}/api/login`, { employeeId: formData.employeeId , password: formData.password});
    
        if (response.data === 'User logged in successfully') {
          // User found, navigate to the status page
          setPopup({ type: 'success', message: response.data });
          setFormData({ employeeId: '' });
          setAuthenticated(true)
          navigate(`/status/${formData.employeeId}`);
        } else {
          // User not found
          setPopup({ type: 'error', message: 'User not found. Please check the Employee ID and Password' });
        }
      } catch (error) {
        console.error('Error logging in:', error);
        setPopup({ type: 'error', message: 'Something went wrong. Please try again.' });
      }
  };

  const handleRegisterClick = () =>{
    navigate("/")
  }

  const closePopup = () => {
    setPopup(null);
  };

  return (
    <div className='center'>
  <form className="register-form" onSubmit={handleLogin}>
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="employeeId">Employee ID:</label>
        <input type="text" id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleChange} />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
    </div>

    <button type="submit">Go To details</button>
    <div className="already-registered" style={{padding: "10px"}}>
          <span >Back To Regsiter? <span style={{color : "blue", cursor: "pointer"}} onClick={handleRegisterClick}>
            Register
          </span></span>
          
        </div>
  </form>

  {popup && <Popup type={popup.type} message={popup.message} onClose={closePopup} />}
</div>

  );
};

export default Login;
