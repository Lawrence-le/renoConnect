import { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import PhaseDetailsCard from "../components/PhaseDetailsCard";
import ProjectTrackingCard from "../components/ProjectTrackingCard";
import ChangeRequestCardCust from "../components/ChangeRequestCardCust";
import { getCustomer } from "../services/apiUsers"

const CustomerDashboard = ({ token }) => {
  const [phases, setPhases] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loadCustomerData = async () => {
      try {
        const customerData = await getCustomer(token);
        if (Array.isArray(customerData.phases)) {
          setPhases(customerData.phases);
          if (customerData.phases.length > 0) {
            setSelectedPhase(customerData.phases[0]._id); // Default to the first phase
          }
        } else {
          setError("Invalid data format received.");
        }
      } catch (error) {
        setError("Failed to load data.");
        console.error("Error fetching data:", error);
      }
    };

    loadCustomerData();
  }, [token]);

  const handleChange = (e) => {
    setSelectedPhase(e.target.value);
  };

  return (
    <div className="customer-bg pages-pad">
      <Container className="pages-custom-container">
        <h4 className="h3-custom">Dashboard</h4>
        <div className="pages-box-shadow p-3">
          <h5 className="h3-custom mb-4">Project Tracking</h5>
          <div>
            <ProjectTrackingCard token={token}/>
          </div>
        </div>

        <div className="pages-box-shadow p-3 mt-3">
          <h5 className="h3-custom">Change Requests: Pending Approval</h5>
          {selectedPhase && (
            <ChangeRequestCardCust
              phase={phases.find((p) => p._id === selectedPhase)}
              token={token}
            />
          )}
        </div>

        <Form className="pages-box-shadow p-3 mt-3">
          <h5 className="h3-custom">View/Delete Phase</h5>
          <Form.Group controlId="formPhaseSelect" className="mt-1">
            <Form.Label className="pages-form-labels">
              Select a phase:
            </Form.Label>
            <Form.Select value={selectedPhase} onChange={handleChange}>
              {phases.length > 0 ? (
                phases.map((phase) => (
                  <option key={phase._id} value={phase._id}>
                    {phase.phaseName}
                  </option>
                ))
              ) : (
                <option>No phases available</option>
              )}
            </Form.Select>
            <div className="mt-4">
              {selectedPhase && (
                <PhaseDetailsCard
                  phase={phases.find((p) => p._id === selectedPhase)}
                />
              )}
            </div>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default CustomerDashboard;