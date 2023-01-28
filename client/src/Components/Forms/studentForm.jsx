import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../notification';

function StudentForm() {
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [notification, setNotification] = useState("")

  const handleNotificationClose = () => {
    setNotification("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/students/submit", {
        firstName,
        familyName,
        dateOfBirth,
      });

      setNotification(
        <Notification
          message="Form submitted successfully!"
          type="success"
          handleClose={handleNotificationClose}
          />
        );
    } catch (error) {
      setNotification(
        <Notification
          message="There was an error submitting the form. Please try again."
          type="error"
          handleClose={handleNotificationClose}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Family Name:
        <input
          type="text"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Date of Birth:
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
      {notification}
    </form>
  );
}

export default StudentForm;
