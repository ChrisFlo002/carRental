import React, { useContext, useState } from "react";
import "./payment.scss";
import lumicashImg from "../../assets/lumicash.png";
import ecocashImg from "../../assets/ecocash.png";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";


const PaymentBox = ({ booking, onClose, car, numberOfDays }) => {
  const [selectedMethod, setSelectedMethod] = useState("Lumicash");
  const [accountHolder, setAccountHolder] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  //validate the fields values
  const validate = () => {
    if (!accountHolder || !phoneNumber || !code) {
      alert("Please fill in all fields");
      return false;
    }
    if (accountHolder.length < 3) {
      alert("Account holder name must be at least 3 characters");
      return false;
    }
    if (phoneNumber.length < 8) {
      alert("Phone number must be at least 9 characters");
      return false;
    }
    if (code.length !== 4) {
      alert("Code must be 4 characters");
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    //verrify field values first
    if (!validate()) {
      return;
    }
    try {
      setIsLoading(true);
      const payment = {
        datePayment: Date.now(),
        statePayment: "Completed",
        paymentType: selectedMethod,
        amount: booking.priceBooking,
        booking: booking._id,
        accountHolder: accountHolder,
        phoneNumber: phoneNumber,
      };
      const response = await axios.post("http://localhost:5000/api/v1/payments/",
        payment,
        { headers: { Authorization: `Bearer ${currentUser.token}` } }
      );
      console.log("Payment:",response.data.data);
      //update the booking status with api api/v1/bookings/:id/status
      const updateBooking = await axios.put(`http://localhost:5000/api/v1/bookings/${booking._id}/status`,{status:"Confirmed"}, { headers: { Authorization: `Bearer ${currentUser.token}` } });
      
      console.log("Booking:",updateBooking.data.data);
      alert("Payment submitted!");
      onClose();
      navigate("/client/bookings");
    } catch (error) {
      alert("Payment failed. Please try again.");
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  };
 

  return (
    <div className="payment-box">
      <div className="left-section">
        <h3>Payment</h3>
        <div className="methods">
          <img
            src={lumicashImg}
            alt="Lumicash"
            className={selectedMethod === "Lumicash" ? "selected" : ""}
            onClick={() => setSelectedMethod("Lumicash")}
          />
          <img
            src={ecocashImg}
            alt="Ecocash"
            className={selectedMethod === "Ecocash" ? "selected" : ""}
            onClick={() => setSelectedMethod("Ecocash")}
          />
        </div>

        <input
          type="text"
          placeholder="Account holder name"
          value={accountHolder}
          onChange={(e) => setAccountHolder(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <div className="buttons">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="pay" onClick={handleSubmit}>
            {isLoading ? "Loading...":"Pay Now"}
          </button>
        </div>
      </div>

      <div className="right-section">
        <h4>Car Booking Info</h4>
        <p>
          <strong>Car:</strong> {car.brand} {car.plate}
        </p>
        <p>
          <strong>Duration:</strong> {numberOfDays} days
        </p>
        <p>
          <strong>With driver:</strong> {booking.withDriver ? "Yes" : "No"}
        </p>
        <p>
          <strong>Date take:</strong> {booking.dateBooking}
        </p>
        <p>
          <strong>Return Date:</strong> {booking.returnDate}
        </p>
        <p className="amount">
          <strong>Amount: $ {booking.priceBooking} </strong>
        </p>
      </div>
    </div>
  );
};

export default PaymentBox;
