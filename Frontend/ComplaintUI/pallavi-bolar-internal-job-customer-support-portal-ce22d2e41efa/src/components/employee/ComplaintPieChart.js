import React from "react";
import { Pie } from "react-chartjs-2";

const ComplaintPieChart = ({ complaintData }) => {
  const data = {
    labels: ["OPENED", "UNDER REVIEW", "RESOLVED", "CLOSED"],
    datasets: [
      {
        data: [
          complaintData.OPENED,
          complaintData.UNDER_REVIEW,
          complaintData.RESOLVED,
          complaintData.CLOSED,
        ],
        backgroundColor: ["#ff0000", "#ff6600", "#0000cc", "#00cc00"],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true, // Display the legend
        position: "right", // Position the legend to the right
        labels: {
          usePointStyle: true, // Use round dots for colors in legend
          padding: 20, // Add some padding between labels and chart
          
        },
      },
    },
  };

  return (
    <div className="pie-chart-container" style={{ marginLeft: "30px", width: "400px", height: "400px" }}>
      <Pie data={data} options={chartOptions}/>
    </div>
  );
};

export default ComplaintPieChart;
