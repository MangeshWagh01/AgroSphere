import React from "react";
import "./MyFooter.css"; // Import your footer CSS

export default function MyFooter() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            AgroSphere enables farmers to book market appointments, buyers to
            purchase products, and market authorities to manage all operations
            efficientl.
          </p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: agrosphere@help.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 AgroSphere. All rights reserved.</p>
      </div>
    </footer>
  );
}
