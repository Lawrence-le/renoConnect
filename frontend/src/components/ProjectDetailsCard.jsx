import { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { getCustomer } from "../services/apiUsers";
import { contractorLoad } from "../services/apiUsers";


const ProjectDetailsCard = ({ phase, viewMode }) => {
  const [contractor, setContractor] = useState(null);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    // Fetch contractor and customer profiles
    const fetchProfiles = async () => {
      try {
        const contractorData = await contractorLoad(phase.contractorId); 
        const customerData = await getCustomer(phase.customerId); 
        setContractor(contractorData);
        setCustomer(customerData);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, [phase.contractorId, phase.customerId]); // Dependencies

  return (
    <>
      <Container>
        <Row>
        <Col>
          <h5>Contractor</h5>
          <p>Company Name: </p>
          <p>Person In Charge: </p>
          <p>Contact Number: </p>
          <p>Email: </p>
          <p>Registration No.: </p>
        </Col>
        <Col>
          <h5>Customer</h5>
          <p>Name: </p>
          <p>Contact Number: </p>
          <p>Email: </p>
        </Col>
        </Row>
      <Row>
        <h5 className="mt-4"><strong>Project Details</strong></h5>
        <p>Project Details: {phase.projectId}</p>
        <p>Project Address: {phase.projectAddress}</p>
        <p>Total Phases: {phase.projectPhaseCount}</p>
        <p>Down Payment (%): {phase.projectDownPayment}</p>
        <p>Down Payment Received ($): {phase.projectPaymentReceived}</p>
        <p>Total Project Cost ($): {phase.projectTotalCost}</p>
      </Row>
      </Container>

    </>
  );
};

export default ProjectDetailsCard;


