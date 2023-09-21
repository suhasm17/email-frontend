import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';

const DeleteNotification = () => {
  const [notificationType, setNotificationType] = useState('promotions');
  const [notificationSubjects, setNotificationSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  // Function to load subjects based on the selected type
  const loadSubjects = () => {
    // Make an AJAX request to fetch subjects based on the selected type
    fetch(`http://localhost:8080/notification/getNotificationSubjects?notificationType=${notificationType}`)
      .then((response) => response.json())
      .then((subjects) => {
        setNotificationSubjects(subjects);
        if (subjects.length > 0) {
          setSelectedSubject(subjects[0]);
        }
      })
      .catch((error) => {
        console.error("Error loading subjects:", error);
      });
  };

  // Function to delete the notification
  const deleteNotification = () => {
    // Check if a subject is selected
    if (!selectedSubject) {
      alert('Please select a notification subject.');
      return;
    }

    // Make an AJAX request to delete the notification
    fetch(`http://localhost:8080/notification/deleteNotification?notificationType=${notificationType}&notificationSubject=${selectedSubject}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Notification deleted successfully.');
          // Optionally, you can reset the selectedSubject
          setSelectedSubject('');
        } else {
          alert('Error deleting notification.');
        }
      });
  };

  // Fetch initial notification subjects when notificationType changes
  useEffect(() => {
    loadSubjects();
  }, [notificationType]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="signup-container">
          <div>
            <h1>Delete Notification</h1>
            <label htmlFor="notificationType">Select Notification Type:</label>
            <select
              id="notificationType"
              onChange={(e) => {
                setNotificationType(e.target.value);
              }}
            >
              <option value="">Select Notification Type</option> {/* Default option */}
              <option value="promotions">Promotions</option>
              <option value="releaseEvents">Release Events</option>
              <option value="latestPlans">Latest Plans</option>
            </select>
            <br />
            <br />
            <label htmlFor="notificationSubject">Select Notification Subject:</label>
            <select
              id="notificationSubject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
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
          <div>
            <button onClick={deleteNotification} className="signup-button">
              Delete Notification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteNotification;
