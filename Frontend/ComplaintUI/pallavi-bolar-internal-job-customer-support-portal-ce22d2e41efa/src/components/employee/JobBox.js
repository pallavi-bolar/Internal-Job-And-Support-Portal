// JobBox.js
import React, { useState, useEffect } from "react";
import EmployeeService from "../services/EmployeeService"; 
import "./OpenJob.css";
import 'font-awesome/css/font-awesome.min.css';
import { toast } from 'react-toastify';
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const JobBox = ({ jobDetails }) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [applied, setApplied] = useState(false);
    const [application, setApplication] = useState("");
    const [randomIcon, setRandomIcon] = useState(""); // Icon state


    useEffect(() => {
        // Check if the user has already applied for this job
        const checkApplicationStatus = async () => {
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
                const response = await EmployeeService.getJobApplicationStatus(jobDetails.jobId, employeeId.data);
                if (response.data === "You have already applied for this job") {
                    setApplied(true);
                    setApplication("You have already applied for this job");
                } else if (response.data === "Your job application is in progress") {
                    setApplied(true);
                    setApplication("You have already applied for this job");
                }
                else if (response.data === "Your job application has been accepted") {
                    setApplied(true);
                    setApplication("You have already applied for this job");
                } else if (response.data === "Your job application has been rejected,You cannot apply for this job") {
                    setApplied(true);
                    setApplication("You have already applied for this job");
                } else if (response.data === "You have been selected for interview") {
                    setApplied(true);
                    setApplication("You have already applied for this job");
                }
            } catch (error) {
                console.log(error);
            }
        };
        checkApplicationStatus();
    }, [jobDetails.jobId]);

    useEffect(() => {
        // Define an array of employment-related icons
        const employmentIcons = [
            "fa fa-briefcase", // Briefcase icon
            "fa fa-id-card", // ID card icon
            "fa fa-building",//building icon
   
        ];
        // Randomly select an icon from the array
        const randomIndex = Math.floor(Math.random() * employmentIcons.length);
        setRandomIcon(employmentIcons[randomIndex]);
    }, []);

    const applyJob = async (e, jobId) => {
        e.preventDefault();

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
            const response = await EmployeeService.applyForJob(jobId, employeeId.data); // Call the service to apply for the job
            console.log(response.data);
            setApplication(response.data);
            setApplied(true); // Update application status
            if (response.data === 'Application submitted successfully') {
                toast.success('Application submitted successfully', {
                  position: 'top-right',
                  autoClose: 3000,
                });
            }


        } catch (error) {
            console.log(error);
        }
    };

    const getDotColor = () => {
        return applied ? "red" : "green";
    };

    const dotStyle = {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        backgroundColor: getDotColor(),
        display: "inline-block",
        marginLeft: "15px", 
    };

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const truncatedDescription = jobDetails.jobDescription.slice(0, 40); // Get the first 10 characters

    return (
        <div  >
            <div className={`job-box ${expanded ? "expanded" : ""}`} onClick={toggleExpansion} >

            <i className={randomIcon} style={{ fontSize: "20px" }}></i>                <h3 className="text-lg font-semibold" style={{ color: "#872746" }} >
                    {jobDetails.jobTitle}<div style={dotStyle}></div> {/* Red or green dot */}</h3>
                <p className="text-sm text-gray-500" style={{ color: "#872746" }}>{jobDetails.jobLocation}</p>
            </div>
            {expanded && (
                <div >
 {jobDetails.jobDescription.length > 40 ? (
                        <div>
                            <p className="text-lg mt-2">
                                {showFullDescription ? jobDetails.jobDescription : truncatedDescription}
                                {jobDetails.jobDescription.length > 40 && (
                                    <a
                                        href="#"
                                        className="text-blue-500 cursor-pointer"
                                        onClick={toggleDescription}
                                    >
                                        {showFullDescription ? " View Less" : " ... View More"}
                                    </a>
                                )}
                            </p>
                        </div>
                    ) : (
                        <p className="text-lg mt-2">{jobDetails.jobDescription}</p>
                    )}                    
                    <p className="text-lg mt-2">Department: {jobDetails.department}</p>
                    <p className="text-lg mt-2">Qualification: {jobDetails.qualification}</p>
                    <p className="text-lg mt-2">Application Deadline: {new Date(jobDetails.applicationDeadline).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    })}</p>
                    <td className="text-left px-6 py-4 whitespace-nowrap" style={{ fontSize: "20px", color: applied ? (application === "Application submitted successfully" ? "green" : "red") : "inherit" }}>
                        {applied ? (
                            <span >{application}</span>
                        ) : (
                            <button
                                className="text-white font-bold py-2 px-4 rounded button-style"

                                onClick={(e) => applyJob(e, jobDetails.jobId)}
                            >
                                Apply
                            </button>
                        )}
                    </td>
                </div>
            )}
        </div>
    );
};

export default JobBox;
