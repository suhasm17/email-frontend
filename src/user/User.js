import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const User = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/Signup');
  };

  const handleModifyUserClick = () => {
    navigate('/ModifyUser');
  };

  const handleDeleteClick = () => {
    navigate('/DeleteUser');
  };

  return (
	  <div>
	  <Navbar />
    <div className="containerbuttons">
      <h1>Welcome User</h1>
      <button className="signup-button" onClick={handleSignupClick} style={{ marginBottom: '20px' }}>
        Signup
      </button>
      <button className="signup-button" onClick={handleModifyUserClick} style={{ marginBottom: '20px' }}>
        User Modification
      </button>
      <button className="signup-button" onClick={handleDeleteClick} style={{ marginBottom: '20px' }}>
        Delete
      </button>
    </div>
    </div>
  );
};

export default User;