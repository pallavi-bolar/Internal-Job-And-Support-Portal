import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './pieChart.css'; 

const PieChart = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [data, setData] = useState({});

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:8081/api/job-applications/status-count')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseData) => {
        if (!responseData) {
          throw new Error('Response data is empty');
        }
        setData(responseData); // Update the state with the fetched data
        console.log(responseData);
      })
      .catch((error) => {
        console.error('Error fetching status counts:', error);
      });
  }, []);

  useEffect(() => {
    if (chartContainer.current && data) {
      // Destroy the previous chart (if it exists)
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create a new chart
      chartInstance.current = new Chart(chartContainer.current, {
        type: 'pie',
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              data: Object.values(data),
              backgroundColor: [
                'rgb(242, 170, 192)',
                'rgb(214, 148, 192)',
                'rgb(170, 131, 209)',
                'rgb(109, 111, 188)',
                'rgb(104, 169, 197)',
                'rgb(146, 199, 198)',
              ],
            },
          ],
        },
      });
    }

    // Clean up the chart when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="chart-container">
     
      <div className="chart-title">Job Application Status</div>
      <canvas ref={chartContainer} className="chart-canvas" />

     
    </div>
  );
};

export default PieChart;
