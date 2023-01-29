import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route, Redirect,Navigate
  } from "react-router-dom";

import Dashboard from "./Layouts/dashboard";

import Home from "./Pages/Home";
import Students from  "./Pages/Students";

import './App.css';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Dashboard title="Home" renderpage={<Home/>}/>} />
        <Route path="/students" element={<Dashboard title="Students" renderpage={<Students/>}/>} />
    </Routes>
  );
}

export default App;
