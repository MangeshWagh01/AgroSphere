import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./BuyerNavBar.css";
import logo from "./Logo.jpg"; // Import the logo image

const BuyerNavBar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg">
        {/* <NavLink className="navbar-brand" to="/home">AgroSphere</NavLink> */}

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
              <NavLink className="nav-link" to="/buyer-dash">
                Buyer <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/marketRate">
                Market Rate
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/purchase">
                Buy Product{" "}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/orders">
                {" "}
                All Orders{" "}
              </NavLink>
            </li>

            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/appointmentList">Book Appointment</NavLink>
            </li> */}

            <li className="nav-item">
              <NavLink className="nav-link" to="/aboutus">
                About Us
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

export default BuyerNavBar;
