import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"><Link to="/">Home</Link></li>
        <li className="nav-item"><Link to="/admin">Admin</Link></li>
        <li className="nav-item"><Link to="/user">User</Link></li>
        <li className="nav-item"><Link to="/about">About Us</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;