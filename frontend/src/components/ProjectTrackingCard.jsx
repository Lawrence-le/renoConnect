import { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import GanttChart from "./GanttChart";
import { isAfter } from "date-fns";
import { fetchPhases } from "../services/apiPhase";
import { projectDetailsLoad } from "../services/apiProject";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; // Import CircularProgressbar styles

const ProjectTrackingCard = ({ token }) => {
  const [phases, setPhases] = useState([]);
  const [completedPhases, setCompletedPhases] = useState(0);
  const [totalPhases, setTotalPhases] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await projectDetailsLoad(token);
        console.log("Projects data:", projectsData);

        if (Array.isArray(projectsData) && projectsData.length > 0) {
          const project = projectsData[0];
          setTotalPhases(project.projectPhaseCount);
        } else {
          setError("Invalid project data format received.");
        }
      } catch (error) {
        setError("Failed to load projects.");
        console.error("Error fetching projects:", error);
      }
    };

    const loadPhasesData = async () => {
      try {
        const fetchedPhases = await fetchPhases(token);
        if (Array.isArray(fetchedPhases)) {
          setPhases(fetchedPhases);

          // Calculate completed phases
          const completed = fetchedPhases.filter((phase) => {
            return isAfter(new Date(), new Date(phase.endDate));
          }).length;
          setCompletedPhases(completed);
        } else {
          setError("Invalid phase data format received.");
        }
      } catch (error) {
        setError("Failed to load phases.");
        console.error("Error fetching phases:", error);
      }
    };

    // Load project and phases data
    loadProjects();
    loadPhasesData();
  }, [token]);

  const percentage =
    totalPhases > 0 ? (completedPhases / totalPhases) * 100 : 0;

  return (
    <div>
      <Container className="pages-custom-container">
        <div>
          <Row className="mt-2">
            <Col className="d-flex flex-column align-items-center">
              <div style={{ width: "120px", height: "120px" }}>
                <CircularProgressbar
                  value={percentage}
                  text={`${Math.round(percentage)}%`}
                  styles={buildStyles({
                    textColor: "white",
                    // pathColor: "turquoise",
                    pathColor: "#f2709c",
                    trailColor: "#3a6073",
                  })}
                />
              </div>
            </Col>
            <Col className="d-flex flex-column align-items-center">
              <h5 className="p-projectTracking" style={{ color: "#aeb6bf" }}>
                Total Phases
              </h5>
              <h2 className="h2-projectTracking">{totalPhases}</h2>
            </Col>
            <Col className="d-flex flex-column align-items-center">
              <h5 className="p-projectTracking" style={{ color: "#aeb6bf" }}>
                Completed
              </h5>
              <h2 className="h2-projectTracking">{completedPhases}</h2>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex flex-column align-items-center mt-3">
              <GanttChart token={token} />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ProjectTrackingCard;
