import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// @desc    Create new booking
// @route   POST /api/v1/bookings
// @access  Private (Client)
export const createBooking = async (req, res, next) => {
  try {
    // Add client from token to request body
    req.body.client = req.user.id;

    // Check if car exists
    const car = await Car.findById(req.body.car);

    if (!car) {
      return res.status(404).json({
        success: false,
        error: "Car not found",
      });
    }

    // Check if car is available

    if (
      car.status.toString() !== 'Available'
    ) {
      return res.status(400).json({
        success: false,
        error: "Car is not available for booking",
      });
    }

    // Calculate booking price
    /*const startDate = new Date(req.body.dateBooking);
    const endDate = new Date(req.body.returnDate);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      return res.status(400).json({
        success: false,
        error: "Return date must be after booking date",
      });
    }*/

    // req.body.priceBooking = days * car.price;

    // Create booking
    const booking = await Booking.create(req.body);

    // Update car status to Reserved
    car.status = 'Reserved';
    await car.save();

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all bookings
// @route   GET /api/v1/bookings
// @access  Private (Admin)
export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: "client",
        select: "names email phone",
      })
      .populate({
        path: "car",
        select: "carId brand images comfort year plate",
      })
      .populate("paymentDetails");

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single booking
// @route   GET /api/v1/bookings/:id
// @access  Private
export const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: "client",
        select: "names email phone",
      })
      .populate({
        path: "car",
        select: "carId brand comfort year price",
      })
      .populate("paymentDetails");

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found",
      });
    }

    // Make sure user is booking owner or admin
    if (
      booking.client._id.toString() !== req.user.id &&
      req.userType !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to access this booking",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update booking status
// @route   PUT /api/v1/bookings/:id/status
// @access  Private (Admin)
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (
      !["Pending", "Confirmed", "Completed", "Cancelled"].includes(
        status
      )
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid booking status",
      });
    }

    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found",
      });
    }

    booking.bookingStatus = status;
    await booking.save();

    // If booking is cancelled, make car available again
    if (status === "Cancelled") {
      const car = await Car.findById(booking.car);
      car.status = 'Available';
      await car.save();
    }

    // If booking is confirmed, update the car status
    /*if (bookingStatus === "Confirmed") {
      // Update car status to Rented
      const car = await Car.findById(booking.car);
      car.status = 'Reserved';
      await car.save();
    }*/

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get client bookings
// @route   GET /api/v1/bookings/me
// @access  Private (Client)
export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ client: req.user.id })
      .populate({
        path: "car",
        select: "carId brand comfort year price plate images",
      })
      .populate("paymentDetails");

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Cancel booking
// @route   PUT /api/v1/bookings/:id/cancel
// @access  Private
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found",
      });
    }

    // Make sure user is booking owner or admin
    if (booking.client.toString() !== req.user.id && req.userType !== "admin") {
      return res.status(401).json({
        success: false,
        error: "Not authorized to cancel this booking",
      });
    }

    // Can only cancel if status is Pending or Confirmed
    if (!["Pending", "Confirmed"].includes(booking.bookingStatus)) {
      return res.status(400).json({
        success: false,
        error: `Cannot cancel booking with status: ${booking.bookingStatus}`,
      });
    }

    booking.bookingStatus = "Cancelled";
    await booking.save();

    // Update car status back to Available
    const car = await Car.findById(booking.car);
    car.status = 'Ready';
    await car.save();

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};
