import Booking from "../models/Booking.js";
import Payment from "../models/PaymentDetails.js";
import Car from "../models/Car.js";
//import Client from "../models/Client.js";

// @desc    Get revenue by timeframe
// @route   GET /api/v1/reports/revenue
// @access  Private/Admin
export const getRevenueByTimeframe = async (req, res, next) => {
  const { timeframe, month, year } = req.query;

  let startDate, endDate;
  const currentDate = new Date();

  // Set dates based on timeframe
  if (timeframe === "daily") {
    startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );
  } else if (timeframe === "weekly") {
    // Get first day of the week (Sunday)
    const dayOfWeek = currentDate.getDay();
    startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - dayOfWeek
    );
    endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + (7 - dayOfWeek)
    );
  } else if (timeframe === "monthly") {
    // If specific month is provided
    if (month && year) {
      startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      endDate = new Date(parseInt(year), parseInt(month), 0); // Last day of the month
    } else {
      // Current month
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
    }
  } else {
    // Default to monthly (current month)
    startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
  }

  // Find all payments within the date range
  const payments = await Payment.find({
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  // Calculate total revenue
  const totalRevenue = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  // Get revenue data by day for the selected period
  const revenueByDay = await Payment.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        revenue: { $sum: "$amount" },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalRevenue,
      revenueByDay,
      timeframe,
      startDate,
      endDate,
    },
  });
};

// @desc    Get bookings by timeframe
// @route   GET /api/v1/reports/bookings
// @access  Private/Admin
export const getBookingsByTimeframe = async (req, res, next) => {
  const { timeframe, month, year } = req.query;

  let startDate, endDate;
  const currentDate = new Date();

  // Set dates based on timeframe (same logic as above)
  if (timeframe === "daily") {
    startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );
  } else if (timeframe === "weekly") {
    const dayOfWeek = currentDate.getDay();
    startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - dayOfWeek
    );
    endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + (7 - dayOfWeek)
    );
  } else if (timeframe === "monthly") {
    if (month && year) {
      startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      endDate = new Date(parseInt(year), parseInt(month), 0);
    } else {
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
    }
  } else {
    startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
  }

  // Find all bookings within the date range
  const bookings = await Booking.find({
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  // Calculate total bookings
  const totalBookings = bookings.length;

  // Get bookings data by day for the selected period
  const bookingsByDay = await Booking.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalBookings,
      bookingsByDay,
      timeframe,
      startDate,
      endDate,
    },
  });
};

// @desc    Get bookings by driver status
// @route   GET /api/v1/reports/driver-status
// @access  Private/Admin
export const getBookingsByDriverStatus = async (req, res, next) => {
  const { timeframe, month, year } = req.query;

  let startDate, endDate;
  const currentDate = new Date();

  // Set dates based on timeframe (same logic as above)
  if (timeframe === "daily") {
    startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );
  } else if (timeframe === "weekly") {
    const dayOfWeek = currentDate.getDay();
    startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - dayOfWeek
    );
    endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + (7 - dayOfWeek)
    );
  } else if (timeframe === "monthly") {
    if (month && year) {
      startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      endDate = new Date(parseInt(year), parseInt(month), 0);
    } else {
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
    }
  } else {
    startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
  }

  // Find bookings with and without drivers
  const withDriverCount = await Booking.countDocuments({
    withDriver: true,
    createdAt: { $gte: startDate, $lte: endDate },
  });

  const withoutDriverCount = await Booking.countDocuments({
    withDriver: false,
    createdAt: { $gte: startDate, $lte: endDate },
  });

  res.status(200).json({
    success: true,
    data: {
      withDriver: withDriverCount,
      withoutDriver: withoutDriverCount,
      total: withDriverCount + withoutDriverCount,
      timeframe,
      startDate,
      endDate,
    },
  });
};

// @desc    Get top rented cars
// @route   GET /api/v1/reports/top-cars
// @access  Private/Admin
export const getTopRentedCars = async (req, res, next) => {
  const { limit = 3 } = req.query;

  // Aggregate to find cars with most bookings
  const topCars = await Booking.aggregate([
    {
      $group: {
        _id: "$car",
        bookingCount: { $sum: 1 },
      },
    },
    {
      $sort: { bookingCount: -1 },
    },
    {
      $limit: parseInt(limit),
    },
  ]);

  // Get full car details
  const carsWithDetails = await Promise.all(
    topCars.map(async (item) => {
      const car = await Car.findById(item._id);
      return {
        car,
        bookingCount: item.bookingCount,
      };
    })
  );

  res.status(200).json({
    success: true,
    data: carsWithDetails,
  });
};

// @desc    Get top clients
// @route   GET /api/v1/reports/top-clients
// @access  Private/Admin
export const getTopClients = async (req, res, next) => {
  const { limit = 3 } = req.query;

  // Aggregate to find clients with most bookings based on clientEmail
  const topClients = await Booking.aggregate([
    {
      $group: {
        _id: "$clientEmail", // Group by email since it's unique for each client
        clientName: { $first: "$clientName" }, // Get the client name
        clientPhone: { $first: "$clientPhone" }, // Get the client phone
        bookingCount: { $sum: 1 }, // Count bookings
        totalSpent: { $sum: "$priceBooking" }, // Sum the total amount spent
      },
    },
    {
      $sort: { bookingCount: -1 }, // Sort by booking count descending
    },
    {
      $limit: parseInt(limit),
    },
  ]);

  // Format the response data
  const clientsWithDetails = topClients.map((item) => ({
    client: {
      name: item.clientName,
      email: item._id, // The email is the _id after grouping
      phone: item.clientPhone,
    },
    bookingCount: item.bookingCount,
    totalSpent: item.totalSpent,
  }));

  res.status(200).json({
    success: true,
    data: clientsWithDetails,
  });
};
