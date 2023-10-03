import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import "./Complaint.css"; 
import ComplaintPieChart from "./ComplaintPieChart";
import jwtDecode from "jwt-decode";


const EmployeeTrackComplaints = () => {
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [noMatches, setNoMatches] = useState(false);
  const [complaintStatusFilter, setComplaintStatusFilter] = useState("ALL"); // Default filter
  const [sortBy, setSortBy] = useState("complaintDate"); // Default sort by complaint date
  const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order

  

  const chartOptions = {
    plugins: {
      legend: {
        display: true, // Display the legend
        position: "right", // Position the legend to the right
        labels: {
          usePointStyle: true, // Use round dots for colors in legend
          padding: 20, // Add some padding between labels and chart
        },
      },
    },
  };
  

  const navigate = useNavigate();

  const handleSort = (sortField) => {
    if (sortField === sortBy) {
      // Toggle between ascending and descending order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set the new sort field and default to ascending order
      setSortBy(sortField);
      setSortOrder("asc");
    }
  };

   // Function to sort complaints
   const sortComplaints = (complaintsToSort) => {
    return complaintsToSort.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      // Sort based on the selected field and order
      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  };

  // Function to handle sorting and filtering
  const filterAndSortComplaints = () => {
    let filtered = complaints;

    if (complaintStatusFilter !== "ALL") {
      filtered = complaints.filter(
        (complaint) => complaint.complaintStatus === complaintStatusFilter
      );
    }
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (complaint) =>
          complaint.complaintStatus &&
          complaint.complaintStatus.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort the filtered complaints
    const sortedComplaints = sortComplaints(filtered);

    setFilteredComplaints(sortedComplaints);
    setNoMatches(sortedComplaints.length === 0);
  };

  const [complaintData, setComplaintData] = useState({
    OPENED: 0,
    UNDER_REVIEW: 0,
    RESOLVED: 0,
    CLOSED: 0,
  });



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
                const employeeId = await EmployeeService.getEmployeeIdByName(sub);
                console.log(employeeId);

                // Set the JWT token in the headers
                EmployeeService.setJwtToken(jwtToken);
        const response = await EmployeeService.trackComplaints(employeeId.data);

        const complaints = response.data;

      // Count complaints in each status
      const data = {
        OPENED: 0,
        UNDER_REVIEW: 0,
        RESOLVED: 0,
        CLOSED: 0,
      };

      complaints.forEach((complaint) => {
        data[complaint.complaintStatus]++;
      });

      setComplaintData(data);
        setComplaints(response.data);
      } catch (error) {
        setComplaints([]);
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterComplaints = () => {
      let filtered = complaints;

      if (complaintStatusFilter !== "ALL") {
        filtered = complaints.filter((complaint) => complaint.complaintStatus === complaintStatusFilter);
      }

      if (searchTerm.trim() !== "") {
        filtered = filtered.filter(
          (complaint) =>
            (complaint.complaintStatus &&
              complaint.complaintStatus.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (complaint.subject && complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      setFilteredComplaints(filtered);
      setNoMatches(filtered.length === 0);
    };

    filterComplaints();
  }, [complaints, searchTerm, complaintStatusFilter]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const viewMore = (e, complaintId) => {
    e.preventDefault();
    navigate(`/complaint/viewMore/${complaintId}`);
  };

  const handleComplaintStatusFilterChange = (status) => {
    setComplaintStatusFilter(status);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [complaintsPerPage] = useState(10); // Number of complaints per page

  // Calculate the indexes of the complaints to display on the current page
  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const sortedComplaints = sortComplaints(
    filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint)
  );
  
  // Function to change the current page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderComplaints = () => {
    return sortedComplaints.map((complaint) => (
      <tr key={complaint.complaintId}>
        <td className="text-left px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">{complaint.subject}</div>
        </td>
        <td className="text-left px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">
            {new Date(complaint.complaintDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}{" "}
            {new Date(complaint.complaintDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </td>
        <td className="text-left px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">{complaint.complaintStatus}</div>
        </td>
        <td className="text-left px-6 py-4 whitespace-nowrap">
          <button
            className="text-white font-bold py-2 px-4 rounded view-more-button"
            onClick={(e) => viewMore(e, complaint.complaintId)}
          >
            View More
          </button>
        </td>
        
      </tr>
      
    ));
    
  };

  return (
    <div  style={{    border:"1px solid #e0e0e0"}}>
    <div className="container"  >
      <h2 className="header">TRACK COMPLAINT STATUS</h2>

      <div className="search-bar-complaints">
      <div className="image-div-complaints">
                <img src="/complaints-6.jpg" alt="complaint-image" style={{height:"400px",width:"450px"}} />
                </div>
        <input
          type="text"
          placeholder="Search by Complaint Status or Subject"
          value={searchTerm}
          onChange={handleSearch}
          className="input-search-box"
        />

<ComplaintPieChart complaintData={complaintData} />
       
      </div>
      

      {/* Toggle buttons */}
      <div className="toggle-buttons">
        <button
          className={`status-toggle ${complaintStatusFilter === "ALL" ? "active" : ""}`}
          onClick={() => handleComplaintStatusFilterChange("ALL")}
        >
          ALL
        </button>
        <button
          className={`status-toggle ${complaintStatusFilter === "OPENED" ? "active" : ""}`}
          onClick={() => handleComplaintStatusFilterChange("OPENED")}
        >
          OPENED
        </button>
        <button
          className={`status-toggle ${complaintStatusFilter === "UNDER_REVIEW" ? "active" : ""}`}
          onClick={() => handleComplaintStatusFilterChange("UNDER_REVIEW")}
        >
          UNDER REVIEW
        </button>
        <button
          className={`status-toggle ${complaintStatusFilter === "RESOLVED" ? "active" : ""}`}
          onClick={() => handleComplaintStatusFilterChange("RESOLVED")}
        >
          RESOLVED
        </button>
        <button
          className={`status-toggle ${complaintStatusFilter === "CLOSED" ? "active" : ""}`}
          onClick={() => handleComplaintStatusFilterChange("CLOSED")}
        >
          CLOSED
        </button>
      </div>
      {/*  sorting buttons */}
      <div className="sort-buttons">

      <button
            className={`status-toggle ${
              sortBy === "subject" ? "active" : ""
            }`}
            onClick={() => handleSort("subject")}
          style={{marginLeft:"400px"}}>
            Sort by Subject {sortBy === "subject" ? sortOrder === "asc" ? "↑" : "↓" : ""}
          </button>
          <button
            className={`status-toggle ${
              sortBy === "complaintDate" ? "active" : ""
            }`}
            onClick={() => handleSort("complaintDate")}
          >
            Sort by Date {sortBy === "complaintDate" ? sortOrder === "asc" ? "↑" : "↓" : ""}
          </button>
          <button
            className={`status-toggle ${
              sortBy === "complaintStatus" ? "active" : ""
            }`}
            onClick={() => handleSort("complaintStatus")}
          >
             Sort by Status {sortBy === "complaintStatus" ? sortOrder === "asc" ? "↑" : "↓" : ""}
          </button>
          </div>
      

      <table className="complaint-table" >
        <thead >
          <tr >
            <th>COMPLAINT SUBJECT</th>
            <th>DATE</th>
            <th>COMPLAINT STATUS</th>
            <th></th>
          </tr>
        </thead>
        <tbody >
          {noMatches ? (
            <tr>
              <td colSpan="3" className="no-matches-message">
                No matches to your search
              </td>
            </tr>
          ) : (
            renderComplaints()
          )}
        </tbody>
        <div className="pagination" style={{marginLeft:"500px",marginBottom:"20px"}}>
          <ul>
            {Array(Math.ceil(filteredComplaints.length / complaintsPerPage))
              .fill()
              .map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                >
                  <button
                    onClick={() => paginate(i + 1)}
                    className="page-link"
                  >
                    {i + 1}
                  </button>
                </li>
                 ))}
                 </ul>
               </div>
        
      </table>
      
    </div>
    </div>
  );
};

export default EmployeeTrackComplaints;
