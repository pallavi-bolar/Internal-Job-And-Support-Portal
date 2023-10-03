import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === "/Login";

  // Function to handle logo click and navigate to /hr-dashboard
  const handleLogoClick = () => {
    if (!isLoginPage) {
      navigate("/hr-dashboard");
    }
  };

  // Logout function
  const handleLogout = () => {
    // Clear user authentication data (e.g., JWT token) from local storage
    localStorage.removeItem("jwtToken");

    // Redirect to the login page
    navigate("/Login");
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          {!isLoginPage && (
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          )}
          <div>
            <div onClick={handleLogoClick}>
              <img src="logo-white.png" alt="Logo" className="logo" />
            </div>
          </div>
          {!isLoginPage && (
            <button className="logout-button" onClick={handleLogout}>
              {/* <i className="fas fa-sign-out-alt"></i> */}
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          )}
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;