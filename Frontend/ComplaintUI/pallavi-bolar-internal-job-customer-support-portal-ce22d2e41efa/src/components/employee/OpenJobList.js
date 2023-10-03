import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService"; // Adjust this to your job service
import './OpenJob.css';
import JobBox from "./JobBox";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const OpenJobList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [jobDetails, setJobDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredJobDetails, setFilteredJobDetails] = useState([]);
    const [noMatches, setNoMatches] = useState(false);
    const [employee, setEmployee] = useState([]);
    const [expandedJobIds, setExpandedJobIds] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
const jobsPerPage = 9;
const indexOfLastJob = currentPage * jobsPerPage;
const indexOfFirstJob = indexOfLastJob - jobsPerPage;
const currentJobs = filteredJobDetails.slice(indexOfFirstJob, indexOfLastJob);

const totalPages = Math.ceil(filteredJobDetails.length / jobsPerPage);
const renderPaginationButtons = () => {
    const pageNumbers = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return (
        <div className="pagination" style={{marginBottom:"200px"}}>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          {pageNumbers}
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      );
    };


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // const employeeId = localStorage.getItem("employeeId");
                const jwtToken = localStorage.getItem("jwtToken");
                if (!jwtToken) {
                    // Handle the case when the token is missing or expired
                    // You can redirect the user to the login page or perform other actions
                    // For example:
                    navigate("/login"); // Redirect to the login page
                    return;
                }
                // Decode the JWT token to extract user information
                console.log(jwtToken);
                const decodedToken = jwtDecode(jwtToken);
                console.log(decodedToken);
                const sub = decodedToken.sub;
                console.log(sub);
                const employeeId = await EmployeeService.getEmployeeIdByName(sub);
                console.log(employeeId);

                // Set the JWT token in the headers
                EmployeeService.setJwtToken(jwtToken);


                const resp = await EmployeeService.getEmployeeById(employeeId.data);
                setEmployee(resp.data);

                const response = await EmployeeService.getAllOpenJobs();
                setJobDetails(response.data);
            } catch (error) {
                setJobDetails([]);
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filterJobDetails = () => {
            if (jobDetails && searchTerm.trim() !== "") {
                const filtered = jobDetails.filter(
                    (jobDetail) =>
                        (jobDetail.jobLocation && jobDetail.jobLocation.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (jobDetail.jobTitle && jobDetail.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()))
                );
                setFilteredJobDetails(filtered);
                setNoMatches(filtered.length === 0);
            } else {
                setFilteredJobDetails(jobDetails);
                setNoMatches(false);
            }
        };
        filterJobDetails();
    }, [jobDetails, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    // Function to toggle expansion for a specific job
    const toggleExpansion = (jobId) => {
        if (expandedJobIds.includes(jobId)) {
            // If already expanded, collapse it
            setExpandedJobIds(expandedJobIds.filter((id) => id !== jobId));
        } else {
            // If not expanded, expand it
            setExpandedJobIds([...expandedJobIds, jobId]);
        }
    };



    return (
        
        <div>
            <div  style={{    border:"1px solid #e0e0e0"}}>
                <div className="header">
                <img src="/axis-logo.jpg" alt="logo" style={{height:"70px"}} />

                    <span className="colored-text">&nbsp;&nbsp;Axis Bank&nbsp;</span>
                    <span className="bold-text">Employee Dashboard | </span>
                    <span className="colored-text">&nbsp;DilSe Open</span>
                </div>
                <div className="container mx-auto my-8" >
                    <div className="subheading">
                    <span className="center-text">Welcome Back,</span>
                    <span className="colored-text" style={{ fontSize: "28px" }}>{employee.fullName}</span>
                    </div>
                    <div className="search-bar" >
                        <input
                            type="text"
                            placeholder="Search by Job Title or Location"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="input-search-box"
                        />
                    </div>
                    <div >
                    <div className="grid grid-background"  >
                        {!loading &&
                            (currentJobs.length === 0 ? (
                                noMatches ? (
                                    <div className="no-match" >
                                        No matches to your search
                                    </div>
                                ) : null
                            ) : (
                                currentJobs.map((jobDetail) => (
                                    <div
                                        className={`job-box ${expandedJobIds.includes(jobDetail.jobId) ? "expanded" : ""
                                            }`}
                                        key={jobDetail.jobId}
                                        onClick={() => toggleExpansion(jobDetail.jobId)}
                                    >

                                        <JobBox
                                            jobDetails={jobDetail}

                                        />
                                        
                                    </div>
                                    
                                ))
                            ))}
                            
                    </div>
                    {renderPaginationButtons()}
                    </div>
                </div>
            </div>
        </div>
    );
};



export default OpenJobList;
