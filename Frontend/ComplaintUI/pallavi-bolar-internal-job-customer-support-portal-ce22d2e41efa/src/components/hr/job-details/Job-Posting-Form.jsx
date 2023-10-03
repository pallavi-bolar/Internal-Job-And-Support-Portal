import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Form.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HRService from "../services/HRService";

function Form() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    department: "",
    jobLocation: "",
    qualification: "",
    applicationDeadline: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().slice(0, 10);
    return formattedDate;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formattedDate = formatDate(formData.applicationDeadline);

      const response = await HRService.createJobDetails(
        formData,
        formattedDate
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Job details added successfully");
      } else {
        toast.error("Failed to add job details");
      }
    } catch (error) {
      console.error("Error adding job details:", error);
      toast.error("An error occurred while adding job details");
    }
  };

  const handleClear = () => {
    setFormData({
      jobTitle: "",
      jobDescription: "",
      department: "",
      jobLocation: "",
      qualification: "",
      applicationDeadline: "",
    });
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="container">
      <h1 className="jobHeading">Enter Job Openings Here!</h1>
      <form className="job-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="jobTitle" className="form-label">
                Job Title
              </label>
              <input
                type="textarea"
                className="form-control"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                style={{ margin: 0 }}
                required
                placeholder="Enter Job Title"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="jobDescription" className="form-label">
                Job Description
              </label>
              <textarea
                className="form-control"
                id="jobDescription"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleInputChange}
                // rows="1"
                required
                placeholder="Enter Job Description"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="department" className="form-label">
                Department
              </label>
              <input
                type="textarea"
                className="form-control"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                style={{ margin: 0 }}
                required
                placeholder="Enter Department"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="jobLocation" className="form-label">
                Job Location
              </label>
              <input
                type="textarea"
                className="form-control"
                id="jobLocation"
                name="jobLocation"
                value={formData.jobLocation}
                onChange={handleInputChange}
                style={{ margin: 0 }}
                required
                placeholder="Enter Job Location"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="qualification" className="form-label">
                Qualification
              </label>
              <input
                type="textarea"
                className="form-control"
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                style={{ margin: 0 }}
                required
                placeholder="Enter Required Qualification"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="applicationDeadline" className="form-label">
                Application Deadline
              </label>
              <input
                type="date"
                className="form-control"
                id="applicationDeadline"
                name="applicationDeadline"
                min={today}
                value={formData.applicationDeadline}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="submitbtn">
          Add Job Details
        </button>
        <button type="button" className="clearbtn" onClick={handleClear}>
          Clear
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Form;
