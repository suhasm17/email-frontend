import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Signup.css';
import Navbar from '../Navbar';


const UpdateNotification = () => {
  const [notificationType, setNotificationType] = useState('promotions');
  const [notificationSubjects, setNotificationSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [notificationContent, setNotificationContent] = useState('');

  // Function to load subjects based on the selected type
  const loadSubjects = () => {
    // Make an AJAX request to fetch subjects based on the selected type
    fetch(`http://localhost:8080/notification/getNotificationSubjects?notificationType=${notificationType}`)
      .then((response) => response.json())
      .then((subjects) => {
        setNotificationSubjects(subjects);
        if (subjects.length > 0) {
          setSelectedSubject(subjects[0]);
          loadContent(subjects[0]);
        }
      });
  };

  // Function to load content based on the selected subject
  const loadContent = (subject) => {
    // Make an AJAX request to fetch content based on the selected subject and type
    fetch(`http://localhost:8080/notification/getNotificationContent?notificationType=${notificationType}&notificationSubject=${subject}`)
      .then((response) => response.text())
      .then((content) => {
        setNotificationContent(content);
      });
  };

  // Function to update the notification
  const updateNotification = () => {

    fetch(`http://localhost:8080/notification/updateNotification`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notificationType,
        notificationSubject: selectedSubject,
        notificationContent,
      }),
    }).then((response) => {
        if (response.ok) {
          alert('Notification updated successfully.');
        } else {
          alert('Error updating notification.');
        }
      });
  };

  useEffect(() => {
        loadSubjects();
  }, []);

  return (
	  	  <div>
	  <Navbar />
	  <div class="container">
    <div className="signup-container">
      <div>
        <h1>Update Notification</h1>
        <label htmlFor="notificationType">Select Notification Type:</label>
        <select
          id="notificationType"
          onChange={(e) => {
            setNotificationType(e.target.value);
            loadSubjects();
          }}
        >
          <option value="promotions">Promotions</option>
          <option value="releaseEvents">Release Events</option>
          <option value="latestPlans">Latest Plans</option>
        </select>
        <br />
        <br />
        <label htmlFor="notificationSubject">Select Notification Subject:</label>
        <select
          id="notificationSubject"
          onChange={(e) => {
            setSelectedSubject(e.target.value);
            loadContent(e.target.value);
          }}
        >
          {notificationSubjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <br />
        <br />
        <label htmlFor="notificationContent">Notification Content:</label>
        <textarea
          id="notificationContent"
          rows="5"
          cols="50"
          value={notificationContent}
          onChange={(e) => setNotificationContent(e.target.value)}
        ></textarea>
      </div>
      <br />
      <div>
        <button onClick={updateNotification} className="signup-button">
          Update Notification
        </button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default UpdateNotification;