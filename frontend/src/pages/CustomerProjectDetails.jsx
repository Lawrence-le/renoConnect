import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import ProjectTrackingCard from "../components/ProjectTrackingCard";
import ProjectDetailsCard from "../components/ProjectDetailsCard";
import ProjectsListCust from "../components/ProjectListCust";


const CustomerProjectDetails = ({ token }) => {
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

  return (
    <div className="customer-bg pages-pad">
      <Container className="pages-custom-container">
        <h4 className="h3-custom">Project Details</h4>
        <div className="pages-box-shadow p-3 p-projectTracking">
          <ProjectsListCust token={token}/>
        </div>
      </Container>
    </div>
  );
};

export default CustomerProjectDetails;
