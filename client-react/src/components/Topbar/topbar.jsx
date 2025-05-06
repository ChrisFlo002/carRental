// Header.jsx
import React, { useContext } from "react";
import "./topbar.scss";
import { AuthContext } from "../../context/authContext";

const Header = () => {
  const {currentUser} = useContext(AuthContext);
  const userRole = "Admin";
  return (
    <header className="header">
      <div className="notifications">
        <div className="notification-icon">
          <span className="notification-badge">2</span>
        </div>
      </div>

      <div className="user-profile">
        <img
          src="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"
          alt="User avatar"
        />
        <div className="user-info">
          <div className="user-name">{currentUser.user.names}</div>
          <div className="user-role">{userRole}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;