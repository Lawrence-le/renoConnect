const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const debug = require("debug")("hoot:controllers:ProjectsController");
const verifyTokenContractor = require("../middleware/verifyTokenContractor");
const verifyTokenCustomer = require("../middleware/verifyTokenCustomer");

//* Verify Token
router.use(verifyTokenContractor);
router.use(verifyTokenCustomer);

//* Create new project
// router.post("/", async (req, res) => {
//     try {
//         const { projectId } = req.body;
//         if (!projectId) {
//             return res.status(400).json({error: "projectId is required."});
//         }

//         const existingProject = await Project.findOne({ projectId });
//         if (existingProject) {
//             return res.status(400).json({ error: "Project number used." });
//         }

//         // if (Project.length > 1) {
//         //     return res.status(400).json({ error: "Only one project at a time." });
//         // }

//         req.body.contractor = req.contractor._id;
//         const project = await Project.create(req.body);
//         debug(project);
//         res.status(201).json({project});
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// allow only one creation of project
router.post("/", async (req, res) => {
  try {
    const { projectId } = req.body;

    // Ensure got Id
    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required." });
    }
    // contractor id
    const contractorId = req.contractor._id;

    // Check if the contractor already has an existing project
    const existingProject = await Project.findOne({ contractor: contractorId });
    if (existingProject) {
      return res.status(400).json({
        error:
          "You already have an existing project. Please delete it before creating a new one.",
      });
    }

    // Check if the projectId is already used by another project
    const duplicateProjectId = await Project.findOne({ projectId });
    if (duplicateProjectId) {
      return res.status(400).json({ error: "Project ID already in use." });
    }

    // If no existing project and projectId is unique, create a new project
    req.body.contractor = contractorId;
    const project = await Project.create(req.body);
    res.status(201).json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//! NEW TESTING FOR SPECIFIC CONTRACTOR GET THEIR OWN PROJECT ONLY
router.get("/", async (req, res) => {
  try {
    const contractorId = req.contractor._id; // Assuming the contractor's ID is attached to the request
    console.log("Contractor ID:", contractorId);

    const projects = await Project.find({ contractor: contractorId }); // Filter projects by contractor ID
    console.log("Found Projects:", projects);

    if (projects.length === 0) {
      return res
        .status(404)
        .json({ error: "No projects found for this contractor" });
    }

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// //* Get All Projects
// router.get("/", async (req, res) => {
//   try {
//     const project = await Project.find({}).populate("contractor");
//     if (project.length === 0) {
//       return res.status(404).json({ error: "No projects" });
//     }
//     res.status(200).json({ project });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.get("/", async (req, res) => {
//     try {
//       if (!req.contractor || !req.contractor._id) {
//         return res.status(401).json({ error: "Unauthorized" });
//       }

//       const contractorId = req.contractor._id;
//       const projects = await Project.find({ contractor: contractorId }).populate("contractor");

//       if (projects.length === 0) {
//         return res.status(404).json({ error: "No projects found" });
//       }

//       res.status(200).json({ projects });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

//* Get a single project
router.get("/:projectId", async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId).populate("contractor");
    if (project === null) {
      return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      req.body,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete project
router.delete("/:projectId", async (req, res) => {
    try {
      const project = await Project.findById(req.params.projectId);
      
      if (!project) {
        return res.status(404).send("Project not found");
      }
  
      if (!project.contractor.equals(req.contractor._id)) {
        return res.status(403).send("You're not allowed to do that!");
      }
  
      const deletedProject = await Project.findByIdAndDelete(req.params.projectId);
      
      if (!deletedProject) {
        return res.status(404).send("Project could not be deleted");
      }
  
      res.status(200).json(deletedProject);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  module.exports = router;


