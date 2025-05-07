import React, { useContext, useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/sidebar";
import Header from "../../../components/Topbar/topbar";
import { FaSearch, FaFilter, FaDownload, FaPlus } from "react-icons/fa";
import "./usersContent.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authContext.jsx";
import axios from "axios";

const UsersContent = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Users");
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  // Handle search
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = users.filter(
      (user) =>
        user.names.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase()) ||
        user._id.includes(term)
    );

    setFilteredUsers(filtered);
  };
  //fetching all the users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        //fetch all users first
        /*const response1 = await axios.get(
          "http://localhost:5000/api/v1/clients/",
          {
            headers: { Authorization: `Bearer ${currentUser.token}` },
          }
        );*/
        const response2 = await axios.get(
          "http://localhost:5000/api/v1/admins/",
          {
            headers: { Authorization: `Bearer ${currentUser.token}` },
          }
        );
        // Add role property to each user from response1
        /*const clientUsers = response1.data.data.map((user) => ({
          ...user,
          role: "Client",
        }));

        // Add role property to each user from response2
        const adminUsers = response2.data.data.map((user) => ({
          ...user,
          role: "Admin",
        }));
        setUsers([...clientUsers, ...adminUsers]);*/
        setUsers(response2.data.data);
        console.log("users:", users);
        setFilteredUsers(users);
      } catch (error) {
        console.log(error.message);
        alert("Error fetching users");
      }
    };
    fetchUsers();
  }, []);
  // Handle role filter
  const handleRoleFilter = (role) => {
    setRoleFilter(role);

    if (role === "All Users") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => user.role === role);
      setFilteredUsers(filtered);
    }
  };

  // Handle add new admin
  const handleAddAdmin = () => {
    navigate("/dash/newAdmin");
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case true:
        return "badge-active";
      case false:
        return "badge-offline";
      default:
        return "";
    }
  };

  // Get role badge class
  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "admin":
        return "badge-admin";
      case "agent":
        return "badge-user";
      case "driver":
        return "badge-seller";
      default:
        return "";
    }
  };

  return (
    <div className="users-content">
      <Sidebar />
      <div className="content-section">
        <Header />

        <div className="users-management">
          <div className="users-header">
            <h2>Users Data</h2>
            <div className="users-actions">
              <div className="search-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              {/*<button className="btn-download">
                <FaDownload /> Download Data
              </button>*/}
              <div className="filter-dropdown">
                <button className="btn-filter">
                  {roleFilter} <FaFilter />
                </button>
                <div className="dropdown-content">
                  <div onClick={() => handleRoleFilter("All Users")}>
                    All Users
                  </div>
                  <div onClick={() => handleRoleFilter("admin")}>Admin</div>
                  <div onClick={() => handleRoleFilter("agent")}>Agent</div>
                  <div onClick={() => handleRoleFilter("driver")}>Driver</div>
                </div>
              </div>

              <button className="btn-add-admin" onClick={handleAddAdmin}>
                <FaPlus /> Add New User
              </button>
            </div>
          </div>

          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Number</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Join Date</th>
                </tr>
              </thead>
              <tbody>
                { filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.names}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <span
                          className={`badge ${getRoleBadgeClass(user.role)}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${getStatusBadgeClass(
                            user.isActive
                          )}`}
                        >
                          {user.isActive}
                        </span>
                      </td>
                      <td>
                        {new Date(user.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </td>
                    </tr>
                  ))
                ) : users.length > 0 ?  (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.names}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <span
                          className={`badge ${getRoleBadgeClass(user.role)}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${getStatusBadgeClass(
                            user.isActive
                          )}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td>
                        {new Date(user.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>Loading users...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersContent;
