import React, { useContext, useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/sidebar.jsx";
import Header from "../../components/Topbar/topbar.jsx";
import {
  FaSearch,
  FaFilter,
  FaDownload,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "./BookingList.scss";
import axios from "axios";
import { AuthContext } from "../../context/authContext.jsx";
import BookingUpdate from "../../components/BookingUpdate/bookingUpdate.jsx";

const BookingListAgent = () => {
  const [booking, setBooking] =useState({});
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [carFilter, setCarFilter] = useState("All Cars");
  const [userFilter, setUserFilter] = useState("All Users");
  const [bookings, setBookings] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  // For image carousel
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});
  //fetch bookings
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/v1/bookings/",
          { headers: { Authorization: `Bearer ${currentUser.token}` } }
        );
        setBookings(response.data.data);
        console.log("bookings:", response.data.data);
      } catch (error) {
        console.log(error);
        alert("Error fetching bookings");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooking();
  }, []);
  // Handle search by booking ID
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = bookings.filter((booking) =>
      booking.id.toString().includes(term)
    );

    setFilteredBookings(filtered);
  };

  // Handle car filter
  const handleCarFilter = (car) => {
    setCarFilter(car);

    if (car === "All Cars") {
      // If user filter is also "All Users", show all bookings
      if (userFilter === "All Users") {
        setFilteredBookings(bookings);
      } else {
        // Filter by user only
        const filtered = bookings.filter(
          (booking) => booking.user.name === userFilter
        );
        setFilteredBookings(filtered);
      }
    } else {
      // Filter by car name and possibly user
      let filtered = bookings.filter((booking) => booking.car.name === car);

      // Apply user filter if it's not "All Users"
      if (userFilter !== "All Users") {
        filtered = filtered.filter(
          (booking) => booking.user.name === userFilter
        );
      }

      setFilteredBookings(filtered);
    }
  };

  // Handle user filter
  const handleUserFilter = (user) => {
    setUserFilter(user);

    if (user === "All Users") {
      // If car filter is also "All Cars", show all bookings
      if (carFilter === "All Cars") {
        setFilteredBookings(bookings);
      } else {
        // Filter by car only
        const filtered = bookings.filter(
          (booking) => booking.car.name === carFilter
        );
        setFilteredBookings(filtered);
      }
    } else {
      // Filter by user name and possibly car
      let filtered = bookings.filter((booking) => booking.user.name === user);

      // Apply car filter if it's not "All Cars"
      if (carFilter !== "All Cars") {
        filtered = filtered.filter((booking) => booking.car.name === carFilter);
      }

      setFilteredBookings(filtered);
    }
  };

  // Navigate car images
  const navigateImage = (bookingId, direction) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    const imagesCount = booking.car.images.length;
    const currentIndex = currentImageIndexes[bookingId] || 0;

    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % imagesCount;
    } else {
      newIndex = (currentIndex - 1 + imagesCount) % imagesCount;
    }

    setCurrentImageIndexes({
      ...currentImageIndexes,
      [bookingId]: newIndex,
    });
  };

  // Calculate days between dates
  const calculateDays = (pickupDate, returnDate) => {
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  //cancel booking
  const cancelBooking = async (booking) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/bookings/${booking._id}/status`,
        { status: "Cancelled" },
        { headers: { Authorization: `Bearer ${currentUser.token}` } }
      );
      console.log(response.data);
      alert("Booking cancelled!");
    } catch (error) {
      console.log(error);
      alert("failed to cancel booking");
    }
  };
  //update booking
  const updateBooking = (booking) => {
    setBooking(booking);
    setShowDialog(true);
  };
  const onClose = () => {
    setShowDialog(false);
  }
  // Get unique car names and user names for filters
  const uniqueCarNames = [
    ...new Set(bookings.map((booking) => booking.car.plate)),
  ];
  const uniqueUserNames = [
    ...new Set(bookings.map((booking) => booking.client.names)),
  ];

  return (
    <div className="bookings-content">
      <Sidebar />
      <div className="content-section">
        <Header />

        <div className="bookings-management">
          <div className="bookings-header">
            <h2>Bookings List</h2>
            <div className="bookings-actions">
              <div className="search-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by ID..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

              <div className="filter-dropdown">
                <button className="btn-filter">
                  {carFilter} <FaFilter />
                </button>
                <div className="dropdown-content">
                  <div onClick={() => handleCarFilter("All Cars")}>
                    All Cars
                  </div>
                  {uniqueCarNames.map((car) => (
                    <div key={car} onClick={() => handleCarFilter(car)}>
                      {car}
                    </div>
                  ))}
                </div>
              </div>

              <div className="filter-dropdown">
                <button className="btn-filter">
                  {userFilter} <FaFilter />
                </button>
                <div className="dropdown-content">
                  <div onClick={() => handleUserFilter("All Users")}>
                    All Users
                  </div>
                  {uniqueUserNames.map((user) => (
                    <div key={user} onClick={() => handleUserFilter(user)}>
                      {user}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bookings-table-container">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Car Images</th>
                  <th>User Information</th>
                  <th>Driver Information</th>
                  <th>Booking Dates</th>
                  <th>Duration</th>
                  <th>Total Price</th>
                  <th>Booking Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  "Loading..."
                ) : filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.bookingId}</td>
                      <td>
                        <div className="car-image-container">
                          <button
                            className="nav-btn prev"
                            onClick={() => navigateImage(booking._id, "prev")}
                          >
                            <FaChevronLeft />
                          </button>
                          <div className="car-image-wrapper">
                            <img
                              src={
                                booking.car.images[
                                  currentImageIndexes[booking._id] || 0
                                ]
                              }
                              alt={booking.car.plate}
                              className="car-image"
                            />
                          </div>
                          <button
                            className="nav-btn next"
                            onClick={() => navigateImage(booking._id, "next")}
                          >
                            <FaChevronRight />
                          </button>
                          <div className="image-counter">
                            {(currentImageIndexes[booking.id] || 0) + 1}/
                            {booking.car.images.length}
                          </div>
                        </div>
                        <div className="car-name">
                          {booking.car.brand} {booking.car.year}{" "}
                          {booking.car.plate}
                        </div>
                      </td>
                      <td>
                        <div className="user-info">
                          <div className="user-name">
                            {booking.client.names}
                          </div>
                          <div className="user-email">
                            {booking.client.email}
                          </div>
                          <div className="user-phone">
                            {booking.client.phone}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="user-info">
                          <div className="user-name">
                            {booking.driver.names || "N/A"}
                          </div>
                          <div className="user-email">
                            {booking.driver.email || "N/A"}
                          </div>
                          <div className="user-phone">
                            {booking.driver.phone || "N/A"}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="booking-dates">
                          <div className="date-label">Pickup:</div>
                          <div className="date-value">
                            {new Date(booking.dateBooking).toLocaleDateString()}
                          </div>
                          <div className="date-label">Return:</div>
                          <div className="date-value">
                            {new Date(booking.returnDate).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="booking-days">
                          {calculateDays(
                            booking.dateBooking,
                            booking.returnDate
                          )}{" "}
                          days
                        </div>
                      </td>
                      <td>
                        <div className="booking-price">
                          ${booking.priceBooking.toFixed(2)}
                        </div>
                      </td>
                      <td>
                        <div className="booking-price">
                          {booking.bookingStatus}
                        </div>
                      </td>
                      <td>
                        <div className="booking-actions">
                          {booking.bookingStatus === "Payed" ||
                            (booking.bookingStatus === "Pending" && (
                              <button
                                className="btn-accept"
                                onClick={() => updateBooking(booking)}
                              >
                                Accept
                              </button>
                            ))}
                          {booking.bookingStatus === "Confirmed" && (
                            <button
                              className="btn-decline"
                              onClick={() => cancelBooking(booking)}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.bookingId}</td>
                      <td>
                        <div className="car-image-container">
                          <button
                            className="nav-btn prev"
                            onClick={() => navigateImage(booking._id, "prev")}
                          >
                            <FaChevronLeft />
                          </button>
                          <div className="car-image-wrapper">
                            <img
                              src={
                                booking.car.images[
                                  currentImageIndexes[booking._id] || 0
                                ]
                              }
                              alt={booking.car.plate}
                              className="car-image"
                            />
                          </div>
                          <button
                            className="nav-btn next"
                            onClick={() => navigateImage(booking._id, "next")}
                          >
                            <FaChevronRight />
                          </button>
                          <div className="image-counter">
                            {(currentImageIndexes[booking.id] || 0) + 1}/
                            {booking.car.images.length}
                          </div>
                        </div>
                        <div className="car-name">
                          {booking.car.brand} {booking.car.year}{" "}
                          {booking.car.plate}
                        </div>
                      </td>
                      <td>
                        <div className="user-info">
                          <div className="user-name">
                            {booking.client.names}
                          </div>
                          <div className="user-email">
                            {booking.client.email}
                          </div>
                          <div className="user-phone">
                            {booking.client.phone}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="user-info">
                          <div className="user-name">
                            {booking.driver.names || "N/A"}
                          </div>
                          <div className="user-email">
                            {booking.driver.email || "N/A"}
                          </div>
                          <div className="user-phone">
                            {booking.driver.phone || "N/A"}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="booking-dates">
                          <div className="date-label">Pickup:</div>
                          <div className="date-value">
                            {new Date(booking.dateBooking).toLocaleDateString()}
                          </div>
                          <div className="date-label">Return:</div>
                          <div className="date-value">
                            {new Date(booking.returnDate).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="booking-days">
                          {calculateDays(
                            booking.dateBooking,
                            booking.returnDate
                          )}{" "}
                          days
                        </div>
                      </td>
                      <td>
                        <div className="booking-price">
                          ${booking.priceBooking.toFixed(2)}
                        </div>
                      </td>
                      <td>
                        <div className="booking-price">
                          {booking.bookingStatus}
                        </div>
                      </td>
                      <td>
                        <div className="booking-actions">
                          {booking.bookingStatus === "Payed" ||
                            (booking.bookingStatus === "Pending" && (
                              <button
                                className="btn-accept"
                                onClick={() => updateBooking(booking)}
                              >
                                Accept
                              </button>
                            ))}
                          {booking.bookingStatus === "Confirmed" && (
                            <button
                              className="btn-decline"
                              onClick={() => cancelBooking(booking)}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No bookings found</td>
                  </tr>
                )}
                {showDialog && BookingUpdate({booking, onClose})}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingListAgent;
