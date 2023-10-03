import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import './Dashboard.css';

const GenderDistributionChart = () => {
  const [data, setData] = useState({
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Number of Employees',
        data: [0, 0],
        backgroundColor: [ 'rgba(147, 59, 236, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  });

  useEffect(() => {
    fetch('http://localhost:8081/api/employees/filterByGender?gender=male')
      .then(response => response.json())
      .then(maleEmployees => {
        fetch('http://localhost:8081/api/employees/filterByGender?gender=female')
          .then(response => response.json())
          .then(femaleEmployees => {
            setData({
              ...data,
              datasets: [
                {
                  ...data.datasets[0],
                  data: [maleEmployees.length, femaleEmployees.length],
                },
              ],
            });
          });
      });
  }, []);

  return (
    <div className="chart-container">
       <div className="chart-title">Male and Female Employee Ratio
</div>
      <Bar
        data={data}
        className="bar-chart"
        options={{
          scales: {
            y: {
              ticks: {
                stepSize: 5, 
                beginAtZero: true,
                callback: function(value, index, values) {
                  return Math.round(value); 
                }
              }
            }
          }
        }}
      />
    </div>
  );
};

export default GenderDistributionChart;



 
