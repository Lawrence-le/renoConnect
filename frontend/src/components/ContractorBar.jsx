import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";

function ContractorBar({
  setIsContractorLoggedIn,
  setToken,
  contractorProfile,
  projectDetails,
}) {
  console.log("Prop:", contractorProfile?.contractorUser?.name);

  console.log("Profile", contractorProfile);

  const userName = contractorProfile?.contractorUser?.name || "";
  const projectAddress = projectDetails?.[0]?.projectAddress || "#Address";
  console.log("Project Details: ", projectDetails);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken("");
    setIsContractorLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="bg-primary-fixed">
      <Navbar className="bg-primary-color bar-control">
        <Container>
          {/* <Navbar.Brand href="/">renoConnect</Navbar.Brand> */}
          <Navbar.Brand href="/">
            <img
              src="/logo.png"
              // width="30"
              height="25"
              className="d-inline-block align-top mt-1"
              alt="renoConnect logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Navbar className="bg-body-tertiary">
        <Container>
          <div>
            <div style={{ fontWeight: "600", fontSize: "1.2rem" }}>
              Contractor Workspace
            </div>
            <div style={{ fontWeight: "300" }}>
              <span>{userName}</span>
              <span> | </span>
              <span>{projectAddress}</span>
            </div>
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link as={Link} className="navLink" to="/contractor">
                Dashboard
              </Nav.Link>
              <Nav.Link
                as={Link}
                className="navLink"
                to="/contractor/projectdetails"
              >
                Project Details
              </Nav.Link>
              <NavDropdown
                className="navLink"
                title="Phase Controls"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="/contractor/create">
                  Create
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/contractor/change">
                  Change
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as="button" className="navLink" onClick={handleLogout}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default ContractorBar;
