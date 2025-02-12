


import React from 'react';
import { NavLink } from 'react-router-dom';
import './MainNavBar.css'; // Import custom CSS
import logo from './Logo.jpg'; // Import the logo image

export default function MainNavBar() {
  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        
      <NavLink className="navbar-brand" to="/home">
          <img src={logo} alt="AgroSphere Logo" className="navbar-logo" /> {/* Add the logo here */}
          AgroSphere
        </NavLink>
      
        <ul className="navbar-links">
          <li><NavLink className="nav-link" activeClassName="active-link" to="/marketRate">Market Rate</NavLink></li>
          <li><NavLink className="nav-link" activeClassName="active-link" to="/aboutus">About Us</NavLink></li>
          <li><NavLink className="nav-link" activeClassName="active-link" to="/securelogin">Login</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

