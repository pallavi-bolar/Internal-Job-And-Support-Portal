import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewJobs.css";

const JobDetailsTable = () => {
  const [jobDetailsList, setJobDetailsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  useEffect(() => {
    fetchJobDetails();
  }, []);

  useEffect(() => {
    setCurrentPage(1); 
  }, [jobDetailsList]);

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/job-details/viewAllJobDetails"
      ); 
      setJobDetailsList(response.data);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  const formatISODate = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`http://localhost:8081/api/job-details/${jobId}`);
      alert("Job details deleted successfully");
      fetchJobDetails();
    } catch (error) {
      console.error("Error deleting job details:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobDetailsList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <h2 className="jobHeading">Job Details</h2>
      <table className="empTable">
        <thead>
        <tr>
            <th>Job ID</th>
             <th>Job Title</th>
             <th>Job Description</th>
             <th> Department</th>
             <th>Job Location</th>
             <th>Qualification</th>
             <th>Application DeadLine</th>
             <th>Action</th>
           </tr>
        </thead>
        <tbody>
          {currentItems.map((job) => (
             <tr key={job.id}>
                           <td>{job.jobId}</td>
                         <td>{job.jobTitle}</td>
                         <td>{job.jobDescription}</td>
                            <td>{job.department}</td>
                          <td>{job.jobLocation}</td>
                            <td>{job.qualification}</td>
                            <td>{formatISODate(job.applicationDeadline)}</td>
                            <td>
               <button
                  className="delete-button"
                  onClick={() => handleDelete(job.jobId)}
               >
                 Delete
               </button>
             </td>
                         </tr>
          ))}
        </tbody>
      </table>
      

 <div className="pagination-container">
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentItems.length < itemsPerPage}
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
};

export default JobDetailsTable;


