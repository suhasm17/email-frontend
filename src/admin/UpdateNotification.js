import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Notification.css';
import Navbar from '../Navbar';


const UpdateNotification = () => {
  const [notificationType, setNotificationType] = useState('');
  const [notificationSubjects, setNotificationSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [notificationContent, setNotificationContent] = useState('');
  
  useEffect(() => {
    // Fetch initial notification subjects
    fetchNotificationSubjects(notificationType);
  }, [notificationType]);

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

  const fetchNotificationSubjects = async (notificationType) => {
    try {
      // Fetch notification subjects from the server based on the selected type
      const response = await fetch(`http://localhost:8080/notification/getNotificationSubjects?notificationType=${notificationType}`);

      if (response.ok) {
        const data = await response.json();
        setNotificationSubjects(data);
      } else {
        throw new Error(`Server response was not ok (status ${response.status})`);
      }
    } catch (error) {
      console.error("Error fetching notification subjects:", error);
    }
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
  const handleNotificationTypeChange = (e) => {
    const selectedType = e.target.value;
    setNotificationType(selectedType);
  };
  const handleNotificationSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    setSelectedSubject(selectedSubject);
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
    <div className="container">
      <div className="update-container">
        <h2>Update Notification</h2>
        <form>
          <div className="form-group">
            <label htmlFor="notificationType" className="label-left">Notification Type:</label>
            <select
              id="notificationType"
              name="notificationType"
              value={notificationType}
              onChange={handleNotificationTypeChange}
            >
              <option value="">Select Notification Type</option> {/* Default option */}
              <option value="promotions">Promotions</option>
              <option value="releaseEvents">Release Events</option>
              <option value="latestPlans">Latest Plans</option>
            </select>
          </div>
          <br />
          <br />
          <div className="select-container">
            <label htmlFor="notificationSubject" className="label-left">Notification Subject:</label>
            <select
              
              id="notificationSubject"
                name="notificationSubject"
                value={selectedSubject}
                onChange={handleNotificationSubjectChange}
            >
              <option value="">Select Notification Subject</option> {/* Default option */}
              {notificationSubjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          <br />
          <br />
          <div className="form-group">
            <label htmlFor="notificationContent" className="label-left">Notification Content:</label>
            <textarea
              id="notificationContent"
              rows="5"
              cols="50"
              value={notificationContent}
              onChange={(e) => setNotificationContent(e.target.value)}
            ></textarea>
          </div>
          <br />
          <div className="button-container">
            <button onClick={updateNotification} className="update-button">
              Update Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default UpdateNotification;