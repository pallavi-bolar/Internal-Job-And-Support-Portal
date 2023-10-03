import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/hr-dashboard",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Post Job Openings",
    path: "/Job-Posting-Form",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "View Jobs",
    path: "/ViewJobs",
    icon: <IoIcons.IoIosBriefcase />,
    cName: "nav-text",
  },

  {
    title: "Register Employees",
    path: "./RegisterEmployee",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },

  {
    title: "View Employees",
    path: "./ViewEmployee",
    icon: <IoIcons.IoIosPeople />,
    cName: "nav-text",
  },

  {
    title: "Update Status",
    path: "./UpdateStatus",
    icon: <IoIcons.IoIosCreate />,
    cName: "nav-text",
  },
];
