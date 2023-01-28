import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li>
                    <Link to="/students" className="nav-link">Students</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;
