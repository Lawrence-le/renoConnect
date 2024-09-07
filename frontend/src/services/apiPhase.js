const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

//* Create a new phase
export async function createPhase(data, token) {
  const url = `${BACKEND_URL}/api/phases`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export const fetchPhases = async (token) => {
  const url = `${BACKEND_URL}/api/phases`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("No phases found");
      }
      throw new Error("Failed to fetch phases");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching phases:", error.message);
    throw error;
  }
};

//* GET a specific phase by ID
export async function getPhase(phaseId, token) {
  const url = `${BACKEND_URL}/api/phases/${phaseId}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

// //* Update a specific phase by ID
// export async function updatePhase(phaseId, data, token) {
//   const url = `${BASE_URL}/phases/${phaseId}`;
//   try {
//     const response = await fetch(url, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error(error.message);
//     throw error;
//   }
// }

// //* Approve a specific phase by ID
// export async function approvePhase(phaseId, token) {
//   const url = `${BASE_URL}/phases/${phaseId}/approve`;
//   try {
//     const response = await fetch(url, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error(error.message);
//     throw error;
//   }
// }

// //* Reject a specific phase by ID
// export async function rejectPhase(phaseId, token) {
//   const url = `${BASE_URL}/phases/${phaseId}/reject`;
//   try {
//     const response = await fetch(url, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error(error.message);
//     throw error;
//   }
// }

//* Create new changeLog when phase details changes
export async function createChangeLog(phaseId, data, token) {
  const url = `${BACKEND_URL}/api/phases/${phaseId}/changeLog`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Specific phase could not be found");
      }
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating change log entry:", error.message);
    // Optionally, handle specific errors or show user-friendly messages
    throw error;
  }
}

//* Get details on just 1 changeLog detail
export async function getChangeLog(phaseId, changeLogId, token) {
  const url = `${BACKEND_URL}/api/phases/${phaseId}/changeLog/${changeLogId}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("Not found: phaseId is required");
      } else if (response.status === 404) {
        throw new Error("Not found: Phase not found");
      }
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

//* Update reviewStatus and update Phase details with new changeLog that is approved
export async function updatePhase(phaseId, changeLogId, token) {
  const url = `${BACKEND_URL}/api/phases/${phaseId}/changeLog/${changeLogId}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      if (response.status === 404) {
        const responseText = await response.text();
        if (responseText.includes("Phase not found")) {
          throw new Error("Not Found: The specified phase could not be found.");
        } else if (responseText.includes("Change log entry not found")) {
          throw new Error(
            "Not Found: The specified change log entry could not be found."
          );
        } else {
          throw new Error(
            "Not Found: The specified resource could not be found."
          );
        }
      }
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating phase with change log:", error.message);
    throw error;
  }
}

//* Delete a specific phase by ID
export async function deletePhase(phaseId, token) {
  const url = `${BACKEND_URL}/api/phases/delete/${phaseId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Not found: Phase not found");
      }
    }

    return await response.json();
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
