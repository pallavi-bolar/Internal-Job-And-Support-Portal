import React, { useEffect, useState } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";
import "./OpenComplaintsPage.css";
import { useNavigate } from "react-router-dom";
import ComplaintService from "../services/ComplaintService";

function OpenComplaintsPage() {
  const navigate = useNavigate();
  const [openComplaints, setOpenComplaints] = useState([]);

  useEffect(() => {
    const fetchOpenComplaints = async () => {
      try {
        const response = await ComplaintService.getOpenComplaints();
        const openComplaints = response.data;
        setOpenComplaints(openComplaints);
      } catch (error) {
        console.error("Error fetching open complaints:", error);
      }
    };

    fetchOpenComplaints();
  }, []);

  const handleEditButtonClick = async (complaintId) => {
    if (complaintId) {
      try {
        const response = await ComplaintService.getComplaintWithEmployeeInfo(
          complaintId
        );
        const complaintData = response.data[0];
        navigate(`/complaint/${complaintId}`, {
          state: { complaint: complaintData },
        });
      } catch (error) {
        console.error("Error fetching complaint details:", error);
      }
    } else {
      console.error("Invalid complaintId:", complaintId);
    }
  };

  return (
    <div className="temp">
      <div className="breadcrumb">
        <MDBBreadcrumb>
          <MDBBreadcrumbItem>
            <a
              href="/support-dashboard"
              className="text-reset custom-breadcrumb-link"
            >
              Home
            </a>
          </MDBBreadcrumbItem>
          <MDBBreadcrumbItem active className="custom-breadcrumb-active">
            Open Complaints
          </MDBBreadcrumbItem>
        </MDBBreadcrumb>
      </div>
      <div className="open-header">
        <span className="open-text">Open Complaints</span>
      </div>
      <div>
        <MDBTable align="middle" bordered className="open-table-style">
          <MDBTableHead>
            <tr>
              <th scope="col">
                <b>Complaint ID</b>
              </th>
              <th scope="col">
                <b>Subject</b>
              </th>
              <th scope="col">
                <b>Complaint Date</b>
              </th>
              <th scope="col">
                <b>Complaint Status</b>
              </th>
              <th scope="col">
                <b>Actions</b>
              </th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {openComplaints.map((complaint) => (
              <tr key={complaint.complaintId}>
                <td>{complaint.complaintId}</td>
                <td>{complaint.subject}</td>
                <td>{complaint.complaintDate}</td>
                <td>{complaint.complaintStatus}</td>
                <td>
                  <MDBBtn
                    color="primary"
                    size="sm"
                    onClick={() => handleEditButtonClick(complaint.complaintId)}
                    className="action-button"
                  >
                    Edit
                  </MDBBtn>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </div>
  );
}

export default OpenComplaintsPage;
