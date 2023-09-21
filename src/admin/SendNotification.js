import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';

const SendNotification = () => {
  const [notificationType, setNotificationType] = useState('promotions');
  const [notificationSubjects, setNotificationSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [notificationResult, setNotificationResult] = useState('');

  useEffect(() => {
    // Fetch initial notification subjects
    fetchNotificationSubjects(notificationType);
  }, [notificationType]);

  const handleNotificationTypeChange = (e) => {
    const selectedType = e.target.value;
    setNotificationType(selectedType);
  };

  const handleNotificationSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    setSelectedSubject(selectedSubject);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send to the server
    const requestData = {
      notificationType,
      notificationSubject: selectedSubject,
    };

    try {
      // Send the data to the server using fetch API
      const response = await fetch("http://localhost:8080/notification/sendNotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.text();
        setNotificationResult(data);
        
        // Show the result in an alert
        alert(data);
      } else {
        throw new Error(`Server response was not ok (status ${response.status})`);
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
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

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="signup-container">
          <h1>Send Notification</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="notificationType">Notification Type:</label>
            <select
              id="notificationType"
              name="notificationType"
              value={notificationType}
              onChange={handleNotificationTypeChange}
            >
              <option value="promotions">Promotions</option>
              <option value="latestPlans">Latest Plans</option>
              <option value="releaseEvents">Release Events</option>
            </select>

            <div className="select-container">
              <label htmlFor="notificationSubject" style={{ marginTop: '10px' }}>Notification Subject:</label>
              <select
                id="notificationSubject"
                name="notificationSubject"
                value={selectedSubject}
                onChange={handleNotificationSubjectChange}
              >
                {notificationSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="button-container" style={{ marginTop: '10px' }}>
              <button type="submit" className="signup-button">
                Send Notification
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendNotification;
