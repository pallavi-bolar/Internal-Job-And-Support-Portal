import React, { useEffect, useState } from "react";
import "./ViewEmployee.css";
import HRService from "../services/HRService";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    fetchEmployees();
  }, [searchTerm, currentPage]);

  const fetchEmployees = async () => {
    try {
      const filteredEmployees = await HRService.fetchEmployees(
        searchTerm,
        currentPage,
        itemsPerPage
      );
      setEmployees(filteredEmployees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(employees.totalCount / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <h1 className="empHeading">Employee List</h1>
      <input
        type="text"
        placeholder="Search by name, id"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className="searchbtn" onClick={() => fetchEmployees()}>
        Search
      </button>
      <br />

      {currentItems.length > 0 ? (
        <div>
          <table className="emp-table">
            <thead>
              <tr className="emp-rows">
                <th className="emp-heading">Employee ID</th>
                <th className="emp-heading">Role</th>
                <th className="emp-heading">Full Name</th>
                <th className="emp-heading">Email Id</th>
                <th className="emp-heading">Phone No</th>
                <th className="emp-heading">Gender</th>
                <th className="emp-heading">Date of Birth</th>
                <th className="emp-heading">Address</th>
                <th className="emp-heading">Date of Joining</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((employee) => (
                <tr key={employee.id}>
                  <td className="emp-data">{employee.employeeId}</td>
                  <td className="emp-data">{employee.role}</td>
                  <td className="emp-data">{employee.fullName}</td>
                  <td className="emp-data">{employee.emailId}</td>
                  <td className="emp-data">{employee.phoneNo}</td>
                  <td className="emp-data">{employee.gender}</td>
                  <td className="emp-data">{formatDate(employee.dateOfBirth)}</td>
                  <td className="emp-data">{employee.address}</td>
                  <td className="emp-data">{formatDate(employee.dateOfJoining)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination-container">
            <div className="pagination">
              <button
                className="paginationbtn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage}</span>
              <button
                className="paginationbtn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default EmployeeTable;



