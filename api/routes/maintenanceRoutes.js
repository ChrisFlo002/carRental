import express from 'express';
import {
  createMaintenance,
  getMaintenances,
  getMaintenance,
  updateMaintenance,
  deleteMaintenance,
  getCarMaintenances
} from '../controllers/maintenanceController.js';

import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin'), getMaintenances)
  .post(protect, authorize('admin'), createMaintenance);

router
  .route('/:id')
  .get(protect, authorize('admin'), getMaintenance)
  .put(protect, authorize('admin'), updateMaintenance)
  .delete(protect, authorize('admin'), deleteMaintenance);

router
  .route('/car/:carId')
  .get(protect, authorize('admin'), getCarMaintenances);

export default router;
  