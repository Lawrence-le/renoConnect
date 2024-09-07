const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Customer = require("../models/Customer");
const jwt = require("jsonwebtoken");
const verifyTokenCustomer = require("../middleware/verifyTokenCustomer");
const Project = require("../models/Project");
const Phase = require("../models/Phase");

const SALT_LENGTH = 12;

// sign up
// router.post("/signup", async (req, res) => {
//     try {
//         // check if there is project ref Id entered
//         const { project } = req.body;
//         if (!project) {
//             return res.status(400).json({error: "No Project Id, please enter."});
//         }

//         // check if project ref Id entered matches any created Project ref Id
//         const projectExists = await Project.exists({_id: req.body.project});
//         if (!projectExists) {
//             return res.status(400).json({error: "Invalid Project Id."});
//         }
//         // check if username is taken
//         const customerInDatabase = await Customer.findOne({ username: req.body.username });
//         if (customerInDatabase) {
//             return res.json({error: "Username is taken."});
//         }
//         // create new user with hashed password
//         const customer = await Customer.create({
//             username: req.body.username,
//             hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH),
//             name: req.body.name,
//             contact: req.body.contact,
//             email: req.body.email,
//             project: req.body.project,
//         })
//         const token = jwt.sign({ username: customer.username, _id: customer._id }, process.env.JWT_SECRET);
//         res.status(201).json({ customer, token });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

router.post("/signup", async (req, res) => {
  const { username, password, name, contact, email, projectId } = req.body;

  try {
    // Find the project by business projectId
    const project = await Project.findOne({ projectId });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, SALT_LENGTH);

    // Create a new customer and link to the project
    const customer = await Customer.create({
      username,
      hashedPassword,
      name,
      contact,
      email,
      projectId,
    });

    // Generate JWT token
    const token = jwt.sign(
      { username: customer.username, _id: customer._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expiration time
    );

    // Respond with the customer data and token
    res.status(201).json({
      customer,
      token,
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(400).json({ error: "Error creating customer" });
  }
});
  
// log in
router.post("/login", async (req, res) => {
  try {
    const customer = await Customer.findOne({ username: req.body.username });
    if (
      customer &&
      bcrypt.compareSync(req.body.password, customer.hashedPassword)
    ) {
      const token = jwt.sign(
        { username: customer.username, _id: customer._id },
        process.env.JWT_SECRET,
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid username or password." });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get customer profile with project and phases
router.get("/:customerId", verifyTokenCustomer, async (req, res) => {
    try {
        const { customerId } = req.params;
        if (!customerId) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        const customer = await Customer.findById(customerId);
        if (!customer) {
            res.status(404).json({ error: "Profile not found."});
        }
        const project = await Project.findOne({projectId: customer.projectId});
        const phases = await Phase.find({ project: project._id});
        res.json({ customer, project, phases });
    } catch (error) {
        if (res.statusCode === 404) {
            res.status(404).json({ error: error.message });
        } else {
        res.status(500).json({ error: error.message });
        }
    }
});

// PUT endpoint to update a change log
router.put('/:customerId/:projectId/phases/:phaseId/changeLogs/:changeLogId', verifyTokenCustomer, async (req, res) => {
  try {
      const { projectId, phaseId, changeLogId } = req.params;
      const { reviewStatus } = req.body; // Expecting status to be passed in the request body

      // Validate input
      // if (!status || !['Approved', 'Rejected'].includes(status)) {
      //     return res.status(400).json({ error: "Invalid status value. It must be 'approved' or 'rejected'." });
      // }

      // Find the project
      const project = await Project.findById(projectId);
      if (!project) {
          return res.status(404).json({ error: "Project not found" });
      }

      // Find the phase within the project
      const phase = await Phase.findById(phaseId);
      if (!phase) {
          return res.status(404).json({ error: "Phase not found" });
      }

      // Find the change log within the phase
      const changeLogEntry = phase.changeLog.id(changeLogId);
      if (!changeLogEntry) {
          return res.status(404).json({ error: "Change log entry not found" });
      }

      // Update the change log status
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
      await phase.save();

      // Send updated change log as response
      res.status(200).json(changeLogEntry);
  } catch (error) {
      console.error("Error updating change log:", error); // Log the full error
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
