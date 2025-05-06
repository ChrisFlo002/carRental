import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const PaymentDetailsSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      required: true,
      unique: true,
      default: () => "PAYMENT-" + uuidv4(),
    },
    datePayment: {
      type: Date,
      required: true,
      default: Date.now,
    },
    statePayment: {
      type: String,
      required: true,
      enum: ["Pending", "Completed", "Failed", "Refunded"],
    },
    paymentType: {
      type: String,
      required: true,
      enum: ["Lumicash", "Ecocash"],
    },
    amount: {
      type: Number,
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    accountHolder:{
      type: String,
      required: true
    },
    phoneNumber:{
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const PaymentDetails = mongoose.model("PaymentDetails", PaymentDetailsSchema);
export default PaymentDetails;
