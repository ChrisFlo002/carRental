import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./detailsPage.scss";
import { AuthContext } from "../../../context/authContext.jsx";
import axios from "axios";
import validateEmail from "../../../utils/usefulFunctions.jsx";
import PaymentBox from "../../../components/PaymentBox/payment.jsx";

const DetailsPage = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBLoading, setIsBLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { percent } = useContext(AuthContext);
  const [booking, setBooking] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [choiceCond, setConductor] = useState("");
  const [showPayBox, setShowPayBox] = useState(false);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dateBooking: "",
    returnDate: "",
    priceBooking: "",
    bookingStatus: "Pending",
    addressTake: "",
    withDriver: false,
    clientName: "",
    clientEmail: "",
    clientPhone: "",
  });
  //fetch car
  useEffect(() => {
    // Fetch the car using ID from URL
    const fetchCar = async () => {
      try {
        setIsLoading(true);
        const resp = await axios.get(
          `http://localhost:5000/api/v1/cars/${carId}`
        );
        setCar(resp.data.data);
        console.log("Car: ", resp.data.data);
      } catch (error) {
        alert("Failed to fetch car details. Please refresh the page.");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCar();
  }, []);

  //calculate the totoal price
  useEffect(() => {
    if (formData.dateBooking && formData.returnDate) {
      const fromDate = formData.dateBooking;
      const toDate = formData.returnDate;
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const ratio = percent / 100;

      setNumberOfDays(diffDays);
      setTotalPrice(
        car.price * diffDays +
          (choiceCond === "No" ? car.price * diffDays * ratio : 0)
      );
    }
  }, [choiceCond, formData.returnDate, formData.dateBooking]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  //validate form values
  const validate = () =>{
    if(!formData.dateBooking || !formData.returnDate || !formData.clientName || !formData.clientEmail || !formData.clientPhone) {
      alert("Please fill in all fields");
      return false;
    }
    if(!validateEmail(formData.clientEmail)) {
      alert("Please enter a valid email");
      return false;
    }
    //validate phone
    if(!/^\d{10,15}$/.test(formData.clientPhone.replace(/[^0-9]/g, ""))) {
      alert("Please enter a valid phone number with country code");
      return false;
    }
    return true;
  }
  const handleSubmit = async (e) => {
    if(!validate()) return;
    e.preventDefault();
    const booking = {
      car: car._id,
      dateBooking: formData.dateBooking,
      returnDate: formData.returnDate,
      priceBooking: totalPrice,
      bookingStatus: "Pending",
      withDriver: choiceCond === "Yes" ? true : false,
      addressTake: car.branch.address,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
    };
    setBooking(booking);
    setIsBLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/bookings/",
        booking
      );
      console.log(response.data);
      setBooking(response.data.data);
      setShowPayBox(true);
    } catch (error) {
      alert("Error creating booking. Please try again.");
      console.log(error);  
    }finally{
      setIsBLoading(false);
    }
  };
  const handleGoBack = () => {
    navigate("/");
  };
  //close payment box
  const onClose = () =>{
    setShowPayBox(false);
  }
  //if (isLoadin) return <div className="details-container">Loading...</div>;

  return (
    <div className="details-container">
      <div className="car-detail-header">
        <button className="back-button" onClick={handleGoBack}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19L8 12L15 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1>{isLoading && !car ? "Loading..." : "Car Details"}</h1>
      </div>
      <div className="main-section">
        <div className="image-section">
          {isLoading ? (
            <div className="spinner" />
          ) : car ? (
            <>
              <img
                src={car.images[0]}
                alt={car.model}
                style={{ display: imageLoaded ? "block" : "none" }}
                onLoad={() => setImageLoaded(true)}
              />
              <div className="car-info-section">
                <h3>Car Information</h3>
                {car && (
                  <ul>
                    <li>
                      <strong>Plate:</strong> {car.plate || "N/A"}
                    </li>
                    <li>
                      <strong>Chassis Number:</strong> {car.vin || "N/A"}
                    </li>
                    <li>
                      <strong>Brand:</strong> {car.brand || "N/A"}
                    </li>
                    <li>
                      <strong>Range:</strong> {car.mileage || "N/A"} (Km)
                    </li>
                    <li>
                      <strong>Transmission:</strong> {car.transmission || "N/A"}
                    </li>
                    <li>
                      <strong>Fuel Type:</strong> {car.fuelType || "N/A"}
                    </li>
                    <li>
                      <strong>Year:</strong> {car.year || "N/A"}
                    </li>
                    <li>
                      <strong>Comfort level:</strong> ${car.comfort}
                    </li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <div>Car not found</div>
          )}
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <h2>Book This Car</h2>

          <label>Date of Booking:</label>
          <input
            type="date"
            name="dateBooking"
            value={formData.dateBooking}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            required
          />

          <label>Return Date:</label>
          <input
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
            min={
              formData.dateBooking
                ? new Date(
                    new Date(formData.dateBooking).setDate(new Date(formData.dateBooking).getDate() + 1)
                  )
                    .toISOString()
                    .split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
            required
          />

          <label> With driver ({percent} % extra without driver)</label>
          <select
            className="bookingStatus"
            id="conductor"
            name="conductor"
            value={choiceCond}
            onChange={(e) => setConductor(e.target.value)}
            required
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <label>Booking Price:</label>
          <div className="total-value">${totalPrice}</div>
          {numberOfDays > 0 && (
            <div className="days-count">for {numberOfDays} days</div>
          )}

          <label>Client Name:</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            required
          />

          <label>Client Email:</label>
          <input
            type="email"
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
            required
          />

          <label>Client Phone:</label>
          <input
            type="tel"
            name="clientPhone"
            value={formData.clientPhone}
            onChange={handleChange}
            required
          />

          <button type="submit">{isBLoading ? "Loading..." : "Submit Booking"}</button>
        </form>
      </div>
      {showPayBox && <PaymentBox booking={booking} onClose={onClose} car={car} numberOfDays={numberOfDays} />}
    </div>
  );
};

export default DetailsPage;
