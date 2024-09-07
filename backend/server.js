require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const debug = require("debug")("hoot:server");
const mongoose = require("mongoose");
const cors = require("cors"); // for when frontend and backend port not the same
const path = require("path"); // Import path module to handle file paths

// import routers
const customersRouter = require("./controllers/CustomersController");
const contractorsRouter = require("./controllers/ContractorsController");
const phasesRouter = require("./controllers/PhasesController");
const projectRouter = require("./controllers/ProjectsController");

mongoose.connect(process.env.MONGODB_URI);

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connection.on("connected", () => {
  debug(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const app = express();
const port = process.env.PORT || 3000;

//* Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Serve static files from the frontend build directory
// app.use(express.static(path.join(__dirname, "../frontend/build")));

//* Routes
app.get("/api", (req, res) => {
  res.json({ msg: "hoot" });
});

app.use("/api/customers", customersRouter);
app.use("/api/contractors", contractorsRouter);
app.use("/api/phases", phasesRouter);
// app.use("/api/changeLog", changeLogRouter);
app.use("/api/projects", projectRouter);

// Serve React frontend for any other requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(port, () => {
  debug(`Example app listening on port ${port}`);
});
