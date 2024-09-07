import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Only use navigate if needed
import { Container, Form, Button } from "react-bootstrap";
import ProjectsList from "../components/ProjectList";
import {
  contractorProjectDetailsEdit,
  contractorProjectDetails,
} from "../services/apiProject";

const ContractorProjectDetails = ({ projectId, setProjectId, token }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectId: "",
    startDate: "",
    endDate: "",
    projectAddress: "",
    projectPhaseCount: "",
    projectDownPayment: "",
    projectPaymentReceived: "",
    projectTotalCost: "",
  });

  const [successMessage, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      const response = await contractorProjectDetails(formData, token);
      setSuccess("Project Details Created!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        "You already have an existing project. Please delete it before creating a new one."
      );
      setSuccess("");
    }
  };

  return (
    <div className="contractor-bg pages-pad">
      <Container className="pages-custom-container">
        <h4 className="h3-custom">Project Details</h4>
        <div className="pages-box-shadow p-3 p-projectTracking">
          <ProjectsList
            token={token}
            projectId={projectId}
            setProjectId={setProjectId}
          />
        </div>
        <div className="pages-box-shadow p-3 mt-3">
          <h5 className="h3-custom">Create Project</h5>
          <Form onSubmit={handleSubmit} className="formLabel mt-2 p-3">
            <Form.Group controlId="formProjectId">
              <Form.Label>Project ID</Form.Label>
              <Form.Control
                type="text"
                name="projectId"
                placeholder="Enter your project ID"
                value={formData.projectId}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formProjectAddress" className="mt-3">
              <Form.Label>
                Project Address / Property under renovation
              </Form.Label>
              <Form.Control
                type="text"
                name="projectAddress"
                placeholder="Enter your project address"
                value={formData.projectAddress}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTotalPhases" className="mt-3">
              <Form.Label>Total Phases</Form.Label>
              <Form.Control
                type="number"
                name="projectPhaseCount"
                placeholder="Enter total phases"
                value={formData.projectPhaseCount}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formStartDate" className="mt-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEndDate" className="mt-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDownPaymentPercent" className="mt-3">
              <Form.Label>Down Payment (%)</Form.Label>
              <Form.Control
                type="number"
                name="projectDownPayment"
                placeholder="Enter down payment percentage"
                value={formData.projectDownPayment}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDownPaymentReceived" className="mt-3">
              <Form.Label>Down Payment Received ($)</Form.Label>
              <Form.Control
                type="number"
                name="projectPaymentReceived"
                placeholder="Enter down payment received"
                value={formData.projectPaymentReceived}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTotalProjectCost" className="mt-3">
              <Form.Label>Total Project Cost ($)</Form.Label>
              <Form.Control
                type="number"
                name="projectTotalCost"
                placeholder="Enter total project cost"
                value={formData.projectTotalCost}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="button-container mt-3">
              <Button type="submit" className="custom-button-primary">
                Create
              </Button>
              {errorMessage && <p className="error mt-3">{errorMessage}</p>}
              {successMessage && (
                <p className="success mt-3">{successMessage}</p>
              )}
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ContractorProjectDetails;
