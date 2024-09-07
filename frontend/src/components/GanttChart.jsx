// GanttChart.jsx

import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { fetchPhases } from "../services/apiPhase";
import { projectDetailsLoad } from "../services/apiProject";
import { parseISO } from "date-fns";

const GanttChart = ({ token }) => {
  const [phases, setPhases] = useState([]);
  const [projectDetails, setProjectDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch phases data
        const phasesData = await fetchPhases(token);
        console.log("Phases data:", phasesData);

        if (Array.isArray(phasesData)) {
          setPhases(phasesData);
        } else {
          setError("Invalid data format received for phases.");
        }

        // Fetch project details
        const projectData = await projectDetailsLoad(token);
        console.log("Project details data:", projectData);

        if (projectData) {
          setProjectDetails(projectData[0]); // Assuming you're fetching one project
        } else {
          setError("Invalid data format received for project details.");
        }
      } catch (error) {
        setError("Failed to load data.");
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, [token]);

  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];

  // Parse project start and end dates
  const projectStartDate = projectDetails
    ? parseISO(projectDetails.startDate)
    : new Date();
  const projectEndDate = projectDetails
    ? parseISO(projectDetails.endDate)
    : new Date();

  const rows = [
    [
      "Project Schedule", // Task ID
      "Full Project Schedule", // Task Name
      "Project", // Resource
      projectStartDate, // Start Date
      projectEndDate, // End Date
      null, // Duration
      null, // Percent Complete
      null, // Dependencies
    ],
    ...phases.map((phase) => {
      const startDate = parseISO(phase.startDate);
      const endDate = parseISO(phase.endDate);
      const phaseNames = `${phase.phaseName || ""} | ${phase.task || ""}`;

      return [
        phase._id, // Task ID
        phaseNames, // Task Name
        "Phase", // Resource
        startDate, // Start Date
        endDate, // End Date
        null, // Duration
        "Check with contractor", // Percent Complete
        null, // Dependencies
      ];
    }),
  ];

  const data = [columns, ...rows];

  const options = {
    height: 350,
    gantt: {
      trackHeight: 30,
      criticalPathEnabled: false,
      labelStyle: {
        fontName: "Source Sans 3",
        fontSize: 14,
        color: "white",
      },
      palette: [
        {
          color: "#f2709c",
          dark: "#d32f2f",
          light: "#ffcdd2",
        },
        // {
        //   color: "#81c784",
        //   dark: "#388e3c",
        //   light: "#c8e6c9",
        // },
        {
          color: "#64b5f6",
          dark: "#1976d2",
          light: "#bbdefb",
        },
        {
          color: "#ffb74d",
          dark: "#f57c00",
          light: "#ffe0b2",
        },
      ],
    },
    backgroundColor: {
      fill: "#263238",
    },
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Chart
      chartType="Gantt"
      width="100%"
      height="50%"
      data={data}
      options={options}
    />
  );
};

export default GanttChart;

// import React, { useEffect, useState } from "react";
// import { Chart } from "react-google-charts";
// import { fetchPhases } from "../services/apiPhase";
// import { parseISO } from "date-fns";

// const GanttChart = ({ token }) => {
//   const [phases, setPhases] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadPhases = async () => {
//       try {
//         const phasesData = await fetchPhases(token);
//         console.log("Phases data:", phasesData);
//         if (Array.isArray(phasesData)) {
//           setPhases(phasesData);
//           if (phasesData.length > 0) {
//           }
//         } else {
//           setError("Invalid data format received.");
//         }
//       } catch (error) {
//         setError("Failed to load phases.");
//         console.error("Error fetching phases:", error);
//       }
//     };

//     loadPhases();
//   }, [fetchPhases, token]);

//   // https://developers.google.com/chart/interactive/docs/gallery/ganttchart#data-format
//   // https://www.react-google-charts.com/examples/gantt#read-more

//   // Columns of Gantt Chart
//   const columns = [
//     { type: "string", label: "Task ID" },
//     { type: "string", label: "Task Name" },
//     { type: "string", label: "Resource" },
//     { type: "date", label: "Start Date" },
//     { type: "date", label: "End Date" },
//     { type: "number", label: "Duration" },
//     { type: "number", label: "Percent Complete" },
//     { type: "string", label: "Dependencies" },
//   ];

//   // Rows of Gantt Chart
//   const rows = phases.map((phase) => {
//     const startDate = parseISO(phase.startDate);
//     const endDate = parseISO(phase.endDate);
//     const duration = null;
//     const percentComplete = "Check with contractor";
//     const dependencies = null;
//     const phaseNames = `${phase.phaseName || ""} | ${phase.task || ""}`;

//     return [
//       phase._id, // Task ID
//       phase.phaseName, // Task Name
//       phase.task, // Placeholder
//       startDate, // Start Date
//       endDate, // End Date
//       duration, // Duration
//       percentComplete, // Percent Complete
//       dependencies, // Dependencies
//     ];
//   });

//   const data = [columns, ...rows];

//   const options = {
//     height: 350,
//     gantt: {
//       trackHeight: 30,
//       labelStyle: {
//         fontName: "Source Sans 3",
//         fontSize: 14, // Font size
//         color: "white",
//       },
//     },

//     backgroundColor: {
//       fill: "#263238",
//     },
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }
//   return (
//     <Chart
//       chartType="Gantt"
//       width="100%"
//       height="50%"
//       data={data}
//       options={options}
//     />
//   );
// };

// export default GanttChart;
