import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HRService from "../services/HRService";
import "./RegisterEmployee.css";


function EmployeeForm() {
  const [employeeData, setEmployeeData] = useState({
    role: "",
    fullName: "",
    emailId: "",
    phoneNo: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    dateOfJoining: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Phone Number Validation
    if (employeeData.phoneNo.length !== 10) {
      toast.error("Phone number should be 10 digits.");
      return;
    }

    // Email Validation
    if (!employeeData.emailId.endsWith("@gmail.com")) {
      toast.error("Invalid Email! Email must end with @gmail.com");
      return;
    }

    try {
      // Fetch the list of all employees
      const allEmployeesResponse = await HRService.fetchEmployees();
      console.log("all employees response",allEmployeesResponse )
      // Check if the email is unique among employees
      const isEmailUnique = allEmployeesResponse.some(
        (employee) => employee.emailId === employeeData.emailId
      );

      if (isEmailUnique) {
        toast.error("Email is already in use. Please choose a different one.");
      } else {
        // Use the HRService class to register the employee
        const response = await HRService.registerEmployee(employeeData);
        console.log("data", response)
        // Check if the registration was successful
        console.log("response success", response.status)
        if (response.status === 200) {
         toast.success("Employee registered successfully!");
          // Optionally, you can reset the form or navigate to a different page here.
        } 
        else {
          toast.error("Employee registration failed. Please check the data.");
        }
      }
    }catch (error) {
      console.error("Error registering employee:", error);
      console.error("Error response data:", error.response?.data);
      toast.error("An error occurred while registering the employee.");
    }
  };

  return (
    <div className="container">
      <h1 className="empHeading">Employee Registration Form</h1>
      <form className="employee-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
            <label htmlFor="role" className="form-label">
      Employee Role
    </label>
    <select
      className="form-select"
      id="role"
      name="role"
      value={employeeData.role}
      onChange={handleInputChange}
    >
      <option value="">Select Role</option>
      <option value="HR">HR</option>
      <option value="CUSTOMER_SUPPORT">Customer Support</option>
      <option value="CANDIDATE">Candidate</option>
     
    </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
               <input
                 type="textarea" 
                className="form-control"
                id="fullName"
                name="fullName"
                value={employeeData.fullName}
                onChange={handleInputChange}
                style={{margin:0}}
                placeholder="Enter Full Name"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="emailId" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="emailId"
                name="emailId"
                value={employeeData.emailId}
                onChange={handleInputChange}
                placeholder="Enter Email ID"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="phoneNo" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneNo"
                name="phoneNo"
                value={employeeData.phoneNo}
                onChange={handleInputChange}
                placeholder="Enter Phone Number"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                className="form-select"
                id="gender"
                name="gender"
                value={employeeData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="dateOfBirth" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control"
                id="dateOfBirth"
                name="dateOfBirth"
                
                value={employeeData.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            className="form-control"
            id="address"
            name="address"
            value={employeeData.address}
            onChange={handleInputChange}
            rows="1"
            placeholder="Enter Address"
          />
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="dateOfJoining" className="form-label">
                Date of Joining
              </label>
              <input
                type="date"
                className="form-control"
                id="dateOfJoining"
                name="dateOfJoining"
             
                value={employeeData.dateOfJoining}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={employeeData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="registerbtn">
          Register Employee
        </button>
      </form>
      <ToastContainer/>
      
    </div>
  );
}

export default EmployeeForm;
