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
  const [time, setTime] = useState(0); 
  //fetch all the cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/cars/available"
        );
        setCars(response.data.data);
        console.log("cars:", response.data.data);
      } catch (error) {
        console.log(error.message);
        alert("Error fetching cars");
      }
    };
    fetchCars();
  }, []);

  const [filteredCars, setFilteredCars] = useState([]);

  const handleSearch = (searchParams) => {
    let results = [...cars];
    setTime(1);
    // Filter by make (brand)
    if (searchParams.make !== "Any Makes") {
      results = results.filter((car) => car.brand === searchParams.make);
    }

    // Filter by model (which is actually fuel type in the UI)
    if (searchParams.model !== "Any Models") {
      // Convert the model selection to match the expected fuelType format
      // The model dropdown has "Ev", "Hybrid", "Gasoline", but your data might use different formats
      results = results.filter((car) => {
        // Convert both to lowercase for case-insensitive comparison
        const carFuelType = car.fuelType.toLowerCase();
        const selectedFuelType = searchParams.model.toLowerCase();
        return carFuelType === selectedFuelType;
      });
    }

    // Filter by price range
    if (searchParams.price !== "All Prices") {
      // Handle the special case for "100+"
      if (searchParams.price === "100+") {
        results = results.filter((car) => car.price >= 100);
      } else {
        // Normal range case
        const [min, max] = searchParams.price.split("-").map(Number);
        results = results.filter((car) => car.price >= min && car.price <= max);
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
              filteredCars.map((car) => (
                <CarBox key={car._id} car={car} profile={""} />
              ))
            ) : time === 0 &&cars.length > 0 ? (
              cars.map((car) => <CarBox key={car._id} car={car} />)
            ) : (
              <div className="no-results">
                <p>No cars found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
