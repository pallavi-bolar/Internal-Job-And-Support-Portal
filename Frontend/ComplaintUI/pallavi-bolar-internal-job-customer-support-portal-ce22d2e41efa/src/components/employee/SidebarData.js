import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Find Jobs",
    path: "/openJobs",
    icon: <FaIcons.FaSearch />,
    cName: "nav-text",
  },
  {
    title: "Track Applied Jobs",
    path: "/trackJobApplications",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Register Complaints",
    path: "/registerComplaint",
    icon: <IoIcons.IoMdAlert />,
    cName: "nav-text",
  },
  {
    title: "Track Complaints",
    path: "/trackComplaints",
    icon: <IoIcons.IoMdClipboard />,
    cName: "nav-text",
  },
  {
    title: "FAQs",
    path: "/faqs",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
  {
    title: "Manage Profile",
    path: "/viewProfile",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
];