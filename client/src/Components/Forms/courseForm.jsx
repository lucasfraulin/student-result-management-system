import React, { useState } from "react";
import axios from "axios";
import Notification from "../notification";


function CourseForm(props) {
  const [courseName, setCourseName] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const baseUrl = `${window.location.protocol}//${window.location.hostname}`;

  // Remove notification from screen
  const handleNotificationClose = () => {
    setNotification("");
  };

  // Reset form inputs
  const clearInputs = () => {
    setCourseName("");
  };

  // Save Course in mongodb from form inputs
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseName) {
      setError("All fields are required*");
      return;
    }

    setError("");
    clearInputs();

    try {
      await axios.post(baseUrl + "/courses/submit", {
        courseName,
      });

      setNotification(
        <Notification
          message="Course added successfully!"
          type="success"
          handleClose={handleNotificationClose}
        />
      );

      props.addCourse(); // increment counter to trigger state change in list
    } catch (err) {
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
      <h3>Add New Course</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-errors">{error && <p>{error}</p>}</div>
        <div className="form-inputs">
          <label>
            Course Name:
            <input
              type="text"
              id="course-name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              maxlength="250"
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

export default CourseForm;
