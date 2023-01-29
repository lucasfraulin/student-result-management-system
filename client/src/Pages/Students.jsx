import React, { useState, useEffect } from "react";
import StudentForm from "../Components/Forms/studentForm";
import StudentsList from "../Components/Lists/studentsList";
import axios from "axios";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [studentAdded, setStudentAdded] = useState(0);

  // Get student data from node backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/students/list")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  }, [studentAdded]);

  // Increment counter to trigger refresh of student data from state dependency
  const addStudent = () => {
    setStudentAdded(studentAdded + 1);
  };

  return (
    <div>
      <h1> Students</h1>
      <div className="main-content">
        <StudentForm addStudent={addStudent} />
        {students.length && <StudentsList data={students} />}
      </div>
    </div>
  );
}
