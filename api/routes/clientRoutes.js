import express from 'express';
import {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  getClients,
  deleteClient
} from '../controllers/clientController.js';

import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

router
  .route('/')
  .get(protect, authorize('admin'), getClients);

router
  .route('/:id')
  .delete(protect, authorize('admin'), deleteClient);

export default router;