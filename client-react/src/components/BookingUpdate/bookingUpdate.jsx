import React, { useState, useEffect, useContext } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCarSide,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaDollarSign,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext.jsx";
import "./bookingUpdate.scss";

const BookingUpdate = ({booking, onClose}) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const [errors, setErrors] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);


  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Fetch drivers
  useEffect(()=>{
    const fetchDrivers = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/v1/admins/drivers",
            {
              headers: { Authorization: `Bearer ${currentUser.token}` },
            }
          );
          setDrivers(
            response.data.filter(
              (driver) => driver.role === "driver" && driver.isActive
            )
          );
        } catch (error) {
          console.error("Error fetching drivers:", error);
          setErrors({ ...errors, drivers: "Failed to load drivers" });
        }
      };
      fetchDrivers();
  },[]);
  

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });

    // Clear any error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSuccess(false);

    // Basic validation
    const newErrors = {};
    if (booking.withDriver && !booking.driver) {
      newErrors.driver = "Please select a driver";
    }
    if (!booking.bookingStatus) {
      newErrors.bookingStatus = "Please select a booking status";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      // Only send the fields we want to update
      const updateData = {
        bookingStatus: booking.bookingStatus,
      };

      // Only include driver if withDriver is true
      if (booking.withDriver) {
        updateData.driver = booking.driver;
      }

      await axios.put(
        `http://localhost:5000/api/v1/bookings/${id}`,
        updateData,
        { headers: { Authorization: `Bearer ${currentUser.token}` } }
      );

      setUpdateSuccess(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating booking:", error);
      setIsLoading(false);
      setErrors({ submit: "Failed to update booking. Please try again." });
    }
  };

  const goBack = () => {
    navigate("/dash/bookings");
  };

  if (isLoading) {
    return <div className="loading">Loading booking details...</div>;
  }

  return (
    <div className="booking-update-container">
      <header className="form-header">
        <h1>Update Booking</h1>
        <div className="booking-id">ID: {booking.bookingId}</div>
        <button className="back-button" onClick={goBack}>
          X
        </button>
      </header>
          <div className="booking-info-section">
            <h2>Booking Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <FaCalendarAlt />
                <div>
                  <h3>Booking Date</h3>
                  <p>{formatDate(booking.dateBooking)}</p>
                </div>
              </div>
              <div className="info-item">
                <FaCalendarAlt />
                <div>
                  <h3>Return Date</h3>
                  <p>{formatDate(booking.returnDate)}</p>
                </div>
              </div>
              <div className="info-item">
                <FaDollarSign />
                <div>
                  <h3>Price</h3>
                  <p>${booking.priceBooking}</p>
                </div>
              </div>
              <div className="info-item">
                <FaMapMarkerAlt />
                <div>
                  <h3>Pickup Address</h3>
                  <p>{booking.addressTake}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="client-info-section">
            <h2>Client Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <FaUser />
                <div>
                  <h3>Name</h3>
                  <p>{booking.clientName}</p>
                </div>
              </div>
              <div className="info-item">
                <FaEnvelope />
                <div>
                  <h3>Email</h3>
                  <p>{booking.clientEmail}</p>
                </div>
              </div>
              <div className="info-item">
                <FaPhone />
                <div>
                  <h3>Phone</h3>
                  <p>{booking.clientPhone}</p>
                </div>
              </div>
            </div>
          </div>

          <form className="booking-update-form" onSubmit={handleSubmit}>
            <h2>Update Booking</h2>

            {updateSuccess && (
              <div className="success-message">
                Booking updated successfully!
              </div>
            )}

            {/*errors.submit && (
              <div className="error-message">{errors.submit}</div>
            )*/}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bookingStatus">Booking Status</label>
                <select
                  id="bookingStatus"
                  name="bookingStatus"
                  value={booking.bookingStatus}
                  onChange={handleChange}
                  className={errors.bookingStatus ? "error" : ""}
                >
                  <option value="">Select status</option>
                  <option value="Pending">Pending</option>
                  <option value="Payed">Payed</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                {errors.bookingStatus && (
                  <span className="error-text">{errors.bookingStatus}</span>
                )}
              </div>
            </div>

            {booking.withDriver && (
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="driver">Assign Driver</label>
                  <select
                    id="driver"
                    name="driver"
                    value={booking.driver || ""}
                    onChange={handleChange}
                    className={errors.driver ? "error" : ""}
                  >
                    <option value="">Select a driver</option>
                    {drivers.map((driver) => (
                      <option key={driver._id} value={driver._id}>
                        {driver.names} - {driver.phone}
                      </option>
                    ))}
                  </select>
                  {errors.driver && (
                    <span className="error-text">{errors.driver}</span>
                  )}
                </div>
              </div>
            )}

            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Booking"}
              </button>
            </div>
          </form>

    </div>
  );
};

export default BookingUpdate;
