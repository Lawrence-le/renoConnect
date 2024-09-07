import { showProjectDetails } from "../services/apiProject";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

export default function ShowProjectDetails({ token }) {
  const { id } = useParams();
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const loadProjectsDetails = async () => {
      const data = await showProjectDetails(id, token);
      console.log(data);

      if (data && data.project) {
        setProjects(data.project);
      }
    };
    loadProjectsDetails();
  }, [id, token]);

  if (!projects) return <div>Loading...</div>;
  return (
    <div className="mt-3">
      <h1 className="mt-4">Project Details Updated</h1>
      <div key={projects._id}>
        <h2>{projects.projectAddress}</h2>
        <p>Project ID: {projects.projectId}</p>
        <p>
          Start Date:{" "}
          {projects.startDate
            ? format(parseISO(projects.startDate), "dd/MM/yy")
            : "N/A"}
        </p>
        <p>
          End Date:{" "}
          {projects.endDate
            ? format(parseISO(projects.startDate), "dd/MM/yy")
            : "N/A"}
        </p>
        <p>Total Phases: {projects.projectPhaseCount}</p>
        <p>Down Payment: ${projects.projectDownPayment}</p>
        <p>Payment Received: ${projects.projectPaymentReceived}</p>
        <p>Total Cost: ${projects.projectTotalCost}</p>
        <div className="button-container mt-3">
          <Link to={`/contractor/projectdetails`}>
            <button type="submit" className="custom-button-primary">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
