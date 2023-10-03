import axios from "axios";
import authHeader from "./authHeader";
import { ThemeProvider } from "react-bootstrap";

const API_URL = "http://localhost:8081/";

class HRService {
  // Method for registering a new employee

  async registerEmployee(employeeData) {
    console.log(employeeData);
    console.log(authHeader());
    try {
      const response = await axios.post(
        `${API_URL}api/employees/registerEmployee`,
        {
          ...employeeData,
        },
        {
          headers: authHeader(),
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error while registering employee", error);
      throw error;
    }
  }

  // Method for updating job application status
  async updateJobApplicationStatus(employeeId, applicationId, newStatus) {
    try {
      const response = await axios.put(
        `${API_URL}api/job-applications/update-status`,
        null, // You can pass data here if required

        {
          params: {
            employeeId: employeeId,
            applicationId: applicationId,
            newStatus: newStatus,
          },
          headers: authHeader(), // Include authentication headers
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating job application status:", error);
      throw error;
    }
  }

  // Method for fetching employees with optional search term
  async fetchEmployees(searchTerm = "") {
    try {
      let url = `${API_URL}api/employees/viewAllEmployees`;

      if (searchTerm) {
        if (!isNaN(searchTerm)) {
          // Exclude headers for this specific request
          const response = await axios.get(
            `${API_URL}api/employees/${searchTerm}`
          );
          return [response.data];
        } else {
          url = `${API_URL}api/employees/searchByName?name=${searchTerm}`;
        }
      }

      // Include authentication headers for other requests
      const response = await axios.get(url, {
        headers: authHeader(),
      });

      const data = response.data;

      if (Array.isArray(data)) {
        return data;
      } else if (data) {
        return [data];
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  }

  // Method for creating job details with headers
  async createJobDetails(formData, formattedDate) {
    console.log(formData);
    console.log("formattedDate", formattedDate);
    console.log(authHeader());
    try {
      const response = await axios.post(
        `${API_URL}api/job-details/createJobDetails`,
        {
          ...formData,
          applicationDeadline: formattedDate,
        },
        {
          headers: authHeader(), // Include authentication headers
        }
      );
      return response;
    } catch (error) {
      console.error("Error while adding job details:", error);
      throw error;
    }
  }

  // Method for fetching all job details without headers
  async fetchJobDetails() {
    try {
      const response = await axios.get(
        `${API_URL}api/job-details/viewAllJobDetails`
      );
      return response.data; // Return the job details data
    } catch (error) {
      console.error("Error fetching job details:", error);
      throw error;
    }
  }

  // Method for deleting job details with headers
  async deleteJobDetails(jobId) {
    console.log("jobid", jobId);
    console.log("jwt", authHeader());
    try {
      await axios.delete(`${API_URL}api/job-details/${jobId}`, {
        headers: authHeader(), // Include authentication headers
      });

      return true; // Indicate success
    } catch (error) {
      console.error("Error deleting job details:", error);
      throw error;
    }
  }

 
  static updateJobDetails = async (jobId, formData, formattedDate) => {
    try {
      const response = await axios.put(
        `/api/job-details/updateJobDetails/${jobId}`,
        {
          ...formData,
          applicationDeadline: formattedDate,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export default new HRService();
