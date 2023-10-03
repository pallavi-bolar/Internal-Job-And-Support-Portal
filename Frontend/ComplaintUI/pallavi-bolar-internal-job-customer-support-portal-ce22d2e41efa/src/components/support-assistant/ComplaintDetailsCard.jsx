import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ComplaintService from "../services/ComplaintService";
import CommentCard from "./CommentCard";
import "./ComplaintDetailsCard.css";
import "./Toast.css";
import {
  Box,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";

import { Stepper, Step, StepIcon } from "@chakra-ui/react";

function ComplaintDetailsCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { complaint } = location.state || {};
  const [comments, setComments] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(
    complaint?.complaintStatus
  );
  const steps = [
    { title: "Open", completed: currentStatus === "OPENED" },
    { title: "Under Review", completed: currentStatus === "UNDER_REVIEW" },
    { title: "Resolved", completed: currentStatus === "RESOLVED" },
    { title: "Closed", completed: currentStatus === "CLOSED" },
  ];

  useEffect(() => {
    if (complaint) {
      fetchComments(complaint.complaintId);
    }
  }, [complaint]);

  const fetchComments = async (complaintId) => {
    try {
      const response = await ComplaintService.getComplaintByComplaintId(
        complaintId
      );

      const mappedComments = response.comments.map((comment, index) => ({
        comment: comment,
        commentDate: response.commentDates[index],
      }));

      setComments(mappedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      const response = await ComplaintService.updateComplaintStatus(
        complaint.complaintId,
        newStatus
      );

      if (response.status === 200) {
        setCurrentStatus(newStatus);
        toast.success(`Status Changed to ${newStatus}`, {
          className: "custom-toast",
        });
        navigate("/support-dashboard");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (!complaint) {
    return <div>Loading...</div>;
  }

  // Find the index of currentStatus in the steps array
  const activeStep =
    steps.findIndex((step) => step.title === formatTitle(currentStatus)) + 1;

  function formatTitle(status) {
    switch (status) {
      case "OPENED":
        return "Open";
      case "UNDER_REVIEW":
        return "Under Review";
      case "RESOLVED":
        return "Resolved";
      case "CLOSED":
        return "Closed";
      default:
        return "";
    }
  }

  // Update the steps array to include a "completed" property
  const updatedSteps = steps.map((step, index) => ({
    ...step,
    completed: index + 1 <= activeStep,
  }));

  return (
    <div>
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
          <MDBBreadcrumbItem>
            <a
              href="/open-complaints"
              className="text-reset custom-breadcrumb-link"
            >
              Open Complaints
            </a>
          </MDBBreadcrumbItem>
          <MDBBreadcrumbItem active className="custom-breadcrumb-active">
            Complaints Details
          </MDBBreadcrumbItem>
        </MDBBreadcrumb>
      </div>
      <div className="complaint-card-header">
        <span className="complaint-card-text">Complaint Details</span>
      </div>
      <div className="complaint-center-card">
        <MDBCard className="complaint-custom-card">
          <MDBCardHeader className="cardd-header">
            <span className="complaint-id">
              <b>
                {`Complaint ID - ${complaint.complaintId}: ${complaint.subject}`}
              </b>
            </span>
            <span>
              <MDBDropdown group className="float-end">
                <MDBDropdownToggle className="set-status-button">
                  Set Status
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem
                    link
                    className="set-status-dropdown-item"
                    onClick={() => updateStatus("UNDER_REVIEW")}
                  >
                    UNDER REVIEW
                  </MDBDropdownItem>
                  <MDBDropdownItem
                    link
                    className="set-status-dropdown-item"
                    onClick={() => updateStatus("RESOLVED")}
                  >
                    RESOLVED
                  </MDBDropdownItem>
                  <MDBDropdownItem
                    link
                    className="set-status-dropdown-item"
                    onClick={() => updateStatus("CLOSED")}
                  >
                    CLOSED
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </span>
          </MDBCardHeader>
          <MDBCardBody className="complaint-body">
            <Box
              style={{
                marginTop: "10px",
                marginBottom: "30px",
                marginLeft: "10px",
                marginRight: "30px",
              }}
            >
              <Stepper size="lg" colorScheme="green" index={activeStep}>
                {updatedSteps.map((step, index) => (
                  <Step key={index}>
                    <StepIndicator completed={step.completed}>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <Box flexShrink="0">
                      <StepTitle>{step.title}</StepTitle>
                    </Box>

                    <StepSeparator />
                  </Step>
                ))}
              </Stepper>
            </Box>

            <TableContainer className="complaint-details-table">
              <Table size="md">
                <Tbody>
                  <Tr>
                    <Td>
                      <b>Employee ID</b>
                    </Td>
                    <Td>{complaint.employeeId}</Td>
                    <Td>
                      <b>Employee Name</b>
                    </Td>
                    <Td>{complaint.fullName}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <b>Email ID</b>
                    </Td>
                    <Td>{complaint.emailId}</Td>
                    <Td>
                      <b>Gender</b>
                    </Td>
                    <Td>{complaint.gender}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <b>Phone Number</b>
                    </Td>
                    <Td>{complaint.phoneNo}</Td>
                    <Td>
                      <b>Complaint Status</b>
                    </Td>
                    <Td>{currentStatus}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <b>Complaint Date</b>
                    </Td>
                    <Td>
                      {new Date(complaint.complaintDate).toLocaleString()}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <b>Description</b>
                    </Td>
                    <Td colSpan="2">{complaint.description}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <CommentCard
              complaintId={complaint.complaintId}
              existingComments={comments}
            />
          </MDBCardBody>
        </MDBCard>
      </div>
    </div>
  );
}

export default ComplaintDetailsCard;
