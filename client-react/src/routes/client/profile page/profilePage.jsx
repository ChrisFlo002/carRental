import React, { useState } from "react";
import logo from "../../../assets/logo.PNG";
import { useNavigate } from "react-router-dom";
import "./profilePage.scss";
import { HiOutlineUserCircle } from "react-icons/hi"; // For name and surname
import { MdOutlineEmail, MdLogin } from "react-icons/md"; // For email and login
import { RiLockPasswordLine } from "react-icons/ri"; // For password
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Carbox from "../../../components/CarBox/carbox";
import BookingBox from "../../../components/BookingBox/bookingBox";
import Navbar from "../../../components/Navbar/navbar";

export default function ProfilePage() {
  const navigate = useNavigate();
  //user variable
  const [user, setUser] = useState({
    name: "John",
    surname: "Doe",
    email: "0M8wZ@example.com",
    login: "johndoe",
    password: "password123",
  });
  //password view bool
  const [showPassword, setShowPassword] = useState(false);
  //cars variable
   const [cars, setCarList] = useState([
      {
        id: 4,
        name: "Toyota Corolla 2024",
        fuelType: "Gas-V",
        transmission: "Manual",
        body:"Liftback",
        brand: "Toyota",
        model: "Corolla",
        year: 2024,
        range: 400,
        price: 30,
        branch:"Bujumbura",
        horsepower: 60,
        capacity: 63,
        doors: 5,
        images: [
          "https://autotest.com.ar/wp-content/uploads/2023/09/Toyota-Corolla-2024-trompa-1.jpg",
          "https://fotos.perfil.com/2022/06/03/toyota-corolla-1366413.jpg",
        ],
      },
      {
        id: 3,
        name: "Honda civic",
        fuelType: "Hybrid",
        body:"Liftback",
        transmission: "Automatic",
        brand: "Honda",
        model: "Civic",
        range: 560,
        year: 2022,
        price: 35,
        branch:"Bujumbura",
        horsepower: 100,
        capacity: 75,
        doors: 5,
        images: [
          "https://th.bing.com/th/id/R.12bcd019bc0da4de34f5b8663bca257c?rik=tGMZCcRLh4D%2fhg&pid=ImgRaw&r=0",
          "https://th.bing.com/th/id/OIP.3_ZXl6ANk_6yn42W6Vl9HwHaE8?rs=1&pid=ImgDetMain",
        ],
      },
      {
        id: 2,
        name: "Ford Focus",
        fuelType: "Gas-V",
        body:"Liftback",
        transmission: "Manual",
        brand: "Ford",
        model: "Focus",
        range: 400,
        year: 2021,
        price: 20,
        branch:"Gitega",
        horsepower: 23,
        capacity: 50,
        doors: 5,
        images: [
          "https://th.bing.com/th/id/R.7317462d09d933c7c41e2a9b22e132cb?rik=8LBFatxZ6BGKDw&riu=http%3a%2f%2fronnielogues.com%2fwp-content%2fuploads%2f2014%2f03%2flamarque-ford-2015-ford-focus.jpg&ehk=YnDFVMC8DVN3Yt5Y%2fl1RDDyIyERUdA2LWfqzZRQB6yI%3d&risl=&pid=ImgRaw&r=0",
          "https://stage-drupal.car.co.uk/s3fs-public/styles/original_size/public/2020-07/ford-focus-interior.jpg?VanDVsVRxF6CZLUoWiouiYFI3V7cYag3&itok=XYMeupaj",
          "https://th.bing.com/th/id/OIP.k1h5NUOhmmKUgjz97P-UjAHaFj?w=640&h=480&rs=1&pid=ImgDetMain",
        ],
      },
      {
        id: 1,
        brand: "Dongfeng",
        model: "Rich",
        name: "DONGFENG RCH 6 EV",
        body:"Pickup",
        range: 451,
        fuelType: "BEV",
        transmission: "Automatic",
        price: 44,
        year:2024,
        branch:"Bujumbura",
        horsepower: 177,
        capacity: 77,
        doors: 4,
        images: [
          "https://www.ev24.africa/wp-content/uploads/2025/02/DONFENG-RICH-6V.jpg",
          "https://obaidicarsjo.com/wp-content/uploads/2022/11/DSC03224.jpg",
          "https://www.dongfeng.ec/hubfs/Rich%20EV/RICH%206%20EV%20INTERIOR%206-min.jpg",
        ],
      },
      // Add more car objects as needed
    ]);
  //bookings variables
  const [bookings, setBookings] = useState([
    {
      fromDate: "2025-04-01",
      toDate: "2025-04-05",
      price: 200,
    },
    {
      fromDate: "2025-04-10",
      toDate: "2025-04-15",
      price: 350,
    },
    {
      fromDate: "2025-04-20",
      toDate: "2025-04-25",
      price: 400,
    },
    {
      fromDate: "2025-05-01",
      toDate: "2025-05-07",
      price: 500,
    },
    {
      fromDate: "2025-05-10",
      toDate: "2025-05-14",
      price: 300,
    },
  ]);
  

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  //handle logout
  const handleLogout = () => {
    // Implement logout logic here
    //console.log("Logged out!");
    navigate("/");
  };

  return (
    <div className="container">
      <Navbar/>
      <div className="body">
        <div className="left-region">
          <h2>User Profile</h2>
          {/* Name */}
          <div className="info-row">
            <HiOutlineUserCircle className="icon" />
            <span className="label">Name:</span>
            <span className="value">{user.name}</span>
          </div>

          {/* Surname */}
          <div className="info-row">
            <HiOutlineUserCircle className="icon" />
            <span className="label">Surname:</span>
            <span className="value">{user.surname}</span>
          </div>

          {/* Email */}
          <div className="info-row">
            <MdOutlineEmail className="icon" />
            <span className="label">Email:</span>
            <span className="value">{user.email}</span>
          </div>

          {/* Login */}
          <div className="info-row">
            <MdLogin className="icon" />
            <span className="label">Login:</span>
            <span className="value">{user.login}</span>
          </div>

          {/* Password */}
          <div className="info-row">
            <RiLockPasswordLine className="icon" />
            <span className="label">Password:</span>
            <span className="value">
              {showPassword ? user.password : "•".repeat(user.password.length)}
            </span>
            <button
              className="toggle-visibility"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <div className="profile-actions">
            <button
              onClick={() => navigate("/home")}
              className="profile-button"
            >
              Modify profile
            </button>
            <button onClick={handleLogout} className="logout-button">
              Remove account
            </button>
          </div>
        </div>
        <div className="right-region">
          {/* Cars Section */}
          <div className="section cars-section">
            <h2>Cars</h2>
            {cars.length > 0 ? (
              <div className="scroll-container">
                {cars.map((car, index) => (
                  <Carbox key={index} car={car} />
                ))}
              </div>
            ) : (
              <p className="no-data">No cars available.</p>
            )}
          </div>

          {/* Bookings Section */}
          <div className="section bookings-section">
            <h2>Bookings</h2>
            {bookings.length > 0 ? (
              <div className="scroll-container">
                {bookings.map((booking, index) => (
                  <BookingBox key={index} booking={booking} />
                  
                ))}
              </div>
            ) : (
              <p className="no-data">No bookings available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
