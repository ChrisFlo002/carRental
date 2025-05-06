import express from 'express';
import {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  getAdmins
} from '../controllers/adminController.js';

import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', protect, authorize('admin'), register);
router.post('/login', login);
router.get('/me', protect, authorize('admin'), getMe);
router.put('/updatedetails', protect, authorize('admin'), updateDetails);
router.put('/updatepassword', protect, authorize('admin'), updatePassword);
router.get('/', protect, authorize('admin'), getAdmins);

export default router;