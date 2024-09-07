const express = require("express");
const router = express.Router();
const Phase = require("../models/Phase");
const Project = require("../models/Project");
const verifyTokenContractor = require("../middleware/verifyTokenContractor");
const verifyTokenCustomer = require("../middleware/verifyTokenCustomer");

//* Verify Token
router.use(verifyTokenContractor);
router.use(verifyTokenCustomer);

// Create a new phase
router.post("/", async (req, res) => {
  try {
    const { project, phaseName } = req.body;

    if (!project) {
      return res.status(400).json({ error: "Project ID is required." });
    }

    const projectExists = await Project.exists({ _id: req.body.project });
    if (!projectExists) {
      return res.status(400).json({ error: "Invalid Project Id." });
    }

    // Validate phaseName format
    const phaseNameRegex = /^Phase \d+$/;
    if (!phaseNameRegex.test(phaseName)) {
      return res
        .status(400)
        .json({ error: "Please input phaseName as e.g Phase 1" });
    }

    // Check if a phase with the same phaseName already exists for the project
    const phaseExists = await Phase.findOne({ phaseName, project });
    if (phaseExists) {
      return res.status(400).json({
        error: "Phase with the same name already exists for this project.",
      });
    }

    const newPhase = await Phase.create(req.body);
    res.status(201).json(newPhase);
  } catch (error) {
    res.status(500).json(error);
  }
});

//* Get all phases
router.get("/", async (req, res) => {
  try {
    const contractorId = req.contractor._id;
    const phases = await Phase.find({ contractor: contractorId }).populate(
      "project"
    );
    // const phases = await Phase.find({}).populate("project");

    if (phases.length === 0) {
      return res.status(404).json({ message: "No phases found" });
    }

    res.status(200).json(phases);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a single phase by ID
router.get("/:phaseId", async (req, res) => {
  try {
    const phase = await Phase.findById(req.params.phaseId).populate("project");
    if (!phase) {
      return res.status(404).json({ message: "Phase not found" });
    }
    res.status(200).json(phase);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a phase
router.delete("/delete/:phaseId", async (req, res) => {
  try {
    const phase = await Phase.findByIdAndDelete(req.params.phaseId);
    if (!phase) {
      return res.status(404).json({ message: "Phase not found" });
    }
    res.status(200).json({ message: "Phase deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

//* Creates a changeLog entry when phase details are changed
router.post("/:phaseId/changeLog", async (req, res) => {
  try {
    const { phaseId } = req.params;
    const phase = await Phase.findById(phaseId);
    if (!phase) {
      return res.status(404).json({ message: "Phase not found" });
    }

    // Create a change log entry
    const changeLogEntry = {
      oldTaskDescription: phase.taskDescription,
      newTaskDescription: req.body.taskDescription || phase.taskDescription,
      oldStartDate: phase.startDate,
      newStartDate: req.body.startDate || phase.startDate,
      oldEndDate: phase.endDate,
      newEndDate: req.body.endDate || phase.endDate,
      oldCost: phase.cost,
      newCost: req.body.cost || phase.cost,
      reviewStatus: "Pending",
    };

    phase.changeLog.push(changeLogEntry);
    await phase.save();

    const newChangeLog = phase.changeLog[phase.changeLog.length - 1];
    res.status(201).json(newChangeLog);
  } catch (error) {
    console.error("Error in /:phaseId/changeLog route:", error);
    res.status(500).json(error);
  }
});

//* Get a single changelog Id
router.get("/:phaseId/ChangeLog/:changeLogId", async (req, res) => {
  try {
    const { phaseId } = req.params;

    // Validate the phaseId parameter
    if (!phaseId) {
      return res.status(400).json({ message: "phaseId is required" });
    }

    // Find the phase document by phaseId
    const phase = await Phase.findById(phaseId);

    if (!phase) {
      return res.status(404).json({ message: "Phase not found" });
    }

    // Ensure changeLogs array is not empty
    if (phase.changeLog.length === 0) {
      return res.status(404).json({ message: "No change logs recorded" });
    }

    const latestChangeLog = phase.changeLog[phase.changeLog.length - 1];
    res.json(latestChangeLog);
  } catch (error) {
    res.status(500).json(error);
  }
});

//* Update Phase details when changeLog reviewStatus is Approved
router.put("/:phaseId/ChangeLog/:changeLogId", async (req, res) => {
  try {
    const { phaseId, changeLogId } = req.params;
    const { reviewStatus } = req.body;

    // if (!["Approved", "Rejected"].includes(reviewStatus)) {
    //   return res.status(400).json({ message: "Invalid review status" });
    // }

    // Find the phase by ID
    const phase = await Phase.findById(phaseId);
    if (!phase) {
      return res.status(404).json({ message: "Phase not found" });
    }

    // Find the specific change log entry by ID
    const changeLogEntry = phase.changeLog.id(changeLogId);
    if (!changeLogEntry) {
      return res.status(404).json({ message: "Change log entry not found" });
    }
    // Update the reviewStatus of the found change log entry
    changeLogEntry.reviewStatus = reviewStatus;

    // If reviewStatus is Approved, apply changes to the phase
    if (reviewStatus === "Approved") {
      if (changeLogEntry.newTaskDescription) {
        phase.taskDescription = changeLogEntry.newTaskDescription;
      }
      if (changeLogEntry.newStartDate) {
        phase.startDate = changeLogEntry.newStartDate;
      }
      if (changeLogEntry.newEndDate) {
        phase.endDate = changeLogEntry.newEndDate;
      }
      if (changeLogEntry.newCost) {
        phase.cost = changeLogEntry.newCost;
      }
    }

    // Save only the updated change log entry (update phase document)
    await phase.save();

    // Return the updated change log entry
    res.status(200).json(changeLogEntry);
  } catch (error) {
    console.error("Error updating change log:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
