import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Layouts/dashboard";
import Home from "./Pages/Home";
import Students from "./Pages/Students";
import Courses from "./Pages/Courses";
import Results from "./Pages/Results";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard title="Students" renderpage={<Students />} />}
      />
      {/* <Route
        path="/students"
        element={<Dashboard title="Students" renderpage={} />}
      /> */}
      <Route
        path="/courses"
        element={<Dashboard title="Courses" renderpage={<Courses />} />}
      />
      <Route
        path="/results"
        element={<Dashboard title="Results" renderpage={<Results />} />}
      />
    </Routes>
  );
}

export default App;
