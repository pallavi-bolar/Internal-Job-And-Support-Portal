import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import "./ManageEmployeeProfile.css"; 
import { faPencilAlt, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";




const ManageEmployeeProfile = () => {
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

    const [errors, setErrors] = useState({
        emailId: "",
        phoneNo: "",
        fullName: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedEmployee = { ...employee, [name]: value };

        // Email validation
        if (name === "emailId") {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
            if (!emailPattern.test(value)) {
                setErrors((prevErrors) => ({ ...prevErrors, emailId: "Invalid email format" }));
            } else {
                // Split the email address into user and domain parts
                const [user, domain] = value.split('@');
        
                // Check domain validity
                const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!domainPattern.test(domain)) {
                    setErrors((prevErrors) => ({ ...prevErrors, emailId: "Invalid email format" }));
                } else {
                    // Check TopLayerDomain validity
                    const tld = domain.split('.').pop().toLowerCase(); // Get the TLD
                    const validTLDs = ['com', 'org', 'net', 'gov', 'co','in']; 
                    if (!validTLDs.includes(tld)) {
                        setErrors((prevErrors) => ({ ...prevErrors, emailId: "Invalid email format" }));
                    } else {
                        // Email is valid
                        setErrors((prevErrors) => ({ ...prevErrors, emailId: "" }));
                    }
                }
            }
        }
        

        // Phone number validation
        if (name === "phoneNo") {
            const phoneNumberPattern = /^\d{10}$/;
            if (!phoneNumberPattern.test(value)) {
                setErrors((prevErrors) => ({ ...prevErrors, phoneNo: "Invalid phone number format" }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, phoneNo: "" }));
            }
        }

        // Full name validation
        if (name === "fullName") {
            if (value.length < 3) {
                setErrors((prevErrors) => ({ ...prevErrors, fullName: "Name must be at least 3 characters" }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, fullName: "" }));
            }
        }

        setEmployee(updatedEmployee);
    };

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
                toast.success("Profile Details Updated Successfully", {
                    position: "top-right",
                    autoClose: 3000,
                  });
                navigate("/viewProfile");
            })
            .catch((error) => {
                console.log(error);
            });
    };
    




    const editableField = (fieldName) => {
        // Check if the field is editable
        const isEditable = true;
      
        if (isEditable) {
          return (
            <span className="editable-icon">
              <FontAwesomeIcon icon={faPencilAlt} />
            </span>
          );
        }
      
        return null;
      };

      const [showPassword, setShowPassword] = useState(false);

      // Function to toggle password visibility
      const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };

      const renderPasswordVisibilityToggle = () => {
        return (
          <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </span>
        );
      };
    
    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Manage Profile</h1>
            </div>
            <div className="profile-form" style={{background:"white"}}>
                {/* Employee ID */}
                <div className="profile-field">
                    <label>Employee ID</label>
                    <input
                        type="text"
                        name="employeeId"
                        value={employee.employeeId}
                        readOnly
                    />
                </div>

                {/* Profile Status */}
                <div className="profile-field">
                    <label>Profile Status</label>
                    <input
                        type="text"
                        name="profileStatus"
                        value={employee.profileStatus}
                        readOnly
                    />
                </div>

                {/* Full Name */}
                <div className="profile-field">
                    <label>Full Name
                    {editableField("fullName")}
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={employee.fullName}
                        onChange={(e) => handleChange(e)}
                        className={errors.fullName ? "error" : ""}
                    />
                    {errors.fullName && (
                        <p className="error-message">{errors.fullName}</p>
                    )}
                </div>

                {/* Email ID */}
                <div className="profile-field">
                    <label>Email ID
                    {editableField("emailId")}
                    </label>
                    <input
                        type="email"
                        name="emailId"
                        value={employee.emailId}
                        onChange={(e) => handleChange(e)}
                        className={errors.emailId ? "error" : ""}
                    />
                    {errors.emailId && (
                        <p className="error-message">{errors.emailId}</p>
                    )}
                </div>

                {/* Phone No */}
                <div className="profile-field">
                    <label>Phone No
                    {editableField("phoneNo")}
                    </label>
                    <input
                        type="tel"
                        name="phoneNo"
                        value={employee.phoneNo}
                        onChange={(e) => handleChange(e)}
                        className={errors.phoneNo ? "error" : ""}
                    />
                    {errors.phoneNo && (
                        <p className="error-message">{errors.phoneNo}</p>
                    )}
                </div>

                {/* Gender */}
<div className="profile-field">
    <label>Gender</label>
    <div className="radio-group">
        <label>
            <input
                type="radio"
                name="gender"
                value="Male"
                checked={employee.gender === "Male"}
                onChange={(e) => handleChange(e)}
            />
            Male
        </label>
        <label>
            <input
                type="radio"
                name="gender"
                value="Female"
                checked={employee.gender === "Female"}
                onChange={(e) => handleChange(e)}
            />
            Female
        </label>
        <label>
            <input
                type="radio"
                name="gender"
                value="Other"
                checked={employee.gender === "Other"}
                onChange={(e) => handleChange(e)}
            />
            Other
        </label>
    </div>
</div>


                {/* Date Of Birth */}
                <div className="profile-field">
                    <label>Date Of Birth
                    {editableField("dateOfBirth")}
                    </label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={employee.dateOfBirth}
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                {/* Address */}
                <div className="profile-field">
                    <label>Address
                    {editableField("address")}
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={employee.address}
                        onChange={(e) => handleChange(e)}
                    />
                </div>

                {/* Date Of Joining */}
                <div className="profile-field">
                    <label>Date Of Joining</label>
                    <input
                        type="date"
                        name="dateOfJoining"
                        value={employee.dateOfJoining}
                        readOnly
                    />
                </div>

                {/* Role */}
                <div className="profile-field">
                    <label>Role</label>
                    <input
                        type="text"
                        name="role"
                        value={employee.role}
                        readOnly
                    />
                </div>

                {/* Password */}
                <div className="profile-field">
                    <label>Password
                    {editableField("password")}
                    {renderPasswordVisibilityToggle()}
                    </label>
                    <input
                    type={showPassword ? "text" : "password"}
                        name="password"
                        value={employee.password}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
            </div>

            <div className="profile-actions">
                <button
                    onClick={updateEmployee}
                    className="update-button-1"
                >
                    Update
                </button>
                <button
                    onClick={() => navigate("/viewProfile")}
                    className="cancel-button"
                >
                    Cancel
                </button>
            </div>
        </div>
    );


 };

export default ManageEmployeeProfile;
