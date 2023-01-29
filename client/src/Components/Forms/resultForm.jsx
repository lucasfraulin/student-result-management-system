import React, { useState, useEffect } from "react";
import axios from "axios";
import Notification from "../notification";
import Select from "react-select";

function ResultForm(props) {
  const [courseName, setCourseName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [grade, setGrade] = useState("");

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  let grades = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "E", value: "E" },
    { label: "F", value: "F" },
  ];

  const [studentsIsLoading, setStudentsIsLoading] = useState(true);
  const [coursesIsLoading, setCoursesIsLoading] = useState(true);

  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  // Get list of students and courses for select dropdowns
  useEffect(() => {
    axios
      .get("http://localhost:8000/students/list")
      .then((res) => {
        setStudents(
          res.data.map((student) => ({
            label: `${student.firstName} ${student.familyName}`,
            value: `${student.firstName} ${student.familyName}`,
          }))
        );
        setStudentsIsLoading(false);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8000/courses/list")
      .then((res) => {
        setCourses(
          res.data.map((course) => ({
            label: course.courseName,
            value: course.courseName,
          }))
        );
        setCoursesIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // Remove notification from screen
  const handleNotificationClose = () => {
    setNotification("");
  };

  // Reset form inputs
  function clearInputs() {
    setCourseName("");
    setStudentName("");
    setGrade("");
  }

  // Save Result in mongodb from form inputs
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseName || !studentName || !grade) {
      setError("All fields are required*");
      return;
    }

    setError("");
    clearInputs();

    try {
      await axios.post("http://localhost:8000/results/submit", {
        courseName: courseName.value,
        studentName: studentName.value,
        grade: grade.value,
      });

      setNotification(
        <Notification
          message="Result added successfully!"
          type="success"
          handleClose={handleNotificationClose}
        />
      );

      props.addResult(); // increment counter to trigger state change in list
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
        <div className="form-errors">{error && <p>{error}</p>}</div>

        <div className="form-inputs">
          <label>
            Course Name:
            {!coursesIsLoading && (
              <Select
                options={courses}
                value={courseName}
                name="Course"
                placeholder="Choose a course"
                search
                onChange={(e) => setCourseName(e)}
              />
            )}
          </label>
          <label>
            Student Name:
            {!studentsIsLoading && (
              <Select
                options={students}
                value={studentName}
                name="Student"
                placeholder="Choose a student"
                search
                onChange={(e) => setStudentName(e)}
              />
            )}
          </label>
          <label>
            Grade:
            <Select
              options={grades}
              value={grade}
              name="Grade"
              placeholder="Choose a grade"
              onChange={(e) => setGrade(e)}
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

export default ResultForm;
