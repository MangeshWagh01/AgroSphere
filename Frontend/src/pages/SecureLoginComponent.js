
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../component/AuthContext";
import AuthService from "../services/AuthService";
import ReCAPTCHA from "react-google-recaptcha";
import "./LoginComponent.css";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [captchaValue, setCaptchaValue] = useState(null); // To store CAPTCHA value
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!captchaValue) {
      setError("Please complete the CAPTCHA.");
      return;
    }

    try {
      const data = await AuthService.loginUser(email, password);

      localStorage.setItem("token", data.jwt);
      localStorage.setItem("userName", data.firstName);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.id);
      alert("Login Successful!");

      login(data.role);

      if (data.role === "FARMER") {
        navigate("/farmer-dash");
      } else if (data.role === "BUYER") {
        navigate("/buyer-dash");
      } else if (data.role === "ADMIN") {
        navigate("/admin-dash");
      } else {
        alert("Invalid Role");
      }
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const onCaptchaChange = (value) => {
    setCaptchaValue(value); // Store the reCAPTCHA response
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {/* Google reCAPTCHA */}
          <div className="captcha-container">
            <ReCAPTCHA
              sitekey="6LcgutMqAAAAAIF5Bsd3pxyYKCPPSkMZmpb8ZQBL" // Replace with your site key
              onChange={onCaptchaChange}
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <button
            type="button"
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
