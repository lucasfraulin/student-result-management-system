import React, { useState, useEffect } from "react";
import ResultForm from "../Components/Forms/resultForm";
import ResultsList from "../Components/Lists/resultsList";
import axios from "axios";
const baseUrl = `${window.location.protocol}//${window.location.hostname}`;

export default function Results() {
  const [results, setResults] = useState([]);
  const [resultAdded, setResultAdded] = useState(0);

  // Get Result data from node backend
  useEffect(() => {
    axios
      .get(baseUrl + "/results/list")
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err));
  }, [resultAdded]);

  // Increment counter to trigger refresh of result data from state dependency
  const addResult = () => {
    setResultAdded(resultAdded + 1);
  };

  return (
    <div>
      <h1>Results change 1</h1>
      <div className="main-content">
        <ResultForm addResult={addResult} />
        <ResultsList data={results} />
      </div>
    </div>
  );
}
