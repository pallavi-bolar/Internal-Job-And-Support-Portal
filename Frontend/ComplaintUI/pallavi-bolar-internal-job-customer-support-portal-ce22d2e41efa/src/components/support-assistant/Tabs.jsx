import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import "./Tabs.css";
import { useNavigate } from "react-router-dom";
import ComplaintService from "../services/ComplaintService";

const cardStyle = {
  height: "300px",
};

export default function Tabs({ activeTab, onTabClick }) {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const statusMap = {
    Open: "OPENED",
    "Under Review": "UNDER_REVIEW",
    Resolved: "RESOLVED",
    Closed: "CLOSED",
  };

  useEffect(() => {
    const status = statusMap[activeTab];

    const fetchComplaints = async () => {
      try {
        const response = await ComplaintService.getComplaintsByStatus(status);
        setComplaints(response);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, [activeTab, statusMap]);

  const handleViewButtonClick = async (complaintId) => {
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
    <>
      <div className="tabs">
        <MDBCard className="text-center">
          <MDBCardHeader>
            <MDBTabs className="card-header-tabs">
              <MDBTabsItem>
                <MDBTabsLink
                  active={activeTab === "Open"}
                  onClick={() => onTabClick("Open")}
                >
                  Open
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  active={activeTab === "Under Review"}
                  onClick={() => onTabClick("Under Review")}
                >
                  Under Review
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  active={activeTab === "Resolved"}
                  onClick={() => onTabClick("Resolved")}
                >
                  Resolved
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  active={activeTab === "Closed"}
                  onClick={() => onTabClick("Closed")}
                >
                  Closed
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>
          </MDBCardHeader>
          <MDBCardBody className="tabs-card-body">
            <div>
              <MDBRow className="row-cols-1 row-cols-md-3 g-4">
                {complaints && complaints.length > 0 ? (
                  complaints.map((complaint) => {
                    const complaintDate = new Date(complaint.complaintDate);
                    const formattedDate = `${complaintDate.toLocaleDateString()} ${complaintDate.getHours()}:${complaintDate.getMinutes()}`;

                    return (
                      <MDBCol key={complaint.complaintId} className="mb-3">
                        <MDBCard
                          background="light"
                          className="text-blackk"
                          style={cardStyle}
                        >
                          <MDBCardHeader className="tabs-card-header">
                            <MDBCardTitle className="tabs-card-title">
                              {complaint.complaintId}: {complaint.subject}
                            </MDBCardTitle>
                          </MDBCardHeader>
                          <MDBCardBody>
                            <MDBCardText className="tabs-card-text">
                              {complaint.description}
                              <br />
                              Complaint Date: {formattedDate}
                            </MDBCardText>
                          </MDBCardBody>
                          <MDBCardFooter className="tabs-card-footer">
                            <div>
                              <MDBBtn
                                className="tabs-card-button"
                                onClick={() =>
                                  handleViewButtonClick(complaint.complaintId)
                                }
                              >
                                View
                              </MDBBtn>
                            </div>
                          </MDBCardFooter>
                        </MDBCard>
                      </MDBCol>
                    );
                  })
                ) : (
                  <MDBCol>
                    <p>No complaints found.</p>
                  </MDBCol>
                )}
              </MDBRow>
            </div>
          </MDBCardBody>
        </MDBCard>
      </div>
    </>
  );
}
