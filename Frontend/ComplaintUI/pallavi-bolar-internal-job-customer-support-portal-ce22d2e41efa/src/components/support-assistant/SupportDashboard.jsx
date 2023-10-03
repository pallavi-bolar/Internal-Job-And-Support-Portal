import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import "./SupportDashboard.css";
import { useNavigate } from "react-router-dom";
import ComplaintService from "../services/ComplaintService";
import { Chart } from "react-google-charts";
import Tabs from "./Tabs";

function SupportDashboard() {
  const navigate = useNavigate();
  const [selectedSearchBy, setSelectedSearchBy] = useState("ID");
  const [searchValue, setSearchValue] = useState("");
  const [openComplaintsCount, setOpenComplaintsCount] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [searchErrorMessage, setSearchErrorMessage] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchButtonStyle, setSearchButtonStyle] = useState({
    width: "120px",
  });
  const [setCustomerNameDropdownSelected] = useState(false);

  const [pieChartData, setPieChartData] = useState([
    ["Status", "Count"],
    ["Open", 0],
    ["Resolved", 0],
    ["Closed", 0],
    ["Under Review", 0],
  ]);

  const [activeTab, setActiveTab] = useState("Open");

  useEffect(() => {
    ComplaintService.getOpenComplaintsCount()
      .then((response) => {
        setOpenComplaintsCount(response.data);
      })
      .catch((error) => {
        console.error("Error fetching open complaints count:", error);
      });

    // Fetch pie chart data
    ComplaintService.getComplaintsStatusCounts()

      .then((response) => {
        const { OPENED, RESOLVED, CLOSED, UNDER_REVIEW } = response;

        // Update pie chart data
        setPieChartData([
          ["Status", "Count"],
          ["Open", OPENED],
          ["Resolved", RESOLVED],
          ["Closed", CLOSED],
          ["Under Review", UNDER_REVIEW],
        ]);
      })
      .catch((error) => {
        console.error("Error fetching pie chart data:", error);
      });
  }, []);

  const handleSearchByChange = (searchBy) => {
    setSelectedSearchBy(searchBy);
    setSearchValue("");
    setSearchClicked(false); // Reset searchClicked to false
    setCustomerNameDropdownSelected(searchBy === "Name");
    // Calculate the button width based on the length of the selected option
    const buttonWidth = searchBy === "Name" ? 160 : 120;

    // Update the inline style of the button
    setSearchButtonStyle({ width: `${buttonWidth}px` });
  };

  const handleSearch = () => {
    ComplaintService.searchComplaints(selectedSearchBy, searchValue)
      .then((response) => {
        setSearchResults(response.data);
        setSearchErrorMessage("");
        setSearchClicked(true);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            setSearchResults([]);
            setSearchErrorMessage("Complaint not found");
          } else if (error.response.status === 404) {
            setSearchResults([]);
            setSearchErrorMessage("Employee not found");
          }
        } else {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
          setSearchErrorMessage("An error occurred");
        }
      });
  };

  const handleOpenButtonClick = async (complaintId) => {
    if (complaintId) {
      ComplaintService.getComplaintWithEmployeeInfo(complaintId)
        .then((response) => {
          const complaintData = response.data[0];
          navigate(`/complaint/${complaintId}`, {
            state: { complaint: complaintData },
          });
        })
        .catch((error) => {
          console.error("Error fetching complaint details:", error);
        });
    } else {
      console.error("Invalid complaintId:", complaintId);
    }
  };

  const handleViewButtonClick = async () => {
    navigate("/open-complaints");
  };

  const handleChartSelect = (chart) => {
    if (chart.chartWrapper) {
      const selectedRow = chart.chartWrapper.getChart().getSelection()[0].row;
      if (selectedRow >= 0) {
        const selectedStatus = pieChartData[selectedRow + 1][0]; // +1 to skip the header row
        setActiveTab(selectedStatus);
      }
    }
  };

  return (
    <div className="background gradient-background">
      <div className="support-header">
        <img
          src="./onlylogo.png"
          alt="logo"
          style={{ height: "40px", width: "50px" }}
        />
        <span className="support-colored-text">Axis Bank</span>
        <span className="support-bold-text">Customer Support Dashboard</span>
        <span className="support-colored-text">|&nbsp;DilSe Open</span>
      </div>
      <div className="support-bg-image">
        <img
          src="cs-new.jpg"
          alt="Background"
          style={{
            position: "absolute",
            width: "100%",
            height: "500px",
            objectFit: "cover",
            zIndex: "-1",
            top: "0",
            objectPosition: "left top",
          }}
        />
        <div className="support-card-container">
          <MDBCard className="w-70">
            <div className="card-content">
              <div className="card-title-and-button">
                <MDBCardTitle className="card-title">
                  <b>{`${openComplaintsCount} Open Complaints `}</b>
                </MDBCardTitle>
                <div className="card-info">
                  <button
                    className="card-button"
                    onClick={handleViewButtonClick}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </MDBCard>
        </div>
      </div>
      {/* Google Pie Chart */}
      <div className="pie-chart-container">
        <p className="chart-title">Complaint Status Count</p>
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={pieChartData}
          options={{
            pieSliceText: "none",
          }}
          chartEvents={[
            {
              eventName: "select",
              callback: handleChartSelect,
            },
          ]}
        />
      </div>
      <div className="tabs-container">
        <Tabs activeTab={activeTab} onTabClick={setActiveTab} />
      </div>
      <p className="search-title">Search Complaints By ID / Name</p>
      <div className="search-container">
        <div className="search-components">
          <MDBDropdown className="search-dropdown">
            <MDBDropdownToggle
              className="search-dropdown-toggle"
              style={searchButtonStyle}
              onClick={() => {
                handleSearchByChange("ID");
                setCustomerNameDropdownSelected(false);
              }}
            >
              {`Search By ${selectedSearchBy}`}
            </MDBDropdownToggle>
            <MDBDropdownMenu className="dropdown-menu-end">
              <MDBDropdownItem
                className="custom-dropdown-item"
                onClick={(e) => {
                  e.preventDefault();
                  handleSearchByChange("ID");
                }}
              >
                ID
              </MDBDropdownItem>
              <MDBDropdownItem
                link
                className="custom-dropdown-item"
                onClick={(e) => {
                  e.preventDefault();
                  handleSearchByChange("Name");
                }}
              >
                Name
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>

          <input
            type="text"
            placeholder={`Search by ${selectedSearchBy}`}
            className="search-input"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <MDBBtn
            color="primary"
            className="search-button"
            onClick={handleSearch}
          >
            Search
          </MDBBtn>
        </div>
      </div>
      <div className="table-container">
        {searchClicked && searchErrorMessage ? (
          <p className="no-complaints-found">
            {searchErrorMessage === "Complaint not found"
              ? "Complaint not found"
              : searchErrorMessage === "Employee not found"
              ? "Employee not found"
              : null}
          </p>
        ) : searchClicked ? (
          <MDBTable align="middle" bordered className="search-complaints-table">
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
              {searchResults.map((complaint) => (
                <tr key={complaint.complaintId}>
                  <td>{complaint.complaintId}</td>
                  <td>{complaint.subject}</td>
                  <td>{complaint.complaintDate}</td>
                  <td>{complaint.complaintStatus}</td>
                  <td>
                    {complaint.complaintStatus !== "CLOSED" && (
                      <MDBBtn
                        color="primary"
                        size="sm"
                        onClick={() =>
                          handleOpenButtonClick(complaint.complaintId)
                        }
                        className="action-button"
                      >
                        Open
                      </MDBBtn>
                    )}
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        ) : null}
      </div>
    </div>
  );
}

export default SupportDashboard;
