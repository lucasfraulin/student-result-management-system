import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notification from '../notification';
import SearchableDropdown from "../../Components/searchableDropdown";

function ResultForm( props ) {
  const [courseName, setCourseName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [grade, setGrade] = useState("");
  const [error, setError] = useState('');
  const [notification, setNotification] = useState("")

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const grades = ['A', 'B', 'C', 'D', 'E', 'F'];

  const [studentsIsLoading, setStudentsIsLoading] = useState(true);
  const [coursesIsLoading, setCoursesIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8000/students/list')
      .then((res) => {
        var studentNames = res.data.map(student => student.firstName + " " + student.familyName);
        setStudents(studentNames);
        setStudentsIsLoading(false);
      })
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:8000/courses/list')
      .then((res) => {
        var courseNames = res.data.map(course => course.courseName);
        setCourses(courseNames);
        setCoursesIsLoading(false);
      })
      .catch((err) => console.log(err));

  }, []);

  const handleNotificationClose = () => {
    setNotification("")
  }

  function clearInputs() {
    setCourseName('');
    setStudentName('');
    setGrade('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseName || !studentName || !grade) {
      setError('All fields are required');
      return;
    }

    setError('');
    clearInputs();

    try {
      const response = await axios.post("http://localhost:8000/results/submit", {
        courseName,
        studentName,
        grade
      });

      setNotification(
        <Notification
          message="Result added successfully!"
          type="success"
          handleClose={handleNotificationClose}
          />
        );
        props.addResult();
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
      <h3> Add New Result </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-errors">
          {error && <p>{error}</p>}
        </div>

        <div className="form-inputs">
          <label>
            Course Name:
            {coursesIsLoading ? <div>loading...</div> : <SearchableDropdown options={courses} onOptionSelected={setCourseName} />}
          </label>
          <label>
            Student Name:
            {studentsIsLoading ? <div>loading...</div> : <SearchableDropdown options={students} onOptionSelected={setStudentName} />}
          </label>
          <label>
            Grade:
            <select value={grade} onChange={(e) => setGrade(e.target.value)}>
              <option value="">--Please choose an option--</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>
          </label>
        </div>

        <div className="form-action">
          <button type="submit" >Submit</button>
        </div>

      </form>
    </div>
  );
}

export default ResultForm;
