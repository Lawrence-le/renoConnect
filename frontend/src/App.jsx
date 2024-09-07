import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import ContractorBar from "./components/ContractorBar";
import CustomerBar from "./components/CustomerBar";
import Navibar from "./components/Navibar";
import Footer from "./components/Footer";
import ContractorLogin from "./pages/ContractorLogin";
import CustomerLogin from "./pages/CustomerLogin";
import ContractorSignup from "./pages/ContractorSignup";
import CustomerSignup from "./pages/CustomerSignup";
import ContractorDashboard from "./pages/ContractorDashboard";
import ContractorProjectDetails from "./pages/ContractorProjectDetails";
import ContractorCreate from "./pages/ContractorCreate";
import ContractorChange from "./pages/ContractorChange";
import CustomerDashboard from "./pages/CustomerDashboard";
import CustomerProjectDetails from "./pages/CustomerProjectDetails";
import bgImage from "./assets/b1.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./css/styles.css";
import ShowProjectDetails from "./components/ShowProjectDetails";
// import ProjectsList from "./pages/list";
import EditProjectDetails from "./pages/EditProjectDetails";

function App() {
  const [token, setToken] = useState("");
  const [isContractorLoggedIn, setIsContractorLoggedIn] = useState(false);
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
  const [customerProfile, setCustomerProfile] = useState("");
  const [contractorProfile, setContractorProfile] = useState("");
  const [projectId, setProjectId] = useState([]);
  const [projectDetails, setProjectDetails] = useState([]);

  console.log("Project ID in apps", projectId);
  console.log("Project Details in apps", projectDetails);

  return (
    <div className="homeContent">
      {isContractorLoggedIn ? (
        <ContractorBar
          setIsContractorLoggedIn={setIsContractorLoggedIn}
          setToken={setToken}
          contractorProfile={contractorProfile}
          projectDetails={projectDetails}
        />
      ) : isCustomerLoggedIn ? (
        <CustomerBar
          setIsCustomerLoggedIn={setIsCustomerLoggedIn}
          setToken={setToken}
          customerProfile={customerProfile}
          projectDetails={projectDetails}
        />
      ) : (
        <Navibar />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="homeSection">
                <img
                  src={bgImage}
                  alt="Background"
                  className="background-image"
                />
                <Container className="caption-container">
                  <h3 className="margin-top">
                    Seamless Renovation Starts Here
                  </h3>
                  <h1 className="h1Bold">Connect Create Track</h1>
                  <h5 className="paragraph">
                    Connecting renovation contractors with their customers. Say
                    goodbye to tracking renovation progress through cumbersome
                    emails—keep everything organized and accessible in one
                    place.
                  </h5>
                  <h3 className="margin-top">Get Started - Sign Up Here</h3>
                  <div className="button-container mt-4">
                    <Link to="/contractor/signup">
                      <Button className="custom-button-primary me-2">
                        Contractor
                      </Button>
                    </Link>
                    <Link to="/customer/signup">
                      <Button className="custom-button-secondary">
                        Customer
                      </Button>
                    </Link>
                  </div>
                </Container>
              </div>
            </div>
          }
        />
        <Route
          path="/contractor/login"
          element={
            <ContractorLogin
              setToken={setToken}
              setIsContractorLoggedIn={setIsContractorLoggedIn}
              setContractorProfile={setContractorProfile}
            />
          }
        />
        <Route
          path="/customer/login"
          element={
            <CustomerLogin
              setToken={setToken}
              setIsCustomerLoggedIn={setIsCustomerLoggedIn}
              setCustomerProfile={setCustomerProfile}
            />
          }
        />
        <Route
          path="/contractor/signup"
          element={<ContractorSignup setToken={setToken} />}
        />
        <Route
          path="/customer/signup"
          element={<CustomerSignup projectId={projectId} setToken={setToken} />}
        />
        <Route
          path="/contractor"
          element={
            <ContractorDashboard
              token={token}
              setProjectDetails={setProjectDetails}
              setProjectId={setProjectId}
            />
          }
        />
        <Route
          path="/contractor/projectdetails"
          element={
            <ContractorProjectDetails
              token={token}
              projectId={projectId}
              setProjectId={setProjectId}
            />
          }
        />
        <Route
          path="/contractor/create"
          element={
            <ContractorCreate
              contractorProfile={contractorProfile}
              projectId={projectId}
              token={token}
            />
          }
        />
        <Route
          path="/contractor/change"
          element={<ContractorChange token={token} />}
        />
        <Route path="/customer" element={<CustomerDashboard token={token} />} />
        <Route
          path="/customer/projectdetails"
          element={<CustomerProjectDetails token={token} />}
        />
        <Route
          path="/projectdetails/:id"
          element={<ShowProjectDetails token={token} />}
        />
        <Route
          path="/projectdetails/edit/:id"
          element={<EditProjectDetails token={token} />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
