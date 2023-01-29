import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className={location.pathname === "/students" ? "active" : ""}>
            <Link to="/students" className="nav-link">
              Students
            </Link>
          </li>
          <li className={location.pathname === "/courses" ? "active" : ""}>
            <Link to="/courses" className="nav-link">
              Courses
            </Link>
          </li>
          <li className={location.pathname === "/results" ? "active" : ""}>
            <Link to="/results" className="nav-link">
              Results
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
