import React, { useState } from 'react';
import axios from 'axios';
import '../css/Signup.css';

function CreateNotification() {
  // Define state to manage form data and error messages
  const [formData, setFormData] = useState({
    notificationType: '',
    notificationSubject: '',
    notificationContent: '',
  });
  const [errorMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Noti Data:', formData);
    axios
      .post('http://localhost:8080/notification/createNotification', formData)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          window.alert('Notification created and saved successfully.');
          setFormData({
            notificationType: 'promotions',
            notificationSubject: '',
            notificationContent: '',
          });
        } else {
          // Handle unexpected response status
          window.alert('An error occurred. Please try again later.');
        }
      })
      .catch((error) => {
        if (error.response) {
          window.alert(error.response.data);
        } else {
          window.alert('An error occurred. Please try again later.');
        }
      });
  };

  return (
    <div class="container">
    <div className="signup-container">
      <h2>Create New Notification</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="notificationType">Notification Type:</label>
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

        <br></br>
        <br></br>

        <label htmlFor="notificationSubject">Subject:</label>
        <input
          type="text"
          id="notificationSubject"
          name="notificationSubject"
          value={formData.notificationSubject}
          onChange={handleChange}
          required
        />
        <br></br>
        <br></br>

        <label htmlFor="notificationContent">Content:</label>
        <textarea
          id="notificationContent"
          name="notificationContent"
          rows="4"
          value={formData.notificationContent}
          onChange={handleChange}
          required
          style={{ width: '100%' }}
        >
        </textarea>
        <br></br>
        <br></br>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" className="signup-button">
          Create Notification
        </button>
      </form>
    </div>
    </div>
  );
}

export default CreateNotification;