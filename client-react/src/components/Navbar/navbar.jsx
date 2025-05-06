// Navbar.jsx
import React, { useState, useEffect, useContext } from "react";
import "./navbar.scss";
import logo from "../../assets/logo1.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState("");
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    // Set the active path based on the current location
    setActivePath(window.location.pathname);

    // Optional: Update the active path when the location changes
    const handleLocationChange = () => {
      setActivePath(window.location.pathname);
    };

    // Listen for navigation changes
    window.addEventListener("popstate", handleLocationChange);

    return () => {
      // Clean up event listener
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Helper function to determine if a link should be active
  const isActive = (path) => {
    return activePath === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <a
            href="/client"
            className="logo-link"
            onClick={() => setActivePath("/")}
          >
            <img src={logo} alt="Car Rental Logo" className="logo" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="menu-icon"></span>
        </button>

        {/* Navigation links */}
        <div className={`nav-links ${mobileMenuOpen ? "active" : ""}`}>
          <ul className="menu">
            <li className="menu-item">
              <a
                href="/client"
                className={`menu-link ${isActive("/client") ? "active" : ""}`}
                onClick={() => setActivePath("/client")}
              >
                Home
              </a>
            </li>
            <li className="menu-item">
              <a
                href="/client/bookings"
                className={`menu-link ${
                  isActive("/client/bookings") ? "active" : ""
                }`}
                onClick={() => setActivePath("/client/bookings")}
              >
                My Booking
              </a>
            </li>
            
              <li className="menu-item logout">
                <button onClick={logout} className="logout-button">
                  Logout
                </button>
              </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
