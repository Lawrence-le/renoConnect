import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { contractorSignup } from "../services/apiUsers";

// sign up data contractor

const ContractorSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    contact: "",
    email: "",
    registrationNumber: "",
    username: "",
    password: "",
  })
  const [successMessage, setSuccess] = useState("");
  const [error, setError] = useState("");

const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await contractorSignup(formData);
      setSuccess("Sign up successfiul!");
      setError("");
      console.log("Token:", token);
      navigate("/contractor/login");
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  };

  return (
    <div className="contractor-bg">
      <Container className="login-container">
        <h3 className="h3-custom">Contractor Sign Up</h3>
        <Form
          onSubmit={handleSubmit}
          className="formLabel mt-4 pages-box-shadow p-3"
        >
          <h4>Company Details</h4>
          <Form.Group controlId="formCompanyName" className="mt-3">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your company name"
              value={formData.company}
              name="company"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formName" className="mt-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              name="name"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formContactNumber" className="mt-3">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your contact number"
              value={formData.contact}
              name="contact"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group
            controlId="formCompanyRegistrationNumber"
            className="mt-3"
          >
            <Form.Label>Company Registration Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your company registration number"
              value={formData.registrationNumber}
              name="registrationNumber"
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form>
        <Form
          onSubmit={handleSubmit}
          className="formLabel mt-4 pages-box-shadow p-3"
        >
          <h4>Account Details</h4>

          <Form.Group controlId="formUsername" className="mt-3">
            <Form.Label>Create Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Create a username"
              value={formData.username}
              name="username"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Create Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Create a password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="button-container mt-3">
            <Button type="submit" className="custom-button-primary">
              Sign Up
            </Button>
            {error && <p className="error mt-3">{error}</p>}
            {successMessage && <p className="success mt-3">{successMessage}</p>}
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ContractorSignup;
