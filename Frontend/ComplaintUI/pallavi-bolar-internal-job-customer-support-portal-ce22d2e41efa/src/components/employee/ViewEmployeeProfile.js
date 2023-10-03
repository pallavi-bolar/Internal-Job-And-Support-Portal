import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import './ViewEmployeeProfile.css';
import jwtDecode from "jwt-decode";

const ViewEmployeeProfile = () => {
    const { employeeId } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        employeeId: "",
        fullName: "",
        emailId: "",
        phoneNo: "",
        gender: "",
        dateOfBirth: "",
        address: "",
        dateOfJoining: "",
        password: "",
        profileStatus: "",
        workHistoryList: "",
        skills: "",
        educationDetails: "",
        role: "",

    });



    useEffect(() => {
        const fetchData = async () => {
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
                const employeeIdData = await EmployeeService.getEmployeeIdByName(sub);
                const employeeId = employeeIdData.data;
                console.log(employeeId);

                // Set the JWT token in the headers
                EmployeeService.setJwtToken(jwtToken);
                console.log("Fetching employee with id:", employeeId);

                const response = await EmployeeService.getEmployeeById(employeeId);
                console.log("Fetched employee data:", response.data);
                setEmployee(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [employeeId]);

    const updateEmployee = (e) => {
        e.preventDefault();
        console.log(employee);
        EmployeeService.updateEmployee(employee.employeeId, employee)
            .then((response) => {
                navigate("/updateProfile");
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div style={{ border: "1px solid #e0e0e0" }}>
            <div className="manage-employee-profile-container" >
                <div className="header">
                <img src="/axis-logo.jpg" alt="logo" style={{ height: "70px", paddingLeft: "20px" }} />

                    <span className="colored-text">Hi,</span><span className="bold-text"> {employee.fullName}</span>
                    <img src="/profile-active-1.jpg" alt="logo" style={{ height: "70px", paddingLeft: "20px" }} />

                </div>
                <p className="profile-subtitle">Profile Details</p>
                <div className="profile-form ">
                    <form>
                        <div >

                            <div className="label-border">
                                <div className="label-container">
                                    <label className="profile-label">PROFILE STATUS</label>
                                </div>
                                <div className="value-container">
                                    <span className="profile-value">{employee.profileStatus}</span>
                                </div>
                            </div>


                            <div className="label-border">
                                <div className="label-container">
                                    <label className="profile-label">EMPLOYEE ID</label>
                                </div>
                                <div className="value-container">
                                    <span className="profile-value">{employee.employeeId}</span>
                                </div>
                            </div>
                            <div className="label-border">
                                <div className="label-container">
                                    <label className="profile-label">FULL NAME</label>
                                </div>
                                <div className="value-container">
                                    <span className="profile-value">{employee.fullName}</span>
                                </div>
                            </div>
                            <div className="label-border">
                                <div className="label-container">
                                    <label className="profile-label">EMAIL ID</label>
                                </div>
                                <div className="value-container">
                                    <span className="profile-value">{employee.emailId}</span>
                                </div>
                            </div>
                            <div className="label-border">
                                <div className="label-container">
                                    <label className="profile-label">PHONE NO</label>
                                </div>
                                <div className="value-container">
                                    <span className="profile-value">{employee.phoneNo}</span>
                                </div>
                            </div>
                            <div className="label-border">
                                <div className="label-container">
                                    <label className="profile-label">GENDER</label>
                                </div>
                                <div className="value-container">
                                    <span className="profile-value">{employee.gender}</span>
                                </div>
                            </div>
                            <div className="label-border">
                                <div className="label-container">
                                    <label className="profile-label">DATE OF BIRTH</label>
                                </div>
                                <div className="value-container">
                                    <span className="profile-value">{employee.dateOfBirth}</span>
                                </div>
                            </div>
                            <div className="label-border">
                                <div className="label-container">
                                    <label className="profile-label">ADDRESS</label>
                                </div>
                                <div className="value-container">
                                    <span className="profile-value">{employee.address}</span>
                                </div>
                            </div>
                            <div className="label-border">
                                <div className="label-container">
                                    <label className="profile-label">DATE OF JOINING</label>
                                </div>
                                <div className="value-container">
                                    <span className="profile-value">{employee.dateOfJoining}</span>
                                </div>
                            </div>
                            <div className="label-border">
                                <div className="label-container">
                                    <label className="profile-label">ROLE</label>
                                </div>
                                <div className="value-container">
                                    <span className="profile-value">{employee.role}</span>
                                </div>
                            </div>
                            <div className="label-border">
                                <div className="label-container">
                                    <label className="profile-label">PASSWORD</label>
                                </div>
                                <div className="value-container">
                                    <span className="profile-value">{employee.password.replace(/./g, '•').slice(0, 8)}</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="profile-actions">
                    <button
                        onClick={updateEmployee}
                        className="update-button"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewEmployeeProfile;
