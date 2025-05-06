import React, { useState, useEffect, useContext } from "react";
import CarBox from "../../../components/CarBox/carbox.jsx";
import SearchBar from "../../../components/SearchBar/searchbar.jsx";
import "./homepage.scss";
import Navbar from "../../../components/Navbar/navbar.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
 
  //state variable for cars
  const [cars, setCars] = useState([]);
  //fetch all the cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/cars/available");
        setCars(response.data.data);
        console.log("cars:", response.data.data);
      } catch (error) {
        console.log( error.message);
        alert("Error fetching cars");
      }
    };
    fetchCars();
  }, []);
  const [filteredCars, setFilteredCars] = useState(cars);
  const handleSearch = (searchParams) => {
    let results = [...cars];

    // Filter by make
    if (searchParams.make !== "Any Makes") {
      results = results.filter((car) => car.brand === searchParams.make);
    }

    // Filter by model
    if (searchParams.model !== "Any Models") {
      results = results.filter((car) => car.model === searchParams.model);
    }

    // Filter by price range
    if (searchParams.price !== "All Prices") {
      const [min, max] = searchParams.price.split("-").map(Number);

      if (max) {
        results = results.filter((car) => car.price >= min && car.price <= max);
      } else {
        // Handle "100000+" case
        results = results.filter((car) => car.price >= min);
      }
    }

    setFilteredCars(results);
  };

  return (
    <div className="car-listing-page">
      <div className="page-content">
        <div className="container">
          <h1>Find Your Perfect Rental Car</h1>

          <SearchBar onSearch={handleSearch} />

          <div className="car-grid">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => <CarBox key={car._id} car={car} profile={""} />)
            ) : cars.length > 0 ? cars.map((car)=> <CarBox key={car._id} car={car} />): (
              <div className="no-results">
                <p>
                  No cars found.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
