
import React, { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Container,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegistrationForm.css";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    address: "",
    contactNo: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.repeatPassword)
      newErrors.repeatPassword = "Passwords do not match";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.contactNo) newErrors.contactNo = "Contact Number is required";
    if (!formData.role) newErrors.role = "Role is required";

    // Regex for validating email and contactNo (phone)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (formData.contactNo && !phoneRegex.test(formData.contactNo)) {
      newErrors.contactNo = "Contact number must be 10 digits";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("https://localhost:8989/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage(
          "Registration successful! A confirmation email has been sent."
        );
        setTimeout(() => navigate("/secureLogin"), 2000); // Navigate after 2 seconds
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please check the server.");
    }
  };

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="d-flex justify-content-center w-100">
        <Col lg={8}>
          <Card
            className="shadow-lg p-5"
            style={{
              borderRadius: "25px",
              backgroundColor: "#ffffff",
              color: "#333",
            }}
          >
            <Row>
              <Col lg={6}>
                <h1 className="text-center mb-4">Sign up</h1>

                {Object.keys(errors).length > 0 && (
                  <Alert variant="danger">
                    <ul>
                      {Object.values(errors).map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </Alert>
                )}

                {successMessage && (
                  <Alert variant="success">
                    <strong>{successMessage}</strong>
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      isInvalid={!!errors.firstName}
                      style={{ backgroundColor: "#e9ecef", border: "none" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      isInvalid={!!errors.lastName}
                      style={{ backgroundColor: "#e9ecef", border: "none" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="yashahire10224@gmail.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      style={{ backgroundColor: "#e9ecef", border: "none" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      style={{ backgroundColor: "#e9ecef", border: "none" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Repeat your password"
                      name="repeatPassword"
                      value={formData.repeatPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.repeatPassword}
                      style={{ backgroundColor: "#e9ecef", border: "none" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.repeatPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      isInvalid={!!errors.address}
                      style={{ backgroundColor: "#e9ecef", border: "none" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Contact Number"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleChange}
                      isInvalid={!!errors.contactNo}
                      style={{ backgroundColor: "#e9ecef", border: "none" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.contactNo}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      isInvalid={!!errors.role}
                      style={{ backgroundColor: "#e9ecef", border: "none" }}
                    >
                      <option value="">Select Role</option>
                      <option value="FARMER">Farmer</option>
                      <option value="BUYER">Buyer</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.role}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid">
                    <Button type="submit" variant="primary" size="lg">
                      Register
                    </Button>
                  </div>
                  <br />
                  <div className="text-center">
                    <a
                      href="/secureLogin"
                      className="text-decoration-none"
                      style={{ color: "#007bff" }}
                    >
                      Already Registered?
                    </a>
                  </div>
                </Form>
              </Col>

              <Col
                lg={6}
                className="d-flex align-items-center justify-content-center"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  alt="Sign up illustration"
                  className="img-fluid rounded"
                  style={{ maxWidth: "100%" }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegistrationForm;
