// CombinedSidebar.jsx
import React, { useContext, useEffect } from "react";
import {
  FaTachometerAlt,
  FaCarAlt,
  FaUsers,
  FaCalendarCheck,
  FaSignOutAlt,
  FaFileAlt
} from "react-icons/fa";
import { FaBuildingColumns } from "react-icons/fa6";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./sidebar.scss";
import { AuthContext } from "../../context/authContext";


const Sidebar = () => {
  const {logout, currentUser} = useContext(AuthContext);

  // Define menu items with their paths - could be moved to external config file
  const menuItemsAdmin = [
    { icon: <FaTachometerAlt />, name: "Dashboard", path: "/dash" },
    { icon: <FaCarAlt />, name: "Car", path: "/dash/cars" },
    { icon: <FaUsers />, name: "Users", path: "/dash/users" },
    { icon: <FaCalendarCheck />, name: "Booking", path: "/dash/bookingAdmin" },
    { icon: <FaBuildingColumns />, name: "Branch", path: "/dash/branches" },
    //{ icon: <FaFileAlt />, name: "Reports", path: "/dash/report" }
  ];
  const menuItemsAgent = [{icon: <FaCalendarCheck />, name: "Bookings", path: "/agent"}];
  const menuItemsDriver = [{icon: <FaCalendarCheck />, name: "My Bookings", path: "/driver"}];

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-icon" />
        </div>
        <button className="menu-toggle">
          <span></span>
        </button>
      </div>
      
      <div className="sidebar-menu">
        <div className="menu-section">
          <ul className="nav__list">
            {currentUser.profil === "admin" ? menuItemsAdmin.map((item, index) => (
              <li className="menu-item" key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    isActive ? "active" : ""
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            )): currentUser.profil === "agent" ? menuItemsAgent.map((item, index) => (
              <li className="menu-item" key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    isActive ? "active" : ""
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            )): menuItemsDriver.map(
              <li className="menu-item" key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    isActive ? "active" : ""
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className="menu-section">
          <div className="menu-item">
            <NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""} onClick={logout}>
              <FaSignOutAlt />
              <span>Logout</span>
            </NavLink>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;