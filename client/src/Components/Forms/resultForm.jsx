import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notification from '../notification';
import SelectSearch from "react-select-search";
import Select from "react-select";

function ResultForm( props ) {
  const [course, setCourse] = useState("");
  const [student, setStudent] = useState("");
  const [gradeVal, setGradeVal] = useState("");
  const [error, setError] = useState('');
  const [notification, setNotification] = useState("")

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  let grades = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "E", value: "E" },
    { label: "F", value: "F" }
  ];

  const [studentsIsLoading, setStudentsIsLoading] = useState(true);
  const [coursesIsLoading, setCoursesIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8000/students/list')
      .then((res) => {
        let studentNames = res.data.map(student => ({"label": student.firstName + " " + student.familyName, "value": student.firstName + " " + student.familyName}));
        setStudents(studentNames);
        setStudentsIsLoading(false);
      })
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:8000/courses/list')
      .then((res) => {
        var courseNames = res.data.map(course => ({"label": course.courseName, "value": course.courseName}) );
        setCourses(courseNames);
        setCoursesIsLoading(false);
      })
      .catch((err) => console.log(err));

  }, []);

  const handleNotificationClose = () => {
    setNotification("")
  }

  function clearInputs() {
    setCourse('');
    setStudent('');
    setGradeVal('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!course || !student || !gradeVal) {
      setError('All fields are required');
      return;
    }

    setError('');
    clearInputs();

    let courseName = course.value;
    let studentName = student.value;
    let grade = gradeVal.value;

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
            Course Name
            {
              !coursesIsLoading &&
              <Select
                options={courses}
                value={course}
                name="Course"
                placeholder="Choose a course"
                search
                onChange={(e) => setCourse(e)}
              />
            }
          </label>
          <label>
            Student Name
            {
              !studentsIsLoading &&
              <Select
                options={students}
                value={student}
                name="Student"
                placeholder="Choose a student"
                search
                onChange={(e) => setStudent(e)}
              />
            }
          </label>
          <label>
            Grade:
            <Select
              options={grades}
              value={gradeVal}
              name="Grade"
              placeholder="Choose a grade"
              onChange={(e) => setGradeVal(e)}
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

export default ResultForm;
