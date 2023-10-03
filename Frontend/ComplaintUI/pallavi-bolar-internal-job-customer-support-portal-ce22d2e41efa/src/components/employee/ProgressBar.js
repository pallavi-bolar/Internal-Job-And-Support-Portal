import React from "react";
import "./ProgressBar.css"; 

const ProgressBar = ({ complaintStatus }) => {
  const getStatusProgress = (status) => {
    // Define the progress for each status
    const progressMap = {
      OPENED: 10, // Set a minimum width (e.g., 10%) for OPENED
      UNDER_REVIEW: 50,
      RESOLVED: 75,
      CLOSED: 100,
    };

    // Get the progress percentage based on the status
    return progressMap[status] || 0;
  };

  const getProgressColor = (status) => {
    // Define colors for each status
    const colorMap = {
      OPENED: "#ff0000", // Red
      UNDER_REVIEW: "#ff6600", // Orange
      RESOLVED: "#0000cc", // Blue
      CLOSED: "#00cc00", // Green
    };

    // Get the color based on the status
    return colorMap[status] || "#000"; // Default to black if status is not recognized
  };

  const complaintProgress = getStatusProgress(complaintStatus);
  const progressBarColor = getProgressColor(complaintStatus);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-details">
        <p
          style={{ color: progressBarColor }}
        >{`COMPLAINT STATUS :  ${complaintStatus}`}</p>
      </div>
      <div className="progress-bar" style={{ backgroundColor: "#D3D3D3" }}>
        <div
          className="progress"
          style={{
            width: `${complaintProgress}%`,
            backgroundColor: progressBarColor,
            height:100
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
