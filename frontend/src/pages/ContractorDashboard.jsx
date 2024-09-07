import { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import PhaseDetailsCard from "../components/PhaseDetailsCard";
import ProjectTrackingCard from "../components/ProjectTrackingCard";
import ChangeRequestCard from "../components/ChangeRequestCard";
import { fetchPhases, deletePhase } from "../services/apiPhase";
import { projectDetailsLoad } from "../services/apiProject";

const ContractorDashboard = ({ setProjectDetails, setProjectId, token }) => {
  const [phases, setPhases] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // useEffect(() => {
  //   const loadProjectDetails = async () => {
  //     try {
  //       const dataProjects = await projectDetailsLoad(token);
  //       if (dataProjects && dataProjects.project) {
  //         const projectData = dataProjects.project;
  //         setProjectDetails(projectData);
  //         setProjectId(projectData.map((p) => p._id));
  //       } else {
  //         setError("No project details found.");
  //       }
  //     } catch (error) {
  //       setError("Failed to load project details.");
  //     }
  //   };

  //   loadProjectDetails(); // Load project details on component mount
  // }, [token, setProjectDetails, setProjectId]);

  useEffect(() => {
    const loadProjectDetails = async () => {
      try {
        const projectsData = await projectDetailsLoad(token);
        console.log("Projects data:", projectsData);

        if (Array.isArray(projectsData)) {
          setProjectDetails(projectsData);
          if (projectsData.length > 0) {
            setProjectId(projectsData.map((p) => p._id));
          }
        } else {
          setError("Invalid data format received.");
        }
      } catch (error) {
        setError("Failed to load project details.");
        console.error("Error fetching projects:", error);
      }
    };

    loadProjectDetails(); // Load project details on component mount
  }, [token]);

  useEffect(() => {
    const loadPhases = async () => {
      try {
        const phasesData = await fetchPhases(token);
        console.log("Phases data:", phasesData);
        if (Array.isArray(phasesData)) {
          setPhases(phasesData);
          if (phasesData.length > 0) {
            setSelectedPhase(phasesData[0]._id);
          }
        } else {
          setError("Invalid data format received.");
        }
      } catch (error) {
        setError("Failed to load phases.");
        console.error("Error fetching phases:", error);
      }
    };

    loadPhases();
  }, [token]);

  const handleChange = (e) => {
    setSelectedPhase(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await deletePhase(selectedPhase, token);
      setSuccessMessage("Phase deleted successfully!");
      setPhases(phases.filter((phase) => phase._id !== selectedPhase));
      if (phases.length > 1) {
        setSelectedPhase(phases[0]._id);
      } else {
        setSelectedPhase("");
      }
    } catch (error) {
      setError("Failed to delete phase.");
      console.error("Error deleting phase:", error);
    }
  };

  return (
    <div className="contractor-bg pages-pad">
      <Container className="pages-custom-container">
        <h4 className="h3-custom">Dashboard</h4>
        <div className="pages-box-shadow p-3">
          <h5 className="h3-custom mb-4">Project Tracking</h5>
          <ProjectTrackingCard token={token} />
        </div>

        <div className="pages-box-shadow p-3 mt-3">
          <h5 className="h3-custom">Change Requests: Pending Approval</h5>
          {selectedPhase && (
            <ChangeRequestCard
              phase={phases.find((p) => p._id === selectedPhase)}
              token={token}
            />
          )}
        </div>

        <Form onSubmit={handleSubmit} className="pages-box-shadow p-3 mt-3">
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
          <div className="button-container mt-3">
            <Button type="submit" className="custom-button-primary">
              Delete
            </Button>
          </div>
          {error && <div className="error mt-3">{error}</div>}
          {successMessage && (
            <div className="success mt-3">{successMessage}</div>
          )}
        </Form>
      </Container>
    </div>
  );
};

export default ContractorDashboard;
