import express from 'express';
import { 
  getRevenueByTimeframe, 
  getBookingsByTimeframe,
  getBookingsByDriverStatus,
  getTopRentedCars,
  getTopClients
} from '../controllers/reportController.js';

const router = express.Router();

// Get revenue reports
router.get('/revenue', getRevenueByTimeframe);

// Get bookings reports
router.get('/bookings', getBookingsByTimeframe);

// Get driver status reports
router.get('/driver-status', getBookingsByDriverStatus);

// Get top rented cars
router.get('/top-cars', getTopRentedCars);

// Get top clients
router.get('/top-clients', getTopClients);

export default router;