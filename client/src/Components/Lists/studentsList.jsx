import React, { useState } from "react";
import Pagination from "react-pagination-js";
import "./list.css";

const StudentsList = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);
  const totalStudents = data.length;

  // Get current students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = data.slice(indexOfFirstStudent, indexOfLastStudent);

  // Get the last page
  const lastPage = Math.ceil(totalStudents / studentsPerPage);

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
    <div className="students-list">
      {data.length === 0 ? (
        <div>No Students Found</div>
      ) : (
        <div>
          <span>
            Showing {currentPage * studentsPerPage - (studentsPerPage - 1)}-
            {currentPage * studentsPerPage > totalStudents
              ? totalStudents
              : currentPage * studentsPerPage}{" "}
            of {totalStudents} students
          </span>

          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr key={student._id}>
                  <td>{student.firstName}</td>
                  <td>{student.familyName}</td>
                  <td>{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {studentsPerPage < totalStudents && (
            <Pagination
              currentPage={currentPage}
              totalSize={data.length}
              sizePerPage={studentsPerPage}
              changeCurrentPage={handlePageChange}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default StudentsList;
