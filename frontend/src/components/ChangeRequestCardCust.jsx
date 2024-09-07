import { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { getCustomer, updateChangeLog } from "../services/apiUsers"

const ChangeRequestCard = ({ token }) => {
    const [phases, setPhases] = useState([]);
    const [changeLogs, setChangeLogs] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadCustomerData = async () => {
            try {
                const customerData = await getCustomer(token);
                console.log("Customer Data:", customerData);
                console.log("Customer Only", customerData.customer);
                setPhases(customerData.phases || []);

                const allChangeLogs = customerData.phases.reduce((logs, phase) => {
                    const phaseChangeLogs = phase.changeLog.map(log => ({
                        ...log,
                        phaseName: phase.phaseName,
                        projectId: customerData.project._id, 
                        customerId: customerData.customer._id, 
                        phaseId: phase._id 
                    }));
                    return logs.concat(phaseChangeLogs);
                }, []);

                setChangeLogs(allChangeLogs);
            } catch (error) {
                setError("Failed to load customer data.");
                console.error("Error fetching customer data:", error);
            }
        };

        loadCustomerData();
    }, [token]);

    // Check if there are any changes
    const hasChanges = changeLogs.length > 0;

    // Render changed fields
    const renderChange = (log, field, label) => {
        const oldValue = log[`old${field}`];
        const newValue = log[`new${field}`];

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

    // Handle approval of change log
    const handleApproval = async (customerId, projectId, phaseId, changeLogId, reviewStatus, token) => {
        try {
            await updateChangeLog(customerId, projectId, phaseId, changeLogId, 'Approved', token);
            setChangeLogs(changeLogs.map(log =>
                log._id === changeLogId ? { ...log, reviewStatus: "Approved" } : log
            ));
        } catch (error) {
            console.error("Error approving change log:", error.message);
        }
    };

    // Handle rejection of change log
    const handleRejection = async (customerId, projectId, phaseId, changeLogId, reviewStatus, token) => {
        try {
            await updateChangeLog(customerId, projectId, phaseId, changeLogId, 'Rejected', token);
            setChangeLogs(changeLogs.map(log =>
                log._id === changeLogId ? { ...log, reviewStatus: "Rejected" } : log
            ));
        } catch (error) {
            console.error("Error rejecting change log:", error.message);
            // Optionally, show an error message to the user
        }
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
                    {hasChanges ? (
                        changeLogs.map((log, index) => (
                            <div key={index} className="mb-4">
                                <h5 className="h3-custom">{log.phaseName || "Phase Unknown"}</h5>
                                {renderChange(log, 'TaskDescription', 'Task Description')}
                                {renderChange(log, 'StartDate', 'Start Date')}
                                {renderChange(log, 'EndDate', 'End Date')}
                                {renderChange(log, 'Cost', 'Cost')}
                                <div className="mt-3">
                                    <Button onClick={() => handleApproval(log.customerId, log.projectId, log.phaseId, log._id, 'Approved', token)} className="custom-button-primary">Approve</Button>
                                    <Button onClick={() => handleRejection(log.customerId, log.projectId, log.phaseId, log._id, 'Reject', token)} className="custom-button-primary">Reject</Button>
                                </div>
                            </div>
                        ))
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