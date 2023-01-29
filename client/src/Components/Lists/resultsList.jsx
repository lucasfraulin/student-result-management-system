import React, { useState } from "react";
import Pagination from "react-pagination-js";
import "./list.css";

const ResultsList = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(5);
  const totalResults = data.length;

  // Get current results
  const indexOfLast = currentPage * resultsPerPage;
  const indexOfFirst = indexOfLast - resultsPerPage;
  const currentResults = data.slice(indexOfFirst, indexOfLast);

  // Get the last page
  const lastPage = Math.ceil(totalResults / resultsPerPage);

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
    <div className="results-list">
      <span>
        Showing {currentPage * resultsPerPage - (resultsPerPage - 1)}-
        {currentPage * resultsPerPage > totalResults
          ? totalResults
          : currentPage * resultsPerPage}{" "}
        of {totalResults} results
      </span>

      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Student Name</th>
            <th>Grade</th>
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

      {resultsPerPage < totalResults && (
        <Pagination
          currentPage={currentPage}
          totalSize={data.length}
          sizePerPage={resultsPerPage}
          changeCurrentPage={handlePageChange}
        />
      )}
    </div>
  );
};

export default ResultsList;
