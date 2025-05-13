import PaymentDetails from "../models/PaymentDetails.js";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// @desc    Create payment
// @route   POST /api/v1/payments
// @access  Private
export const createPayment = async (req, res, next) => {
  try {
    // Check if booking exists
    const booking = await Booking.findById(req.body.booking);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found",
      });
    }
    const car = await Car.findById(booking.car);
    // Check if user is authorized
    /*if (booking.client.toString() !== req.user.id && req.userType !== "admin") {
      return res.status(401).json({
        success: false,
        error: "Not authorized to make payment for this booking",
      });
    }*/

    // Check if payment type exists

    if (
      req.body.paymentType !== "Lumicash" &&
      req.body.paymentType !== "Ecocash"
    ) {
      return res.status(404).json({
        success: false,
        error: "Payment type not found",
      });
    }

    // Create payment
    const payment = await PaymentDetails.create(req.body);

    // Update booking with payment details
    booking.paymentDetails = payment._id;
    booking.bookingStatus = "Payed";
    await booking.save();
    car.status = "Reserved";
    await car.save();

    res.status(201).json({
      success: true,
      data: payment,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all payments
// @route   GET /api/v1/payments
// @access  Private (Admin)
export const getPayments = async (req, res, next) => {
  try {
    const payments = await PaymentDetails.find().populate({
      path: "booking",
      select: "bookingId dateBooking returnDate priceBooking",
    });

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single payment
// @route   GET /api/v1/payments/:id
// @access  Private
export const getPayment = async (req, res, next) => {
  try {
    const payment = await PaymentDetails.findById(req.params.id).populate({
      path: "booking",
      select: "bookingId dateBooking returnDate priceBooking client",
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        error: "Payment not found",
      });
    }

    // Check if user is authorized
    if (
      payment.booking.client.toString() !== req.user.id &&
      req.userType !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to access this payment",
      });
    }

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update payment status
// @route   PUT /api/v1/payments/:id
// @access  Private (Admin)
export const updatePaymentStatus = async (req, res, next) => {
  try {
    const { statePayment } = req.body;

    if (
      !["Pending", "Completed", "Failed", "Refunded"].includes(statePayment)
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid payment status",
      });
    }

    let payment = await PaymentDetails.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        error: "Payment not found",
      });
    }

    payment = await PaymentDetails.findByIdAndUpdate(
      req.params.id,
      { statePayment },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get payment types
// @route   GET /api/v1/payments/types
// @access  Public
export const getPaymentTypes = async (req, res, next) => {
  try {
    const types = [
      {
        paymentType: "Lumicash",
        codeAgent: 15820,
      },
      {
        paymentType: "Ecocash",
        codeAgent: 23586,
      },
    ];

    res.status(200).json({
      success: true,
      count: types.length,
      data: types,
    });
  } catch (err) {
    next(err);
  }
};