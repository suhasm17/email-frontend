import React, { useState } from 'react';
import axios from 'axios';
import '../css/Notification.css';
import Navbar from '../Navbar';

function CreateNotification() {
  const [formData, setFormData] = useState({
    notificationType: '',
    notificationSubject: '',
    notificationContent: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/notification/createNotification', formData)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          // Show a success message (e.g., using a toast notification)
          alert('Notification created and saved successfully.');
          setFormData({
            notificationType: 'promotions',
            notificationSubject: '',
            notificationContent: '',
          });
        } else {
          // Handle unexpected response status
          setErrorMessage('An error occurred. Please try again later.');
        }
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage('An error occurred. Please try again later.');
        }
      });
  };

  return (
    <div>
      <Navbar />
    <div className="container">
      <div className="signup-container">
        <h2>Create New Notification</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="notificationType" className="label-left">Notification Type:</label>
            <select
              id="notificationType"
              name="notificationType"
              value={formData.notificationType}
              onChange={handleChange}
            >
              <option value="">Select Notification Type</option> {/* Default option */}
              <option value="promotions">Promotions</option>
              <option value="latestPlans">Latest Plans</option>
              <option value="releaseEvents">Release Events</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="notificationSubject" className="label-left">Subject:</label>
            <input
              type="text"
              id="notificationSubject"
              name="notificationSubject"
              value={formData.notificationSubject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="notificationContent" className="label-left">Content:</label>
            <textarea
              id="notificationContent"
              name="notificationContent"
              rows="4"
              value={formData.notificationContent}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="create-button">
            Create Notification
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default CreateNotification;
