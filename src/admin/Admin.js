import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const Admin = () => {
  const navigate = useNavigate();

  const handleCreateNotiicationClick = () => {
    navigate('/CreateNotification');
  };

  const handleSendNotiicationClick = () => {
    navigate('/SendNotification');
  };

  const handleUpdateNotiicationClick = () => {
    navigate('/UpdateNotification');
  };
  
    const handleDeleteNotiicationClick = () => {
    navigate('/DeleteNotification');
  };

  return (
	  <div>
	  <Navbar />
    <div className="containerbuttons">
      <h1>Welcome Admin</h1>
      <button className="signup-button" onClick={handleCreateNotiicationClick} style={{ marginBottom: '20px' }}>
        Create Notification
      </button>
      <button className="signup-button" onClick={handleUpdateNotiicationClick} style={{ marginBottom: '20px' }}>
        Update Notification
      </button>
      <button className="signup-button" onClick={handleSendNotiicationClick} style={{ marginBottom: '20px' }}>
        Send Notification
      </button>
      <button className="signup-button" onClick={handleDeleteNotiicationClick} style={{ marginBottom: '20px' }}>
        Delete Notification
      </button>
    </div>
    </div>
  );
};

export default Admin;