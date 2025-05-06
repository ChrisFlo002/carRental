// src/pages/Cars/CarsContent.jsx

import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../../components/Sidebar/sidebar.jsx";
import Header from "../../../components/Topbar/topbar.jsx";
import CarBox from "../../../components/CarBox/carbox.jsx";
import { FaSearch, FaFilter, FaPlus, FaPercent } from "react-icons/fa";
import { statusOptions } from "../../../utils/mockData.jsx";
import "./cars.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../context/authContext.jsx";

const CarsContent = () => {
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [cars, setCars] = useState({});
  const {percent, updatePercent} = useContext(AuthContext);

  //fetch all the cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/cars/", {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        setCars(response.data.data);
      } catch (error) {
        alert("Error fetching cars. Check your internet and reload the page.");
      }
    };
    fetchCars();
  }, []);
  // Effect to apply filters
  useEffect(() => {
    let result = cars;

    // Apply search filter
    if (searchTerm) {
      result = result.filter((car) =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== "All") {
      result = result.filter((car) => car.brand === categoryFilter);
    }

    // Apply status filter
    /*if (statusFilter !== 'All') {
      result = result.filter(car => car.status === statusFilter);
    }*/

    setFilteredCars(result);
  }, [searchTerm, categoryFilter, statusFilter]);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle add new car
  const handleAddCar = () => {
    navigate("/dash/addCar");
  };

  return (
    <div className="cars-content">
      <Sidebar />
      <div className="content-section">
        <Header />

        <div className="cars-management">
          <div className="cars-header">
            <h2>Car Inventory</h2>
            <div className="cars-actions">
              <div className="search-container">
                {/* Field to display and define the value of extra % if no driver */}
                <FaPercent className="search-icon"/>
                <input
                type = "number"
                value = {percent}
                onChange = {(e) => updatePercent(e.target.value)}
                />
              </div>
              <div className="search-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

              <div className="filter-dropdown">
                <button className="btn-filter">
                  {categoryFilter} <FaFilter />
                </button>
                <div className="dropdown-content">
                  {cars.length > 0
                    ? cars.map((category, index) => (
                        <div
                          key={index}
                          onClick={() => setCategoryFilter(category.brand)}
                        >
                          {category.brand}
                        </div>
                      ))
                    : "Empty"}
                </div>
              </div>

              <div className="filter-dropdown">
                <button className="btn-filter">
                  Status: {statusFilter} <FaFilter />
                </button>
                <div className="dropdown-content">
                  {statusOptions.map((status, index) => (
                    <div key={index} onClick={() => setStatusFilter(status)}>
                      {status}
                    </div>
                  ))}
                </div>
              </div>

              <button className="btn-add-car" onClick={handleAddCar}>
                <FaPlus /> Add New Car
              </button>
            </div>
          </div>

          <div className="cars-grid-container">
            <div className="cars-grid">
              {filteredCars.length > 0
                ? filteredCars.map((car) => (
                    <div className="grid-item" key={car._id}>
                      <CarBox car={car} />
                    </div>
                  ))
                : cars.length > 0
                ? cars.map((car) => (
                    <div className="grid-item" key={car._id}>
                      <CarBox car={car} />
                    </div>
                  ))
                : "Loading cars..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsContent;
