import React, { useState, useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ResponsiveSidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const location = useLocation();

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) {
        setShowMenu(true);
      } else {
        setShowMenu(false);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="sidebar">
      {showMenu ? (
        <div>
        <Menu isOpen={isMenuOpen}>
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
        </Menu>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default ResponsiveSidebar;
