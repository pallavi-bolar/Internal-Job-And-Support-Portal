import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginNew.css";
import axios from "axios";
import EmployeeService from "../services/EmployeeService";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

const Login = () => {
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailIdChange = (e) => {
    setEmailId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    const employee = {
      emailId: emailId,
      password: password,
    };

    try {
      const response = await EmployeeService.login(employee);
      console.log(response);

      if (response.status === 200) {
        // User logged in successfully, navigate to the desired route

        if (
          employee.emailId === "admin@admin.com" &&
          employee.password === "admin"
        ) {
          navigate("/openJobs");
        } else {
          const { employeeId } = response.data; // Extract employeeId from the response

          // Store employeeId in local storage
          localStorage.setItem("employeeId", employeeId);

          console.log(employeeId);
          // If it is a user, navigate to user homepage
          navigate("/openJobs");
        }
      } else {
        // Login failed, display error message
        setError("Invalid user mailId or password");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid user mailId or password");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div>
      <div className="header">
        <img src="/axis-logo.jpg" alt="logo" style={{ height: "70px" }} />
        <span className="colored-text">Axis Bank</span>
        <span className="bold-text">&nbsp;|&nbsp;Login </span>
      </div>
      <MDBContainer
        fluid
        className="p-4 background-radial-gradient overflow-hidden custom-container"
      >
        <MDBRow>
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center custom-text"
          >
            <img
              src="./login-main.webp"
              alt="Login image"
              className="img-fluid"
            />
          </MDBCol>

          <MDBCol md="4">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong custom-shape-1"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong custom-shape-2"
            ></div>

            <MDBCard className="my-6 bg-glass custom-card">
              <MDBCardBody className="p-5">
                <div className="header">
                  <span className="bold-text">Login Form</span>
                </div>
                <br />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email Id"
                  id="form3"
                  type="text"
                  className="custom-input custom-lg-input"
                  value={emailId}
                  onChange={handleEmailIdChange}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form4"
                  type="password"
                  className="custom-input custom-lg-input"
                  value={password}
                  onChange={handlePasswordChange}
                />

                <MDBBtn
                  className="w-100 mb-4 custom-button custom-lg-button"
                  size="lg"
                  onClick={handleLogin}
                >
                  Login
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Login;
