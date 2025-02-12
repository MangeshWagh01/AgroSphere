import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear previous messages

    // Get the JWT token from localStorage (or sessionStorage)
    //const token = localStorage.getItem("token"); // 'token' should be the key where the JWT is stored

    // if (!token) {
    //   setMessage("You are not authorized. Please log in again.");
    //   setLoading(false);
    //   return;
    // }

    // Send a POST request to the backend API to request a password reset
    try {
      const response = await fetch(
        "https://localhost:8989/users/forgot-password",
        {
          // Use HTTP if using localhost for dev environment
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Include JWT token in the Authorization header
          },
          body: JSON.stringify({ email }), // Send email in the body
        }
      );

      // Handle the response
      if (response.ok) {
        setMessage("A password reset link has been sent to your email.");
      } else {
        const error = await response.text();
        setMessage(error || "There was an error processing your request.");
      }
    } catch (error) {
      setMessage("There was an error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <p>Please enter your email address to receive a password reset link.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default ForgotPassword;
