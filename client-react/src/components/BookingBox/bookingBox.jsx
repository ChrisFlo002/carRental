import React, { useContext } from "react";
import "./BookingBox.scss";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const BookingBox = ({ booking }) => {
  // Format dates to display nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const { currentUser } = useContext(AuthContext);
  // Get status class for different styling based on booking status
  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "status-confirmed";
      case "Completed":
        return "status-completed";
      case "Cancelled":
        return "status-cancelled";
      default:
        return "status-pending";
    }
  };
  

  return (
    <div className="booking-box">
      <div className="booking-header">
        <h3>
          {booking.car.brand}: {booking.car.plate}
        </h3>
        <div
          className={`booking-status ${getStatusClass(booking.bookingStatus)}`}
        >
          {booking.bookingStatus}
        </div>
      </div>

      <div className="booking-content">
        <div className="car-image">
          <img
            src={booking.car.images[0]}
            alt={`${booking.car.brand} ${booking.car.plate}`}
          />
        </div>

        <div className="booking-details">
          <div className="booking-info">
            <div className="info-item">
              <span className="label">Booking ID:</span>
              <span className="value">{booking.bookingId}</span>
            </div>
            <div className="info-item">
              <span className="label">Booking client:</span>
              <span className="value">{booking.clientName}- {booking.clientEmail} - {booking.clientPhone}</span>
            </div>
            <div className="info-item">
              <span className="label">Pickup Date:</span>
              <span className="value">{formatDate(booking.dateBooking)}</span>
            </div>
            <div className="info-item">
              <span className="label">Return Date:</span>
              <span className="value">{formatDate(booking.returnDate)}</span>
            </div>
            <div className="info-item">
              <span className="label">Pickup Address:</span>
              <span className="value">{booking.addressTake}</span>
            </div>
            <div className="info-item">
              <span className="label">Total Price:</span>
              <span className="value price">${booking.priceBooking}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="booking-actions">
        {currentUser.profil === "agent" && booking.bookingStatus === "Pending" && (
          <button className="btn-cancel" onClick={cancelBooking}>
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingBox;
