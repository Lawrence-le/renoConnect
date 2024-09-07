import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
import { Container, Form, Button } from "react-bootstrap";
import ProjectDetailsCard from "../components/ProjectDetailsCard";
import { projectDetailsLoad } from "../services/apiProject";
// import ProjectTrackingCard from "../components/ProjectTrackingCard";
import { contractorProjectDetailsEdit } from "../services/apiProject";
import ProjectsList from "../components/ProjectList";
import { showProjectDetails } from "../services/apiProject";
import { Link } from "react-router-dom";

const EditProjectDetails = ({ token }) => {
  const { id } = useParams();
  const [projects, setProjects] = useState(null);
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

  useEffect(() => {
    const loadProjectsDetails = async () => {
      const data = await showProjectDetails(id, token);
      console.log(data);

      if (data && data.project) {
        setProjects(data.project);
        setFormData({
          projectId: data.project.projectId,
          startDate: data.project.startDate,
          endDate: data.project.endDate,
          projectAddress: data.project.projectAddress,
          projectPhaseCount: data.project.projectPhaseCount,
          projectDownPayment: data.project.projectDownPayment,
          projectPaymentReceived: data.project.projectPaymentReceived,
          projectTotalCost: data.project.projectTotalCost,
        });
      }
    };
    loadProjectsDetails();
  }, [id, token]);

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
      const response = await contractorProjectDetailsEdit(id, formData, token);
      if (!response.ok) {
        setError("");
        setSuccess("Project Details Updated!");
        navigate(`/projectdetails/${id}`);
      } else {
        setSuccess("");
        setError("Failed to update project details!");
      }
      //   setCreate(formData);
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  };
  if (!projects) return <div>Loading...</div>;

  return (
    <div className="contractor-bg pages-pad">
      <Container className="pages-custom-container">
        <h4 className="h3-custom">Project Details</h4>

        <div className="pages-box-shadow p-3 mt-3">
          <h5 className="h3-custom">Edit Project</h5>

          <Form onSubmit={handleSubmit} className="formLabel mt-2 p-3">
            <Form.Group controlId="formProjectId">
              <Form.Label>Project ID</Form.Label>
              <Form.Control
                type="text"
                name="projectId"
                placeholder="Enter your project ID"
                value={formData.projectId}
                onChange={handleChange}
                disabled // Disable input in edit mode
                required="true"
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
                required="true"
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
                required="true"
              />
            </Form.Group>

            <Form.Group controlId="formStartDate" className="mt-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required="true"
              />
            </Form.Group>

            <Form.Group controlId="formEndDate" className="mt-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required="true"
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
                required="true"
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
                required="true"
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
                required="true"
              />
            </Form.Group>

            <div className="button-container mt-3">
              <Button type="submit" className="custom-button-primary">
                Update
              </Button>
              {error && <p className="error mt-3">{error}</p>}
              {successMessage && (
                <p className="success mt-3">{successMessage}</p>
              )}
            </div>
          </Form>
        </div>
      </Container>

      <div></div>
    </div>
  );
};

export default EditProjectDetails;
