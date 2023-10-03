import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewJobs.css";
import HRService from "../services/HRService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

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
      const jobDetails = await HRService.fetchJobDetails();
      setJobDetailsList(jobDetails);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  const formatDDMMYYYYDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handleDelete = async (jobId) => {
    try {
      confirmAlert({
        title: "Confirm Deletion",
        message: "Are you sure you want to delete this job details?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              await HRService.deleteJobDetails(jobId);
              toast.success("Job details deleted successfully");
              fetchJobDetails();
            },
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    } catch (error) {
      console.error("Error deleting job details:", error);
    }
  };

  const toggleDescription = (jobId) => {
    const updatedJobDetailsList = jobDetailsList.map((job) => {
      if (job.jobId === jobId) {
        job.showFullDescription = !job.showFullDescription;
      }
      return job;
    });
    setJobDetailsList(updatedJobDetailsList);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobDetailsList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <h2 className="jobHeading">Job Openings</h2>
      <table className="job-table">
        <thead>
          <tr className="table-rows">
            <th className="table-heading">Job ID</th>
            <th className="table-heading">Job Title</th>
            <th className="table-heading">Job Description</th>
            <th className="table-heading">Department</th>
            <th className="table-heading">Job Location</th>
            <th className="table-heading">Qualification</th>
            <th className="table-heading">Application DeadLine</th>
            <th className="table-heading">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((job) => (
            <tr key={job.id}>
              <td className="data">{job.jobId}</td>
              <td className="data">{job.jobTitle}</td>
              <td className="data">
                {job.showFullDescription
                  ? job.jobDescription
                  : `${job.jobDescription.slice(0, 25)}...`}
                {job.jobDescription.length > 25 && (
                  <button
                    className="view-more-button"
                    onClick={() => toggleDescription(job.jobId)}
                  >
                    {job.showFullDescription ? "View Less" : "View More"}
                  </button>
                )}
              </td>
              <td className="data">{job.department}</td>
              <td className="data">{job.jobLocation}</td>
              <td className="data">{job.qualification}</td>
              <td className="data">
                {formatDDMMYYYYDate(job.applicationDeadline)}
              </td>

              <td className="data">
                <button
                  className="delete-button"
                  onClick={() => handleDelete(job.jobId)}
                >
                  Delete
                  {/* <FontAwesomeIcon icon="fa-sharp fa-solid fa-trash" size="2xs" style={{color: "#552028",}} /> */}
                </button>

               
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <div className="pagination">
          <button
            className="paginationbtn"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            className="paginationbtn"
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
