import express from 'express';
import {
  createBooking,
  getBookings,
  getBooking,
  updateBookingStatus,
  getMyBookings,
  cancelBooking,
  updateBooking
} from '../controllers/bookingController.js';

import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/me/:id').get(protect, getMyBookings);

router
  .route('/')
  .get(protect, getBookings)
  .post(createBooking);

router
  .route('/:id')
  .get(protect, getBooking);

router
  .route('/:id/status')
  .put(protect, updateBookingStatus);
router.route('/:id').put(protect,updateBooking);
router
  .route('/:id/cancel')
  .put(protect, cancelBooking);

export default router;