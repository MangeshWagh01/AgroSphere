import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./AdminNavBar.css"; // Import the AdminNavBar CSS
import logo from "./Logo.jpg"; // Import the logo image

const AdminNavBar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg">
        <NavLink className="navbar-brand" to="/home">
          <img src={logo} alt="AgroSphere Logo" className="navbar-logo" />{" "}
          {/* Add the logo here */}
          AgroSphere
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/admin-dash">
                Admin <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/users">
                All Users
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/appointments">
                All Appointments
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/markets">
                All Markets
              </NavLink>
            </li>

            {isLoggedIn ? (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/securelogin"
                  onClick={logout}
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/securelogin">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavBar;
