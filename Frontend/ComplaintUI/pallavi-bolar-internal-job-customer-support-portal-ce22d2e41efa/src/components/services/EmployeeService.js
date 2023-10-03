import axios from "axios";
import authHeader from "./authHeader";
import App from "../App";

const API_BASE_URL = "http://localhost:8081/";

class EmployeeService {
  // Add this method to your EmployeeService.js
  setJwtToken(jwtToken) {
    if (jwtToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
    } else {
      // Remove the token from headers if it's not available
      delete axios.defaults.headers.common["Authorization"];
    }
  }

  getAllOpenJobs() {
    return axios.get(
      API_BASE_URL + "api/job-applications/view-open-applications",
      {
        headers: authHeader(),
      }
    );
  }

  getJobApplicationStatus(jobId, employeeId) {
    return axios.get(
      API_BASE_URL +
        `api/job-applications/view-job-application-status/${jobId}/${employeeId}`,
      {
        headers: authHeader(),
      }
    );
  }
  getAllFAQs() {
    return axios.get(API_BASE_URL + "api/faqs/all-faqs");
  }

  registerComplaint(employeeId, complaint) {
    return axios.post(
      API_BASE_URL + "api/complaints/submits/" + employeeId,
      complaint
    );
  }

  trackComplaints(employeeId) {
    return axios.get(API_BASE_URL + "api/complaints/employee/" + employeeId);
  }

  applyForJob(jobId, employeeId) {
    return (
      axios.post(
        API_BASE_URL +
          "api/job-applications/apply-for-job/" +
          jobId +
          "/" +
          employeeId
      ),
      {
        headers: authHeader(),
      }
    );
  }

  trackJobApplication(employeeId) {
    return axios.get(
      API_BASE_URL +
        "api/job-applications/track-applied-applications/" +
        employeeId
    );
  }

  getEmployeeById(employeeId) {
    return axios.get(API_BASE_URL + "api/employees/" + employeeId);
  }
  updateEmployee(employeeId, employee) {
    return axios.put(
      API_BASE_URL + "api/employees/update/" + employeeId,
      employee
    );
  }

  login(employee) {
    return axios.post(API_BASE_URL + "api/employees/login", employee);
  }

  register(user) {
    return axios.post(API_BASE_URL + "users/register", user);
  }

  getSuggetedFaqs(complaintId) {
    return axios.get(
      API_BASE_URL + "api/complaints/suggestedFaqs/" + complaintId
    );
  }

  getEmployeeIdByName(fullName) {
    return axios.get(
      API_BASE_URL + "api/employees/getIdByFullName/" + fullName
    );
  }
}

export default new EmployeeService();
