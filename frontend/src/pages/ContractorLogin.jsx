import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { contractorLogin, contractorLoad } from "../services/apiUsers";

// login data contractor (service)

const ContractorLogin = ({ setToken, setIsContractorLoggedIn, setContractorProfile }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const token = await contractorLogin({ username, password });
      console.log(token);
      setToken(token);
      setIsContractorLoggedIn(true); // Set contractor login state
      setSuccessMessage("Login Successful");

      const profile = await contractorLoad(token);
      setContractorProfile(profile || "");

      navigate("/contractor"); // Redirect to customer dashboard
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="contractor-bg">
      <Container className="login-container">
        <h3 className="h3-custom ">Contractor Login</h3>
        <Form onSubmit={handleLogin} className="formLabel mt-4">
          <Form.Group controlId="formEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" className="mt-3 custom-button-primary">
            Login
          </Button>
          {error && <p className="error mt-3">{error}</p>}
          {successMessage && <p className="success mt-3">{successMessage}</p>}
        </Form>

        <h3 className="h3-custom mt-5">Your Impressive Project Begins Here!</h3>
        <div className="button-container mt-2">
          <Link to="/contractor/signup">
            <Button className="custom-button-primary me-2">Sign Up</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default ContractorLogin;
