// import { format, parseISO, isToday, isBefore, isAfter } from "date-fns";

// // Format date for display (DD/MM/YYYY)
// export const formatDateForDisplay = (dateString) => {
//   if (!dateString) return "N/A";
//   const date = parseISO(dateString);
//   return format(date, "dd/MM/yyyy");
// };

// // Format date for MongoDB (YYYY-MM-DD)
// export const formatDateForDB = (dateString) => {
//   if (!dateString) return "";
//   const [day, month, year] = dateString.split("/");
//   const date = new Date(`${year}-${month}-${day}`);
//   return format(date, "yyyy-MM-dd");
// };

// // Determine the phase status based on the current date, start date, and end date
// export const determinePhaseStatus = (startDate, endDate) => {
//   const today = new Date();

//   if (isBefore(today, startDate)) {
//     return "Not Started";
//   } else if (
//     isToday(today) ||
//     (isAfter(today, startDate) && isBefore(today, endDate))
//   ) {
//     return "In Progress";
//   } else {
//     return "Completed";
//   }
// };

// import { format, parseISO, isToday, isBefore, isAfter } from "date-fns";

// // Format date for display (DD/MM/YYYY)
// export const formatDateForDisplay = (dateString) => {
//   if (!dateString) return "N/A";
//   const date = parseISO(dateString);
//   return format(date, "dd/MM/yyyy");
// };

// // Format date for MongoDB (YYYY-MM-DD)
// export const formatDateForDB = (dateString) => {
//   if (!dateString) return "";
//   const [day, month, year] = dateString.split("/");
//   if (day && month && year) {
//     const formattedDate = new Date(`${year}-${month}-${day}`);
//     return isNaN(formattedDate.getTime()) ? "" : format(formattedDate, "yyyy-MM-dd");
//   }
//   return ""; // Return empty string if date is invalid
// };

// // Convert date for input field (YYYY-MM-DD)
// export const convertToDateForInput = (dateString) => {
//   if (!dateString) return "";
//   const [year, month, day] = dateString.split("-");
//   if (year && month && day) {
//     return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
//   }
//   return ""; // Return empty string if date is invalid
// };

// // Determine the phase status based on the current date, start date, and end date
// export const determinePhaseStatus = (startDate, endDate) => {
//   const today = new Date();

//   if (isBefore(today, startDate)) {
//     return "Not Started";
//   } else if (
//     isToday(today) ||
//     (isAfter(today, startDate) && isBefore(today, endDate))
//   ) {
//     return "In Progress";
//   } else {
//     return "Completed";
//   }
// };

import { format, parseISO, isToday, isBefore, isAfter } from "date-fns";

// Format date for display (DD/MM/YYYY)
export const formatDateForDisplay = (dateString) => {
  if (!dateString) return "N/A";
  const date = parseISO(dateString);
  return format(date, "dd/MM/yyyy");
};

// Format date for MongoDB (YYYY-MM-DD)
export const formatDateForDB = (dateString) => {
  if (!dateString) return "";
  const [day, month, year] = dateString.split("/");
  if (day && month && year) {
    const formattedDate = new Date(`${year}-${month}-${day}`);
    return isNaN(formattedDate.getTime())
      ? ""
      : format(formattedDate, "yyyy-MM-dd");
  }
  return ""; // Return empty string if date is invalid
};

// Convert date for input field (YYYY-MM-DD)
export const convertToDateForInput = (dateString) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  if (year && month && day) {
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  return ""; // Return empty string if date is invalid
};

// Determine the phase status based on the current date, start date, and end date
export const determinePhaseStatus = (startDate, endDate) => {
  const today = new Date();

  if (isBefore(today, startDate)) {
    return "Not Started";
  } else if (
    isToday(today) ||
    (isAfter(today, startDate) && isBefore(today, endDate))
  ) {
    return "In Progress";
  } else {
    return "Completed";
  }
};
