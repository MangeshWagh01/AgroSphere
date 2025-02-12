

import React from 'react';
import './AboutUs.css'; // External CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-container">
      <header className="about-header">
       <br></br>
        <h1>Welcome to AgroSphere</h1>
        <p>Your marketplace for fresh farm products</p>
      </header>

      <section className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
          At AgroSphere, we connect farmers and buyers through a user-friendly platform. Farmers can book market appointments, buyers can purchase products directly, and market authorities manage users, markets, and all transactions seamlessly. We ensure fair prices for farmers and fresh, locally grown products for buyers.          </p>
        </div>

        <div className="about-section">
          <h2>Our Values</h2>
          <ul>
            <li><strong>Integrity:</strong> We believe in fair trade and honesty in all our dealings.</li>
            <li><strong>Quality:</strong> Our priority is to ensure only the highest quality products are available to our customers.</li>
            <li><strong>Community:</strong> We foster a community of trust between farmers, buyers, and all stakeholders.</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Why Choose Us?</h2>
          <p>
          AgroSphere is a cutting-edge remote agriculture system designed to optimize farming in any condition. With AgroSphere, farmers can easily book market appointments, buyers can directly purchase products, and market authorities have full control to manage users, markets, and transactions. Choose AgroSphere for a versatile, efficient, and pioneering approach to modern agriculture          </p>
        </div>
      </section>

    
    </div>
  );
};

export default AboutUs;
