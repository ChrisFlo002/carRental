import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const BookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      default: () => "BOOKING-" + uuidv4(),
    },
    dateBooking: {
      type: Date,
      required: true,
      default: Date.now,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    priceBooking: {
      type: Number,
      required: true,
    },
    bookingStatus: {
      type: String,
      required: true,
      enum: ["Pending", "Payed", "Confirmed", "Completed", "Cancelled"],
    },
    addressTake: {
      type: String,
      required: true,
    },
    withDriver: {
      type: Boolean,
      default: false
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: false,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    paymentDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentDetails",
    },
    clientName:{
      type: String,
      required: true
    },
    clientEmail:{
      type: String,
      required: true
    },
    clientPhone:{
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
