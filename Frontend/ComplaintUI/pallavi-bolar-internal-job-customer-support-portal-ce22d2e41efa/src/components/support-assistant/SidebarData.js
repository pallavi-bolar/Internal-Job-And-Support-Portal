import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as IconName from "react-icons/md";

export const SidebarData = [
  {
    title: "Home",
    path: "/support-dashboard",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Open Complaints",
    path: "/open-complaints",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Create FAQ",
    path: "/create-faq",
    icon: <IconName.MdOutlineCreate />,
    cName: "nav-text",
  },
  {
    title: "View FAQs",
    path: "/view-all-faqs",
    icon: <FaIcons.FaQuestion />,
    cName: "nav-text",
  },
];
