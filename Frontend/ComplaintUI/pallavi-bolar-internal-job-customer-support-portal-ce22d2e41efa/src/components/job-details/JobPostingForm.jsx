import React, { useState } from "react";
import axios from "axios";
import './JobPostingForm.css';

function JobDetailsComponent() {
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

      const response = await axios.post(
        "http://localhost:8081/api/job-details/createJobDetails",
        {
          ...formData,
          applicationDeadline: formattedDate,
        }
      );
      alert("Job details added successfully");

      setFormData({
        jobTitle: "",
        jobDescription: "",
        department: "",
        jobLocation: "",
        qualification:"",
        applicationDeadLine: "",
      });
    } catch (error) {
      console.error("Error adding job details:", error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="title">Enter Job Openings Here!</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-column">
            <label>Job Title:</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="Enter Job Title:"
              required
        
            />

            <label>Department:</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              placeholder="Enter Department"
              required
            
            />

            <label>Qualification:</label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
              placeholder="Enter Qualification"
              required
      
            />
          </div>

          <div className="form-column">
            <label>Job Description:</label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              placeholder="Enter Job Description"
              required
        
            />

            <label>Location:</label>
            <input
              type="text"
              name="jobLocation"
              value={formData.jobLocation}
              onChange={handleInputChange}
              placeholder="Enter Job Location"
              required
            
            />

            <label>Application Deadline:</label>
            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleInputChange}
              placeholder="Enter Job Application Deadline"
              required
         
            />
          </div>
        </div>

        <br />
        <button type="submit">Add Job Details</button>
      </form>
    </div>
  );
}

export default JobDetailsComponent;


