import { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { fetchPhases, createChangeLog } from "../services/apiPhase";
import { format, parseISO } from "date-fns";

const ChangePhaseDetails = ({ token }) => {
  const [phases, setPhases] = useState([]);
  const [selectedPhaseId, setSelectedPhaseId] = useState("");
  const [originalPhase, setOriginalPhase] = useState(null);
  const [formData, setFormData] = useState({
    phase: "",
    taskDescription: "",
    startDate: "",
    endDate: "",
    cost: "",
  });
  const [updatedPhase, setUpdatedPhase] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPhases = async () => {
      try {
        const phasesData = await fetchPhases(token);
        console.log("Change Phase Page:", phasesData);
        if (Array.isArray(phasesData)) {
          // Format dates to dd/mm/yyyy when data is fetched
          const formattedPhasesData = phasesData.map((phase) => ({
            ...phase,
            startDate: phase.startDate
              ? format(parseISO(phase.startDate), "dd/MM/yyyy")
              : "",
            endDate: phase.endDate
              ? format(parseISO(phase.endDate), "dd/MM/yyyy")
              : "",
          }));

          setPhases(formattedPhasesData);
          if (formattedPhasesData.length > 0) {
            setSelectedPhaseId(formattedPhasesData[0]._id);
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

  useEffect(() => {
    if (selectedPhaseId) {
      const selectedPhase = phases.find(
        (phase) => phase._id === selectedPhaseId
      );
      setOriginalPhase(selectedPhase);
      setFormData({
        phase: selectedPhase.phaseName || "",
        taskDescription: selectedPhase.taskDescription || "",
        startDate: selectedPhase.startDate || "",
        endDate: selectedPhase.endDate || "",
        cost: selectedPhase.cost || "",
      });
    }
  }, [phases, selectedPhaseId]);

  const handleSelectChange = (e) => {
    setSelectedPhaseId(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAppend = (e) => {
    e.preventDefault();
    setUpdatedPhase(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert formData dates back to yyyy-mm-dd before submitting
    const formattedFormData = {
      ...formData,
      startDate: formData.startDate
        ? parseISO(
            formData.startDate.split("/").reverse().join("-")
          ).toISOString()
        : "",
      endDate: formData.endDate
        ? parseISO(
            formData.endDate.split("/").reverse().join("-")
          ).toISOString()
        : "",
    };

    try {
      const response = await createChangeLog(
        selectedPhaseId,
        formattedFormData,
        token
      );
      console.log("Change log created successfully:", response);
      // Optionally, reset the form or show a success message
    } catch (error) {
      setError("Failed to create change log.");
      console.error("Error creating change log:", error);
    }
  };

  const renderChange = (field, label) => {
    if (originalPhase && originalPhase[field] !== formData[field]) {
      // Convert the after value from yyyy-mm-dd to dd/mm/yyyy for date fields only
      const formattedAfterValue = field.includes("Date")
        ? format(
            parseISO(formData[field].split("/").reverse().join("-")),
            "dd/MM/yyyy"
          )
        : formData[field]; // No change for non-date fields

      return (
        <div className="changes-text-thin mt-4">
          <h6 className="h3-custom mb-4">{label}:</h6>
          <p className="ms-3">Before: {originalPhase[field]}</p>
          <p className="ms-3">After: {formattedAfterValue}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="contractor-bg pages-pad">
      <Container className="pages-custom-container">
        <h4 className="h3-custom">Change Phase Details</h4>
        <div className="pages-box-shadow p-3 mt-3">
          <div className="formLabel p-3">
            <Form.Group controlId="formPhaseSelect">
              <Form.Label>
                Select Phase to Change (Submission Required)
              </Form.Label>
              <Form.Control
                as="select"
                value={selectedPhaseId}
                onChange={handleSelectChange}
              >
                {phases.length > 0 ? (
                  phases.map((phase) => (
                    <option key={phase._id} value={phase._id}>
                      {phase.phaseName}
                    </option>
                  ))
                ) : (
                  <option>No phases available</option>
                )}
              </Form.Control>
            </Form.Group>

            {selectedPhaseId && (
              <>
                <Form.Group className="mt-3">
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="taskDescription"
                    value={formData.taskDescription}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>Cost</Form.Label>
                  <Form.Control
                    type="number"
                    name="cost"
                    value={formData.cost}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="button-container mt-4 d-flex align-items-center">
                  <Button
                    onClick={handleAppend}
                    className="custom-button-primary"
                  >
                    Append
                  </Button>
                  <span className="ms-3">Click to preview change details.</span>
                </div>
              </>
            )}
          </div>
        </div>

        {updatedPhase && (
          <div className="pages-box-shadow formLabel p-3 mt-3">
            <Container>
              <Row>
                <Col>
                  <h5 className="h3-custom mb-4">Changes</h5>
                  <div>
                    {renderChange("taskDescription", "Task Description")}
                    {renderChange("startDate", "Start Date")}
                    {renderChange("endDate", "End Date")}
                    {renderChange("cost", "Cost")}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        )}

        <div className="button-container mt-3">
          <Button onClick={handleSubmit} className="custom-button-primary">
            Submit
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ChangePhaseDetails;
