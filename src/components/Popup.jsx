// Popup.js
import React from 'react';
import '../styles/popup.css'; // Import the CSS file for styling

const Popup = ({ message, type, onClose }) => {
  return (
    <div className={`popup ${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Popup;
