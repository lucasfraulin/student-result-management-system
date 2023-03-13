import React, { useState, useEffect } from "react";
import CourseForm from "../Components/Forms/courseForm";
import CoursesList from "../Components/Lists/coursesList";
import axios from "axios";
const baseUrl = `${window.location.protocol}//${window.location.hostname}`;

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [courseAdded, setCourseAdded] = useState(0);

  // Get course data from node backend
  useEffect(() => {
    axios
      .get(baseUrl + "/courses/list")
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  }, [courseAdded]);

  // Increment counter to trigger refresh of course data from state dependency
  const addCourse = () => {
    setCourseAdded(courseAdded + 1);
  };

  return (
    <div>
      <h1>Courses</h1>
      <div className="main-content">
        <CourseForm addCourse={addCourse} />
        <CoursesList data={courses} />
      </div>
    </div>
  );
}
