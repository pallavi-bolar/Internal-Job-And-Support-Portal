import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";

const ComplaintList = ({ status }) => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch complaints based on the selected status
    fetch(
      `http://localhost:8081/api/support-assistant/complaints/status/${status}`
    )
      .then((response) => response.json())
      .then((data) => {
        setComplaints(data);
      })
      .catch((error) => {
        console.error("Error fetching complaints:", error);
      });
  }, [status]);

  return (
    <div>
      <div>
        {activeTab === "Open" && <ComplaintList status="OPENED" />}
        {activeTab === "Under Review" && (
          <ComplaintList status="UNDER_REVIEW" />
        )}
        {activeTab === "Resolved" && <ComplaintList status="RESOLVED" />}
        {activeTab === "Closed" && <ComplaintList status="CLOSED" />}
      </div>
      {complaints.map((complaint) => (
        <MDBCard
          background="danger"
          className="text-white mb-3"
          key={complaint.id}
        >
          <MDBCardHeader>Header</MDBCardHeader>
          <MDBCardBody>
            <MDBCardTitle>
              ID: {complaint.id} - {complaint.subject}
            </MDBCardTitle>
            <MDBCardText>{complaint.description}</MDBCardText>
          </MDBCardBody>
          <div>
            <MDBBtn>View</MDBBtn>
          </div>
        </MDBCard>
      ))}
    </div>
  );
};

export default ComplaintList;
