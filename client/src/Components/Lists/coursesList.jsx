import React, { useState } from "react";
import Pagination from "react-pagination-js";
import "./list.css";

const CoursesList = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(5);
  const totalCourses = data.length;

  // Get current students
  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = data.slice(indexOfFirst, indexOfLast);

  // Get the last page
  const lastPage = Math.ceil(totalCourses / coursesPerPage);

  // Change page
  const handlePageChange = (newPageNumber) => {
    if (newPageNumber < 1) {
      setCurrentPage(1);
    } else if (newPageNumber > lastPage) {
      setCurrentPage(lastPage);
    } else {
      setCurrentPage(newPageNumber);
    }
  };

  return (
    <div className="courses-list">
      <span>
        Showing {currentPage * coursesPerPage - (coursesPerPage - 1)}-
        {currentPage * coursesPerPage > totalCourses
          ? totalCourses
          : currentPage * coursesPerPage}{" "}
        of {totalCourses} courses
      </span>

      <table>
        <thead>
          <tr>
            <th>Courses</th>
          </tr>
        </thead>
        <tbody>
          {currentCourses.map((course) => (
            <tr key={course._id}>
              <td>{course.courseName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {coursesPerPage < totalCourses && (
        <Pagination
          currentPage={currentPage}
          totalSize={data.length}
          sizePerPage={coursesPerPage}
          changeCurrentPage={handlePageChange}
        />
      )}
    </div>
  );
};

export default CoursesList;
