import React, { useState, useEffect, useContext } from "react";
import BookingBox from "../../../components/BookingBox/bookingBox.jsx";
import "./mybookings.scss";
import Navbar from "../../../components/Navbar/navbar.jsx";
import { AuthContext } from "../../../context/authContext.jsx";
import axios from "axios";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/v1/bookings/me/${currentUser._id}`,
          { headers: { Authorization: `Bearer ${currentUser.token}` }}
        );
        setBookings(response.data.data);
        console.log("bookings:", response.data.data);
      } catch (error) {
        console.log(error);
        alert("Error fetching bookings");
      }finally{
        setIsLoading(false);
      }
    };
    fetchBooking();
  }, []);


  const filterBookings = (status) => {
    setActiveFilter(status);

    if (status === "All") {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(
        bookings.filter((booking) => booking.bookingStatus === status)
      );
    }
  };

  return (
    <div className="my-bookings-page">
      <Navbar />
      <div className="page-header">
        <h1></h1>
        <p>Manage and track all your driver bookings</p>
      </div>

      <div className="filter-tabs">
        <button
          className={`filter-tab ${activeFilter === "All" ? "active" : ""}`}
          onClick={() => filterBookings("All")}
        >
          All
        </button>
        <button
          className={`filter-tab ${activeFilter === "Pending" ? "active" : ""}`}
          onClick={() => filterBookings("Pending")}
        >
          Pending
        </button>
        <button
          className={`filter-tab ${
            activeFilter === "Confirmed" ? "active" : ""
          }`}
          onClick={() => filterBookings("Confirmed")}
        >
          Confirmed
        </button>
        <button
          className={`filter-tab ${
            activeFilter === "Completed" ? "active" : ""
          }`}
          onClick={() => filterBookings("Completed")}
        >
          Completed
        </button>
        <button
          className={`filter-tab ${
            activeFilter === "Cancelled" ? "active" : ""
          }`}
          onClick={() => filterBookings("Cancelled")}
        >
          Cancelled
        </button>
      </div>

      <div className="bookings-container">
        {isLoading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your bookings...</p>
          </div>
        ) : filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <BookingBox key={booking.bookingId} booking={booking} />
          ))
        ) : bookings.length > 0 ? bookings.map((booking)=> <BookingBox key={booking.bookingId} booking={booking} />) :(
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3>No bookings found</h3>
            <p>
              You don't have any{" "}
              {activeFilter !== "All" ? activeFilter.toLowerCase() : ""}{" "}
              bookings yet.
            </p>
            {activeFilter !== "All" && (
              <button
                className="btn-view-all"
                onClick={() => filterBookings("All")}
              >
                View all bookings
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
