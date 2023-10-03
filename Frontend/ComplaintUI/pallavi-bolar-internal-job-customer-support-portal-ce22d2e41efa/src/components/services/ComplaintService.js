import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8081/";

class ComplaintService {
  getOpenComplaintsCount() {
    return axios.get(`${API_URL}api/support-assistant/open-complaints/count`, {
      headers: authHeader(),
    });
  }
  async getComplaintsStatusCounts() {
    try {
      const response = await axios.get(
        `${API_URL}api/support-assistant/complaints/status-counts`,
        {
          headers: authHeader(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
      throw error;
    }
  }

  searchComplaints(searchBy, searchValue) {
    let searchUrl = "";

    if (searchBy === "ID") {
      searchUrl = `${API_URL}api/complaints/employee/${searchValue}`;
    } else if (searchBy === "Name") {
      searchUrl = `${API_URL}api/complaints/employeeByName/${encodeURIComponent(
        searchValue
      )}`;
    }

    return axios.get(searchUrl, { headers: authHeader() });
  }

  getOpenComplaints() {
    return axios.get(`${API_URL}api/support-assistant/open-complaints`, {
      headers: authHeader(),
    });
  }

  getComplaintWithEmployeeInfo(complaintId) {
    const url = `${API_URL}api/support-assistant/complaints-with-employee-info?complaintId=${complaintId}`;
    return axios.get(url, { headers: authHeader() });
  }

  async getComplaintsByStatus(status) {
    try {
      const response = await axios.get(
        `${API_URL}api/support-assistant/complaints/status/${status}`,
        {
          headers: authHeader(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching complaints by status:", error);
      throw error;
    }
  }

  async updateComplaintStatus(complaintId, newStatus) {
    try {
      const response = await axios.put(
        `${API_URL}api/support-assistant/complaints/${complaintId}/update-status?status=${newStatus}`,
        null,
        { headers: authHeader() }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getComplaintByComplaintId(complaintId) {
    try {
      const response = await axios.get(
        `${API_URL}api/support-assistant/complaints/${complaintId}`,
        {
          headers: authHeader(),
        }
      );
      console.log("Full API Response:", response);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  async addComment(complaintId, comment) {
    try {
      console.log("Sending request to add comment...");
      console.log("complaintid:", complaintId);
      console.log("comment:", comment);
      console.log("jwt", authHeader());

      const url = `${API_URL}api/support-assistant/complaints/${complaintId}/add-comment?comment=${encodeURIComponent(
        comment
      )}`;

      const response = await axios.put(url, null, { headers: authHeader() });
      console.log("Response received:", response);
      return response;
    } catch (error) {
      console.error("Error posting comment:", error);
      throw error;
    }
  }

  async createFAQ(question, answer) {
    try {
      const response = await axios.post(
        `${API_URL}api/faqs/create-faqs`,
        {
          question: question,
          answer: answer,
        },
        {
          headers: authHeader(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating FAQ:", error);
      throw error;
    }
  }

  async fetchAllFaqs() {
    try {
      const response = await axios.get(`${API_URL}api/faqs/all-faqs`);
      return response.data;
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      throw error;
    }
  }
}
const complaintService = new ComplaintService();

export default complaintService;
