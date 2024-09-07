import { useState, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { getChangeLog, fetchPhases } from "../services/apiPhase";

//? Renders changeLog details
const ChangeRequestCard = ({ token }) => {
  const [phases, setPhases] = useState([]);
  const [selectedPhaseId, setSelectedPhaseId] = useState("");
  const [changeLog, setChangeLog] = useState([]);

  // Fetch phases for the dropdown
  useEffect(() => {
    const loadPhases = async () => {
      try {
        const phasesData = await fetchPhases(token);
        if (Array.isArray(phasesData)) {
          setPhases(phasesData);
          if (phasesData.length > 0) {
            setSelectedPhaseId(phasesData[0]._id); // Default to the first phase
          }
        }
      } catch (error) {
        console.error("Error fetching phases:", error);
      }
    };

    loadPhases();
  }, [token]);

  // Fetch change log when selectedPhaseId changes
  useEffect(() => {
    const loadChangeLog = async () => {
      if (selectedPhaseId) {
        try {
          const changeLogData = await getChangeLog(selectedPhaseId, changeLog._id, token);
          setChangeLog(changeLogData);
        } catch (error) {
          console.error("Error fetching change log:", error);
        }
      }
    };

    loadChangeLog();
  }, [selectedPhaseId, changeLog._id, token]);

  // Determine if there are any changes
  const hasChanges = changeLog && (
    changeLog.oldTaskDescription !== changeLog.newTaskDescription ||
    changeLog.oldStartDate !== changeLog.newStartDate ||
    changeLog.oldEndDate !== changeLog.newEndDate ||
    changeLog.oldCost !== changeLog.newCost 
  );

  // Render changed fields
  const renderChange = (field, label) => {
    const oldValue = changeLog[`old${field}`];
    const newValue = changeLog[`new${field}`];

    if (oldValue !== newValue) {
      return (
        <div className="changes-text-thin mt-4" key={label}>
          <h6 className="h3-custom mb-4">{label}:</h6>
          <p className="ms-3">Before: {oldValue || "N/A"}</p>
          <p className="ms-3">After: {newValue || "N/A"}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <Card
        className="mb-3"
        style={{
          backgroundColor: "transparent",
          color: "white",
          border: "none",
        }}
      >
        <Card.Body>
          <Form.Group controlId="formPhaseSelect">
            <Form.Label>Select Phase</Form.Label>
            <Form.Control
              as="select"
              value={selectedPhaseId}
              onChange={(e) => setSelectedPhaseId(e.target.value)}
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

          {hasChanges ? (
            <>
              {renderChange('TaskDescription', 'Task Description')}
              {renderChange('StartDate', 'Start Date')}
              {renderChange('EndDate', 'End Date')}
              {renderChange('Cost', 'Cost')}
              {changeLog && (
                <div className="mt-3">
                  <h5>Review Status: {changeLog.reviewStatus || "N/A"}</h5>
                </div>
              )}
            </>
          ) : (
            <Card.Text className="mb-1" style={{ fontWeight: "500" }}>
              No pending changes
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ChangeRequestCard;
