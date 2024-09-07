import { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import PhaseDetailsCard from "../components/PhaseDetailsCard";
import { createPhase, fetchPhases } from "../services/apiPhase";

// const TOTAL_PHASES = "";
const TOTAL_PHASES = 10;

const ContractorCreate = ({ contractorProfile, projectId, token }) => {
  console.log(projectId);
  console.log("Contractor Profile: ", contractorProfile);
  console.log("Contractor ID: ", contractorProfile.contractorUser._id);
  const [phases, setPhases] = useState([]);
  const [successMessage, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    phaseName: "",
    task: "",
    taskDescription: "",
    startDate: "",
    endDate: "",
    cost: "",
    project: projectId,
    // contractor: contractorProfile?.contractorUser?._id,
    // contractor: "66d87acb20a6bfb11191e583",
    contractor: contractorProfile.contractorUser._id,
  });

  const [appendPhase, setAppendPhase] = useState({
    phaseName: "",
    task: "",
    taskDescription: "",
    startDate: "",
    endDate: "",
    cost: "",
  });

  useEffect(() => {
    const loadPhases = async () => {
      try {
        console.log("Contractor ID: ", contractorProfile?.contractorUser?._id);
        const phasesData = await fetchPhases(token);
        console.log("Existing Phases:", phasesData);
        setPhases(phasesData);
      } catch (error) {
        console.error("Error fetching phases:", error.message);
      }
    };

    if (TOTAL_PHASES) {
      loadPhases();
    }
  }, [token]);

  const availablePhases = Array.from(
    { length: TOTAL_PHASES },
    (_, i) => `Phase ${i + 1}`
  ).filter(
    (phaseName) => !phases.some((phase) => phase.phaseName === phaseName)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAppend = (e) => {
    e.preventDefault();
    setAppendPhase(formData);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await createPhase(formData, token);
      console.log("Phase created successfully:", response);
      setSuccess("Phase Created!");
      setError("");

      // Clear the PhaseDetailsCard and formData after every time a phase is created
      setAppendPhase({
        phaseName: "",
        task: "",
        taskDescription: "",
        startDate: "",
        endDate: "",
        cost: "",
      });

      setFormData({
        phaseName: "",
        task: "",
        taskDescription: "",
        startDate: "",
        endDate: "",
        cost: "",
        // project: req.body.projectId,
        // contractor: req.user.id, //
        project: projectId,
        // contractor: contractorProfile?.contractorUser?._id,
        // contractor: "66d87acb20a6bfb11191e583",
        contractor: contractorProfile.contractorUser._id,
      });

      // Fetch updated list of phases after every time a phase is created
      const updatedPhases = await fetchPhases(token);
      setPhases(updatedPhases);
    } catch (error) {
      console.error(
        "Error creating phase:",
        error.response ? error.response.data : error.message
      );
      setError(error.response ? error.response.data.message : error.message);
      setSuccess("");
    }
  };

  if (!TOTAL_PHASES) {
    return (
      <div className="contractor-bg pages-pad">
        <Container className="pages-custom-container">
          <h4 className="h3-custom">Create New Phase</h4>
          <div className="pages-box-shadow p-3 mt-3">
            <div className="formLabel">
              Please create a project and input the total phases before creating
              phase.
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="contractor-bg pages-pad">
      <Container className="pages-custom-container">
        <h4 className="h3-custom">Create New Phase</h4>
        <div className="pages-box-shadow p-3 mt-3">
          {/* <h6 className="formLabel">Contractor ID: {contractorProfile}</h6> */}
          <Form className="formLabel p-3">
            <Form.Group controlId="formPhase">
              <Form.Label>
                Select Phase to Create (Total Phases: {TOTAL_PHASES})
              </Form.Label>
              <Form.Select
                name="phaseName"
                value={formData.phaseName}
                onChange={handleChange}
              >
                <option value="">Select a phase</option>
                {availablePhases.map((phase) => (
                  <option key={phase} value={phase}>
                    {phase}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formTask" className="mt-3">
              <Form.Label>Enter Task</Form.Label>
              <Form.Control
                type="text"
                name="task"
                placeholder="Enter task"
                value={formData.task}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formTaskDescription" className="mt-3">
              <Form.Label>Enter Task Description</Form.Label>
              <Form.Control
                type="text"
                name="taskDescription"
                placeholder="Enter task description"
                value={formData.taskDescription}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formStartDate" className="mt-3">
              <Form.Label>Enter Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEndDate" className="mt-3">
              <Form.Label>Enter End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formCost" className="mt-3">
              <Form.Label>Enter Cost</Form.Label>
              <Form.Control
                type="number"
                name="cost"
                placeholder="Enter cost"
                value={formData.cost}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="button-container mt-4">
              <Button onClick={handleAppend} className="custom-button-primary">
                Append
              </Button>{" "}
              <span className="ms-3">Click to show details.</span>
            </div>
          </Form>
        </div>

        <div className="pages-box-shadow p-3 mt-3">
          <PhaseDetailsCard phase={appendPhase} viewMode="create" />
        </div>

        <div className="button-container mt-3">
          <Button onClick={handleCreate} className="custom-button-primary">
            Create
          </Button>
          {error && <div className="formLabel mt-3">{error}</div>}
          {successMessage && (
            <div className="formLabel mt-3">{successMessage}</div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ContractorCreate;
