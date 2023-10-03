import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import PieChart from "./Piechart";
import GenderDistributionChart from "./Genderchart";
import { faUsers, faTasks } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [jobApplicationCount, setJobApplicationCount] = useState(0);

  useEffect(() => {
    // Fetch the employee count from your Spring Boot backend API
    axios
      .get("http://localhost:8081/api/employees/count")
      .then((response) => {
        setEmployeeCount(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee count:", error);
      });

    // Fetch the job application count from your Spring Boot backend API
    axios
      .get("http://localhost:8081/api/job-details/jobApplicationCount")
      .then((response) => {
        setJobApplicationCount(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job application count:", error);
        if (error.response) {
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
        }
      });
  }, []);

  return (
    <div className="dashboard">
      <header>
        <div className="logo-container">
          <img
            src="axis-innerlogo.png"
            alt="Axis Bank Logo"
            className="axis-bank-logo"
          />
          <h2 className="tagline">
            HR Dashboard | <span className="tagline-heading">Dil Se Open</span>
          </h2>
        </div>
      </header>
      <div className="card-container">
        <div className="card floating-card">
          <div className="card-content">
            <FontAwesomeIcon icon={faUsers} className="icon" />
            <h3>Employees</h3>
            <p>{employeeCount}</p>
          </div>
        </div>

        <div className="card floating-card">
          <div className="card-content">
            <FontAwesomeIcon icon={faTasks} className="icon" />
            <h3>Job Openings</h3>
            <p>{jobApplicationCount}</p>
          </div>
        </div>

        <div className="card floating-card">
          <div className="card-content">
            <img src="comments.svg" alt="Comments Icon" className="icon" />

            <h3>Connect With Us</h3>
            <div>
              <a
                href="https://www.facebook.com/axisbank"
                target="_blank"
                className="custom-link"
              >
                <FontAwesomeIcon icon={faFacebook} /> Facebook
              </a>
            </div>
            <div>
              <a
                href="https://www.linkedin.com/company/axis-bank"
                target="_blank"
                className="custom-link"
              >
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="card custom-card-size">
          <div className="card-body">
            <PieChart />
          </div>
        </div>

        <div className="card custom-card-size">
          <div className="card-body">
            <GenderDistributionChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
