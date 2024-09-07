import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-footer text-white">
        <Container>
          <Row>
            <Col className="text-center text-md-left">
              <p>
                &copy; {new Date().getFullYear()} RenoConnect. All rights
                reserved.
              </p>
            </Col>
            <Col className="text-center text-md-right">
              <a href="#!" className="text-white">
                Contact Us
              </a>
            </Col>
          </Row>
        </Container>
      </footer>

      {/*Test Routes */}
      {/* <div className="bg-light py-3">
        <Container>
          <Row className="mb-3">
            <Col>
              <h5 className="text-center">Contractor Routes</h5>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <Link to="/contractor/login">Contractor Login</Link>
            </Col>
            <Col className="text-center">
              <Link to="/contractor/signup">Contractor Signup</Link>
            </Col>
            <Col className="text-center">
              <Link to="/contractor">Contractor Dashboard</Link>
            </Col>
            <Col className="text-center">
              <Link to="/contractor/projectdetails">
                Contractor Project Details
              </Link>
            </Col>
            <Col className="text-center">
              <Link to="/contractor/create">Contractor Create</Link>
            </Col>
            <Col className="text-center">
              <Link to="/contractor/change">Contractor Change</Link>
            </Col>
          </Row>

          <Row className="mt-4 mb-3">
            <Col>
              <h5 className="text-center">Customer Routes</h5>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <Link to="/customer/login">Customer Login</Link>
            </Col>
            <Col className="text-center">
              <Link to="/customer/signup">Customer Signup</Link>
            </Col>
            <Col className="text-center">
              <Link to="/customer">Customer Dashboard</Link>
            </Col>
            <Col className="text-center">
              <Link to="/customer/projectdetails">
                Customer Project Details
              </Link>
            </Col>
          </Row>
        </Container>
      </div> */}
    </>
  );
};

export default Footer;
