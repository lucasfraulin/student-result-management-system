import React, { useState, useEffect } from 'react';
import CourseForm from "../Components/Forms/courseForm";
import CoursesList from "../Components/Lists/coursesList";
import axios from 'axios';

export default function Courses() {

  const [courses, setCourses] = useState([]);
  const [courseAdded, setCourseAdded] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:8000/courses/list')
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
      
  }, [courseAdded]);

  const addCourse = () => {
    setCourseAdded(courseAdded + 1);
  }

  return (
    <div>
      <h1> Courses</h1>
      <div className="main-content">
        <CourseForm addCourse={addCourse}/>
        {courses.length && <CoursesList data={courses}/>}
      </div>
    </div>
  )
}
