import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/sidebar";
import Header from "../../../components/Topbar/topbar";
import { FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./branch.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/authContext.jsx";

const BranchList = () => {
  const [expandedBranches, setExpandedBranches] = useState({});
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [branchCars, setBranchCars] = useState({});
  //fetch the branches
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/branches/",
          { headers: { Authorization: `Bearer ${currentUser.token}` } }
        );

        console.log("Branch data: ", response.data.data);
        setBranches(response.data.data);
      } catch (error) {
        alert("Error fetching branches");
      }
    };
    fetchBranches();
  }, []);
  //get branch's cars if any with api
  const getBranchCars = async (branchId) => {
    // Check if we already have data for this branch
    if (branchCars[branchId]) {
      // If we already have the data, we don't need to fetch it again
      // Just return it (or you might not need to return anything if toggle visibility is handled elsewhere)
      return branchCars[branchId];
    }
    // If we don't have the data yet, fetch it
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/branches/car/${branchId}`,
        { headers: { Authorization: `Bearer ${currentUser.token}` } }
      );
      // Update the state with the new data while preserving existing data
      setBranchCars((prevBranchCars) => ({
        ...prevBranchCars,
        [branchId]: response.data.data,
      }));
    } catch (error) {
      alert("Error fetching branch's cars");
      return [];
    }
  };
  // Toggle branch expansion
  const toggleBranchExpansion = (branchId) => {
    /*setExpandedBranches((prev) => ({
      ...prev,
      [branchId]: !prev[branchId],
    }));*/
    setExpandedBranches(prev => {
      const newState = { ...prev };
      newState[branchId] = !prev[branchId];
      
      // If we're expanding this branch and don't have its cars yet, fetch them
      if (newState[branchId] && !branchCars[branchId]) {
        getBranchCars(branchId);
      }
      
      return newState;
    });
  };
  // Handle add new branch
  const handleAddBranch = () => {
    navigate("/dash/addBranch");
  };

  return (
    <div className="branches-content">
      <Sidebar />
      <div className="content-section">
        <Header />

        <div className="branches-management">
          <div className="branches-header">
            <h2>Branches List</h2>
            <div className="branches-actions">
              <button className="btn-add-branch" onClick={handleAddBranch}>
                <FaPlus /> Add New Branch
              </button>
            </div>
          </div>

          <div className="branches-table-container">
            <table className="branches-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Branch Image</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Region</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {branches.length > 0 ? (
                  branches.map((branch) => (
                    <React.Fragment key={branch._id}>
                      <tr
                        className={
                          expandedBranches[branch._id] ? "expanded-row" : ""
                        }
                        onClick={() => toggleBranchExpansion(branch._id)}
                      >
                        <td>{branch.branchId}</td>
                        <td>
                          <div className="branch-image-container">
                            <img
                              src={branch.images[0]}
                              alt={branch.name}
                              className="branch-image"
                            />
                          </div>
                        </td>
                        <td>{branch.branchName}</td>
                        <td>{branch.address}</td>
                        <td>{branch.region}</td>
                        <td>
                          <button className="btn-expand">
                            {expandedBranches[branch.id] ? (
                              <FaChevronUp className="expand-icon" />
                            ) : (
                              <FaChevronDown className="expand-icon" />
                            )}
                            {expandedBranches[branch.id]
                              ? "Hide Cars"
                              : "View Cars"}
                          </button>
                        </td>
                      </tr>

                      {/* Expanded cars list */}
                      {expandedBranches[branch._id] && (
                        <tr className="cars-list-row">
                          <td colSpan="6">
                            <div className="cars-list-container">
                              <h4>Cars at {branch.branchName}</h4>
                              <div className="cars-grid">
                                {/* Show loading state while fetching */}
                                {!branchCars[branch._id] ? (
                                  <div className="loading-cars">
                                    Loading cars...
                                  </div>
                                ) : branchCars[branch._id].length > 0 ? (
                                  branchCars[branch._id].map((car) => (
                                    <div className="car-card" key={car._id}>
                                      <div className="car-image-wrapper">
                                        <img
                                          src={
                                            car.images[0] || "default-car-image.jpg"
                                          }
                                          alt={car.name}
                                          className="car-thumbnail"
                                        />
                                      </div>
                                      <div className="car-details">
                                        <div className="car-name">
                                          {car.brand}:{car.plate}
                                        </div>
                                        <div className="car-model">
                                          {car.status}
                                        </div>
                                        <div className="car-info">
                                          <span className="car-year">
                                            {car.year}
                                          </span>
                                          <span className="car-price">
                                            ${car.price}/day
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="no-cars-message">
                                    No cars available at this branch
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No branches found</td>
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

export default BranchList;
