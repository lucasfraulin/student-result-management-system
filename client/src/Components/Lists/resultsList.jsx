import React, { useState, useEffect } from 'react';
import Pagination from 'react-pagination-js';
import './list.css';

const ResultsList = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(5);
  const totalResults = data.length;

  // Get current students
  const indexOfLast = currentPage * resultsPerPage;
  const indexOfFirst = indexOfLast - resultsPerPage;
  const currentResults = data.slice(indexOfFirst, indexOfLast);

  // Get the last page
  const lastPage = Math.ceil(totalResults/resultsPerPage);

  // Change page
  const handlePageChange = (newPageNumber) => {
    if (newPageNumber < 1) {
      setCurrentPage(1);
    } else if (newPageNumber > lastPage) {
      setCurrentPage(lastPage);
    } else {
      setCurrentPage(newPageNumber);
    }
  }

  return (
    <div className="results-list">
      <span>
        Showing {currentPage * resultsPerPage - (resultsPerPage - 1)}-{currentPage * resultsPerPage > totalResults ? totalResults : currentPage * resultsPerPage} of {totalResults} students
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
          {currentResults.map((result) => (
            <tr key={result._id}>
              <td>{result.courseName}</td>
              <td>{result.studentName}</td>
              <td>{result.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {resultsPerPage < totalResults &&
        <Pagination
          currentPage={currentPage}
          totalSize={data.length}
          sizePerPage={resultsPerPage}
          changeCurrentPage={handlePageChange}
        />
      }
    </div>
  );
};

export default ResultsList;
