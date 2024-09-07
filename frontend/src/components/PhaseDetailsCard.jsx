import { Card } from "react-bootstrap";
import {
  formatDateForDisplay,
  determinePhaseStatus,
} from "../../utils/dateFormat";
import { parseISO } from "date-fns";

const PhaseDetailsCard = ({ phase, viewMode }) => {
  if (!phase) {
    return (
      <Card
        className="mb-3"
        style={{
          backgroundColor: "transparent",
          color: "white",
          border: "none",
        }}
      >
        <Card.Body>
          <Card.Text className="mb-1" style={{ fontWeight: "500" }}>
            No phase details available.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  const isEmptyPhase = Object.values(phase).every(
    (value) => value === "" || value === null || value === undefined
  );

  const hasEmptyField = Object.values(phase).some(
    (value) => value === "" || value === null || value === undefined
  );

  const startDate = parseISO(phase.startDate);
  const endDate = parseISO(phase.endDate);
  const phaseStatus = determinePhaseStatus(startDate, endDate);

  if (isEmptyPhase) {
    return (
      <Card
        className="mb-3"
        style={{
          backgroundColor: "transparent",
          color: "white",
          border: "none",
        }}
      >
        <Card.Body>
          <Card.Text className="mb-1" style={{ fontWeight: "500" }}>
            Please enter phase details and click the append button to show
            details.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  if (hasEmptyField) {
    console.log("PHASE HAS EMPTY FIELDS");
    return (
      <Card
        className="mb-3"
        style={{
          backgroundColor: "transparent",
          color: "white",
          border: "none",
        }}
      >
        <Card.Body>
          <Card.Text className="mb-3" style={{ fontWeight: "500" }}>
            Incomplete Entries
          </Card.Text>
          <Card.Text>
            Please enter all fields to view complete details.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card
      className="mb-3"
      style={{
        backgroundColor: "transparent",
        color: "white",
        border: "none",
      }}
    >
      <Card.Body>
        <Card.Title className="mb-3" style={{ fontWeight: "700" }}>
          {phase.phaseName}
        </Card.Title>

        {viewMode !== "create" && (
          <Card.Subtitle className="mb-3">
            <strong>[{phaseStatus}]</strong>
          </Card.Subtitle>
        )}

        <Card.Text>
          <strong>Task:</strong> {phase.task}
        </Card.Text>
        <Card.Text>
          <strong>Task Description:</strong> {phase.taskDescription}
        </Card.Text>
        <Card.Text>
          <strong>Start Date:</strong>{" "}
          {phase.startDate ? formatDateForDisplay(phase.startDate) : "N/A"}
        </Card.Text>
        <Card.Text>
          <strong>End Date:</strong>{" "}
          {phase.endDate ? formatDateForDisplay(phase.endDate) : "N/A"}
        </Card.Text>
        <Card.Text>
          <strong>Cost:</strong> ${phase.cost || "0"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PhaseDetailsCard;
