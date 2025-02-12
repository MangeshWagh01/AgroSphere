import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function FarmerDashBoard() {
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userName"); // Clear user data
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/secureLogin"); // Redirect to login
  };

  return (
    <div className="buyer-home-container">
      <div className="hero-section">
        <br />
        <br />
        <h1 className="hero-title">
          Welcome to AgroSphere,{localStorage.getItem("userName")}
        </h1>
        {/* {localStorage.getItem("userName")} */}
      </div>
      <div className="featured-products-section">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-list">
          <div className="product-item">
            <h3>Onion</h3>
            <p>
              Onions are versatile, pungent vegetables that enhance the taste of
              dishes. They're also rich in vitamins and minerals, making them a
              nutritious addition to meals
            </p>
          </div>
          <div className="product-item">
            <h3>Pomegranate </h3>
            <p>
              Pomegranates are nutritious superfoods with a sweet-tart flavor
              that promote heart health and reduce inflammation
            </p>
          </div>
          <div className="product-item">
            <h3>Corn</h3>
            <p>
              Corn is a globally beloved staple, cherished for its sweet taste
              and versatility. Rich in fiber, vitamins, and minerals, it’s both
              healthy and delicious
            </p>
          </div>
        </div>
      </div>
      <div className="market-rates-section">
        <h2 className="section-title">Top Markets </h2>
        <div className="market-rate-list">
          <div className="market-rate-item">
            <h3>Nashik Market </h3>
            <p>
              Address : NASIK ROAD, KRUSHI UTPANNA BAJAR SAMITI,BHAJIPALA
              MARKET, , NASHIK, MAHARASHTRA, India (IN), Pin Code:- 422101
            </p>
          </div>
          <div className="market-rate-item">
            <h3>Pune Market</h3>
            <p>
              Address: KRUSHI UTPANNA BAJAR SAMITI PUNE, Shri. Shivaji Market
              Yard, Gultekdi, Pune ,Maharashtra, India (IN),Pin Code:- 411037.
            </p>
          </div>
          <div className="market-rate-item">
            <h3>Mumbai Market</h3>
            <p>
              Address: APMC MARKET VASHI, Navi Mumbai is Sector 19, Vashi, Navi
              Mumbai, Maharashtra ,India (IN),Pin Code:-400703{" "}
            </p>
            <br />
          </div>
          <br /> <br />
        </div>
      </div>
    </div>
  );
}
