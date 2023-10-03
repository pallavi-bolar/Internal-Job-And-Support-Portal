import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/support-assistant/Navbar";
import Footer from "./components/support-assistant/Footer";
import Faqs from "./components/support-assistant/Faqs";
import Login from "./components/support-assistant/Login";
import SupportDashboard from "./components/support-assistant/SupportDashboard";
import ComplaintDetailsCard from "./components/support-assistant/ComplaintDetailsCard";
import OpenComplaintsPage from "./components/support-assistant/OpenComplaintsPage";
import ViewAllFaqsPage from "./components/support-assistant/ViewAllFaqsPage";

// import OpenJobList from './components/OpenJobList';
// import OpenJobLis from './components/OpenJobList';
// import FAQs from './components/FAQs';
// import React from 'react';
// import RegisterComplaint from './components/RegisterComplaint';
// import Login from './components/Login';
// import EmployeeTrackComplaints from './components/EmployeeTrackComplaints';
// import EmployeeTrackComplaintDetailed from './components/EmployeeTrackComplaintDetailed';
// import ManageEmployeeProfile from './components/ManageEmployeeProfile';
// import ViewEmployeeProfile from './components/ViewEmployeeProfile';
// import AppliedJobView from './components/AppliedJobView';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { ToastContainer, toast } from 'react-toastify';

function App() {
  // K const isLoginPage = window.location.pathname === '/login';
  return (
    <div id="app-container">
      <ChakraProvider>
        <Router>
          <Navbar />
          <div id="content">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/support-dashboard"
                exact
                element={<SupportDashboard />}
              />
              <Route path="/complaint/:id" element={<ComplaintDetailsCard />} />
              <Route path="/open-complaints" element={<OpenComplaintsPage />} />
              <Route path="/create-faq" element={<Faqs />} />
              <Route path="/view-all-faqs" element={<ViewAllFaqsPage />} />

              {/* K
               <BrowserRouter>
                <Navbar hideSidebar={isLoginPage} />
                <div id="content">
                  <ToastContainer position="top-right" autoClose={3000} />
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/openJobs" element={<OpenJobList />} />

                    <Route path="/faqs" element={<FAQs />} />
                    <Route
                      path="/registerComplaint"
                      element={<RegisterComplaint />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/trackComplaints"
                      element={<EmployeeTrackComplaints />}
                    />
                    <Route
                      path="/complaint/viewMore/:complaintId"
                      element={<EmployeeTrackComplaintDetailed />}
                    />
                    <Route
                      path="/updateProfile"
                      element={<ManageEmployeeProfile />}
                    />
                    <Route
                      path="/viewProfile"
                      element={<ViewEmployeeProfile />}
                    />
                    <Route
                      path="/trackJobApplications"
                      element={<AppliedJobView />}
                    />
                  </Routes>
                </div>
              </BrowserRouter> */}

              {/* Utkarsha 
<BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/hr-dashboard" element={<Dashboard />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Piechart" element={<PieChart />} />
          <Route path="/Job-Posting-Form" element={<Form />} />
          <Route path="/ViewJobs" element={<JobDetailsTable />} />
          <Route
            path="/UpdateStatus"
            element={<UpdateJobApplicationStatus />}
          />
          <Route path="/ViewEmployee" element={<EmployeeTable />} />

          <Route path="RegisterEmployee" element={<Employee />} />
        
        </Routes>
        <Footer />
      </BrowserRouter> */}
            </Routes>
          </div>
          <Footer />
        </Router>
        <ToastContainer />
      </ChakraProvider>
    </div>
  );
}

export default App;
