import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../notification';

function StudentForm( props ) {
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState('');
  const [notification, setNotification] = useState("")

  const handleNotificationClose = () => {
    setNotification("")
  }

  function clearInputs() {
    setFirstName('');
    setFamilyName('');
    setDateOfBirth('');
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !familyName || !dateOfBirth) {
      setError('All fields are required');
      return;
    }

    const minAge = new Date();
    minAge.setFullYear(minAge.getFullYear() - 10);
    if (new Date(dateOfBirth) > minAge) {
      setError('Student must be at least 10 years old');
      return;
    }

    setError('');
    clearInputs();

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
        props.addStudent();
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
    <div class="form">
      {notification}
      <h3> Add New Student </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-errors">
          {error && <p>{error}</p>}
        </div>

        <div className="form-inputs">
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            Family Name:
            <input
              type="text"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </label>
        </div>

        <div className="form-action">
          <button type="submit" >Submit</button>
        </div>

      </form>
    </div>
  );
}

export default StudentForm;
