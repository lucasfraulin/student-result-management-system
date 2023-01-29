import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../notification';

function CourseForm( props ) {
  const [courseName, setCourseName] = useState("");
  const [error, setError] = useState('');
  const [notification, setNotification] = useState("")

  const handleNotificationClose = () => {
    setNotification("")
  }

  function clearInputs() {
    setCourseName('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseName) {
      setError('All fields are required');
      return;
    }

    setError('');
    clearInputs();

    try {
      const response = await axios.post("http://localhost:8000/courses/submit", {
        courseName,
      });

      setNotification(
        <Notification
          message="Course added successfully!"
          type="success"
          handleClose={handleNotificationClose}
          />
        );
        props.addCourse();
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
      <h3> Add New Course </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-errors">
          {error && <p>{error}</p>}
        </div>

        <div className="form-inputs">
          <label>
            Course Name:
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
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

export default CourseForm;
