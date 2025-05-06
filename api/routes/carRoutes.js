import express from 'express';
import {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
  getAvailableCars
} from '../controllers/carController.js';

import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/available').get(getAvailableCars);

router
  .route('/')
  .get(protect, authorize("admin") ,getCars)
  .post(protect, authorize('admin'), createCar);

router
  .route('/:id')
  .get(getCar)
  .put(protect, authorize('admin'), updateCar)
  .delete(protect, authorize('admin'), deleteCar);

export default router;