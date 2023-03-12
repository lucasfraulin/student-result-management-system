import React, { useState } from "react";
import axios from "axios";
import Notification from "../notification";

function StudentForm(props) {
  const [firstName, setFirstName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  // Remove notification from screen
  const handleNotificationClose = () => {
    setNotification("");
  };

  // Reset form inputs
  function clearInputs() {
    setFirstName("");
    setFamilyName("");
    setDateOfBirth("");
  }

  // Save Student in mongodb from form inputs
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !familyName || !dateOfBirth) {
      setError("All fields are required*");
      return;
    }

    if (firstName.trim().length === 0 || familyName.trim().length === 0) {
      setError("All fields are required*");
      return;
    }

    const minAge = new Date();
    minAge.setFullYear(minAge.getFullYear() - 10);
    if (new Date(dateOfBirth) > minAge) {
      setError("Student must be at least 10 years old");
      return;
    }

    setError("");
    clearInputs();

    let fname = firstName.trim();
    let famName = familyName.trim();
    let dob = dateOfBirth;

    console.log(fname, famName, dob);

    try {
      await axios.post("http://localhost:8000/students/submit", {
        firstName: fname,
        familyName: famName,
        dateOfBirth: dob,
      });

      setNotification(
        <Notification
          message="Student added successfully!"
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
    <div className="form">
      {notification}
      <h3>Add New Student</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-errors">{error && <p>{error}</p>}</div>

        <div className="form-inputs">
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              maxlength="50"
            />
          </label>
          <label>
            Family Name:
            <input
              type="text"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              maxlength="50"
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
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
