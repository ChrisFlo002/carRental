import express from 'express';
import {
  createBooking,
  getBookings,
  getBooking,
  updateBookingStatus,
  getMyBookings,
  cancelBooking
} from '../controllers/bookingController.js';

import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/me').get(protect, authorize('client'), getMyBookings);

router
  .route('/')
  .get(protect, authorize('admin'), getBookings)
  .post(createBooking);

router
  .route('/:id')
  .get(protect, getBooking);

router
  .route('/:id/status')
  .put(protect, authorize('admin', 'client'), updateBookingStatus);

router
  .route('/:id/cancel')
  .put(protect, cancelBooking);

export default router;