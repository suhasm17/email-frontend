// Admin.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import '../css/admin.css';

// Import FontAwesome components and icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEdit, faEnvelope, faTrash } from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
  const navigate = useNavigate();

  const handleCreateNotificationClick = () => {
    navigate('/CreateNotification');
  };

  const handleSendNotificationClick = () => {
    navigate('/SendNotification');
  };

  const handleUpdateNotificationClick = () => {
    navigate('/UpdateNotification');
  };
  
  const handleDeleteNotificationClick = () => {
    navigate('/DeleteNotification');
  };

  return (
    <div className="admin-container">
      <Navbar />
      <div className="containerbuttons">
        <h1 className="typing-text">Welcome Admin</h1>
        
        {/* Buttons Container */}
        <div className="button-container">
          {/* Create Notification Button */}
          <button className="square-button" onClick={handleCreateNotificationClick}>
            <FontAwesomeIcon icon={faEnvelope} />&nbsp; {/* Add non-breaking space here */}
            <span className="button-text">Create Notification</span>
          </button>

          {/* Update Notification Button */}
          <button className="square-button" onClick={handleUpdateNotificationClick}>
            <FontAwesomeIcon icon={faEdit} />&nbsp; {/* Add non-breaking space here */}
            <span className="button-text">Update Notification</span>
          </button>
        </div>

        <div className="button-container">
          {/* Send Notification Button */}
          <button className="square-button" onClick={handleSendNotificationClick}>
            <FontAwesomeIcon icon={faBell} />&nbsp; {/* Add non-breaking space here */}
            <span className="button-text">Send Notification</span>
          </button>

          {/* Delete Notification Button */}
          <button className="square-button" onClick={handleDeleteNotificationClick}>
            <FontAwesomeIcon icon={faTrash} />&nbsp; {/* Add non-breaking space here */}
            <span className="button-text">Delete Notification</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
