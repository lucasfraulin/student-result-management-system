import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from 'react-pagination-js';
import './studentsList.css';

const StudentsList = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);
  const totalStudents = data.length;

  // Get current students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = data.slice(indexOfFirstStudent, indexOfLastStudent);

  // Change page
  const handlePageChange = (newPageNumber) => {
    setCurrentPage(newPageNumber);
  }

  return (
    <div className="students-list">
      <span>
        Showing {currentPage * studentsPerPage - (studentsPerPage - 1)}-{currentPage * studentsPerPage > totalStudents ? totalStudents : currentPage * studentsPerPage} of {totalStudents} students
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
      {studentsPerPage < totalStudents &&
        <Pagination
          currentPage={currentPage}
          totalSize={data.length}
          sizePerPage={studentsPerPage}
          changeCurrentPage={handlePageChange}
        />
      }
    </div>
  );
};

export default StudentsList;